import { API_HOST } from '@env';
import { NavigationService, Routes } from 'navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from 'store/user';
import { UserSelectors } from 'store/user';
import {
  IFormDataLogin,
  IFormVerifyOTP,
  IKYCParams,
  IUser,
  IUserInfo,
} from 'types';
import { Alert, InteractionManager } from 'react-native';
import {
  API_ENDPOINT,
  EnumOTP,
  EnumRoleAccount,
  EnumStatusLog,
  KEY_CONTEXT,
  RESTAURANT_KEY,
  uploadFormData,
} from 'utils';
import { useKey } from './useKey';
import { useNotify } from './useNotify';
import axios from 'axios';
// import { AccountActions } from 'store/account';
import * as AccountActions from 'store/account';
import { getUserInfo } from 'store/user/Reducer';
const message_default = 'Đã có lỗi xảy ra. Vui lòng thử lại sau!';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { danger, success } = useNotify();
  const { saveKeyStore, resetKeyStore } = useKey();
  const { t } = useTranslation();
  const loading = useSelector(UserSelectors.getLoading);

  const { getKeyStore } = useKey();
  const user =
    (useSelector(UserSelectors.getAttrByKey('user')) as IUser) || null;

  const status = useSelector(UserSelectors.getAttrByKey('status'));
  const userInfo = useSelector(
    UserSelectors.getAttrByKey('userInfo'),
  ) as IUserInfo;

  const showNotify = (message: string) =>
    danger(t('error'), message ? `${message}` : message_default);

  const onRequestOTP = useCallback(
    async (formData: IFormDataLogin) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.LOGIN_ADMIN,
          },
          async res => {
            if ([200, 401].includes(res?.status)) {
              const data = res?.data?.result?.[0] || '';
              const r = res?.status === 401 ? Routes.InputPassword : Routes.OTP;
              NavigationService.navigate(r, {
                ...data,
                // phone_number: formData.phone,
                ...formData,
                typeCheck: EnumOTP.REGISTER,
              });
            } else {
              showNotify(`${API_HOST}${JSON.stringify(res)}`);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );
  const onRequestPhoneNumber = useCallback(
    async (formData: IFormDataLogin) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.LOGIN_ADMIN,
          },
          async res => {
            if (res?.status === 200) {
              // Số điện thoại đã có trong hệ thống
              const data = res?.data?.result?.[0] || '';
              NavigationService.navigate(Routes.InputPassword, {
                ...data,
                ...formData,
              });
            } else if (res?.status === 401) {
              // Số điện thoại chưa có trong hệ thống
              Alert.alert('Lỗi', 'Số điện thoại chưa có trong hệ thống');
            } else {
              showNotify(`${API_HOST}${JSON.stringify(res)}`);
            }
          },
        ),
      );
    },
    [dispatch],
  );

  const onVerifyOTP = useCallback(
    async (formData: IFormVerifyOTP, callback: (error: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.VERIFY_OTP,
          },
          async res => {
            if (res?.status === 200) {
              const data = res.data.result[0] || {};
              NavigationService.navigate(Routes.ResetPassword, {
                ...data,
                ...formData,
              });
            } else {
              callback?.(res?.data?.message ?? '');
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onForgotPasswordOTP = (formData: IFormVerifyOTP) => {
    const { phoneNumber, typeCheck } = formData;
    dispatch(
      UserActions.postBaseActionsRequest(
        {
          formData: { phoneNumber },
          endPoint: API_ENDPOINT.AUTH.FORGOT_PASSWORD_OTP,
        },
        async res => {
          if (res?.status === 200) {
            const data = res.data.result[0] || {};
            NavigationService.navigate(Routes.OTP, {
              ...data,
              ...formData,
              typeCheck,
            });
          } else {
            showNotify(res?.data?.message as string);
          }
        },
      ),
    );
  };

  const onLogin = useCallback(
    async ({ phone, password }, callback?: (error: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { phone, password },
            endPoint: API_ENDPOINT.AUTH.LOGIN_ADMIN,
          },
          async res => {
            if (res.status === 200) {
              saveKeyStore(
                KEY_CONTEXT.ACCESS_TOKEN,
                res.data.result[0].accessToken,
              );
              getProfileUser(res.data.result[0]?.user?.id, () => {});
              dispatch(
                getUserInfo({
                  ...res.data.result[0]?.user,
                  accessToken: res.data.result[0].accessToken,
                }),
              );
              NavigationService.reset(Routes.HomeTabs);
            }
          },
        ),
      );
      // try {
      //   const { getKeyStore } = useKey();
      //   const response = await axios.post(
      //     'http://103.226.248.9:4040/api/auth/teacher/login',
      //     {
      // phone: phone,
      // password: password,
      //     },
      //   );

      //   if (response.status === 200) {
      //     const data = response.data.data.result;
      // NavigationService.navigate(Routes.HomeTabs, {
      //   userData: response.data.data.result,
      // });

      // saveKeyStore(RESTAURANT_KEY.STATUS_USER, EnumStatusLog.LOGIN);
      //     const result = data?.result?.[0] || {};
      //     saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, result.accessToken);
      // saveKeyStore(KEY_CONTEXT.USER, JSON.stringify(result));
      //     // getProfileUser();
      //   } else {
      //     console.log('======res====', response);
      //     callback?.(data?.message ?? '');
      //   }
      // } catch (error) {
      //   console.error('Lỗi khi đăng nhập:', error);
      //   callback?.('Đã xảy ra lỗi khi đăng nhập');
      // }
    },
    [danger, dispatch, t],
  );

  const onResetPassword = useCallback(
    async ({ password, phoneNumber, typeCheck }) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { password, phoneNumber },
            endPoint:
              typeCheck === EnumOTP.REGISTER
                ? API_ENDPOINT.AUTH.CREATE_USER
                : API_ENDPOINT.AUTH.FORGOT_PASSWORD,
          },
          async res => {
            if (res?.status === 200) {
              Alert.alert(
                'Đổi mật khẩu thành công',
                'Vui lòng đăng nhập để tiếp tục',
                [
                  {
                    text: 'Đăng nhập',
                    onPress: () => {
                      InteractionManager.runAfterInteractions(() => {
                        NavigationService.navigate(Routes.InputPhone);
                      });
                    },
                  },
                ],
              );
              // showModalAlert({
              //   type: 'success',
              //   title: 'Đổi mật khẩu thành công',
              //   subtitle: 'Vui lòng đăng nhập để tiếp tục',
              //   textOk: 'Đăng nhập',
              //   onOk: () => {
              //     hideModalAlert();
              //     InteractionManager.runAfterInteractions(() => {
              //       NavigationService.navigate(Routes.InputPhone);
              //     });
              //   },
              // });
            } else if (res?.data?.errorCode === 'OTP_NOT_EXISTED') {
              Alert.alert('Lỗi', res?.data?.message || 'OTP is expired', [
                {
                  text: 'Thoát',
                  onPress: () => {
                    InteractionManager.runAfterInteractions(() => {
                      NavigationService.navigate(Routes.InputPhone);
                    });
                  },
                },
                {
                  text: 'Gửi lại mã',
                  onPress: () =>
                    NavigationService.navigate(Routes.OTP, {
                      phoneNumber: phoneNumber,
                      typeCheck: EnumOTP.FORGOT,
                      isOTPExpired: true,
                    }),
                },
              ]);
            } else {
              showNotify(res?.data?.message as string);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onLogout = useCallback(async () => {
    await resetKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
    await resetKeyStore(KEY_CONTEXT.USER);
    dispatch(UserActions.logoutRequest({ redirect: true }));
  }, [danger, dispatch, t]);

  const workingStatusAction = useCallback(
    async (params: string) => {
      dispatch(UserActions.changeRestStatus(params));
    },
    [danger, dispatch, t],
  );

  const onHanldeKYCUser = useCallback(form => {
    if (form?.avatar && form?.avatar?.uri) {
      const formData = new FormData();
      formData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: form?.avatar?.uri,
      });
      axios
        .post(`${API_HOST}api/upload/teacher`, formData, {
          headers: {
            Authorization: `Bearer ${userInfo?.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            const body = {
              ...form,
              avatar: response.data?.data?.result[0]?.file[0],
            };
            axios
              .patch(
                `${API_HOST}${API_ENDPOINT.AUTH.UPDATE_PROFILE}/${form.userId}`,
                body,
                {
                  headers: {
                    Authorization: `Bearer ${userInfo?.accessToken}`,
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(res => {
                success('Thành công', 'Cập nhật thông tin thành công!');
                getProfileUser(form.userId);
              })
              .catch(err => {
                showNotify('Cập nhật thông tin thất bại');
              });
          }
        });
    } else {
      axios
        .patch(
          `${API_HOST}${API_ENDPOINT.AUTH.UPDATE_PROFILE}/${form.userId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          success('Thành công', 'Cập nhật thông tin thành công!');
          getProfileUser(form.userId);
        })
        .catch(err => {
          showNotify('Cập nhật thông tin thất bại');
        });
    }
  }, []);
  const onShowFirstIntro = useCallback(() => {
    dispatch(UserActions.isShowIntro());
    saveKeyStore(KEY_CONTEXT.CHECKINTRO, 'Y');
  }, []);

  const onChangePassword = useCallback(
    async ({ old_password, new_password }) => {
      dispatch(
        UserActions.changePasswordRequest(
          {
            formData: { old_password, new_password },
            endPoint: API_ENDPOINT.AUTH.CHANGE_PASSWORD,
          },
          async res => {
            if (res?.status === 200) {
              Alert.alert('Thông báo', 'Đổi mật khẩu thành công!', [
                {
                  text: 'Đóng',
                  style: 'cancel',
                  onPress: () => NavigationService.goBack(),
                },
              ]);
            } else {
              showNotify(res?.data?.result?.[0]?.message as string);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const getProfileUser = useCallback(
    async (id, callback?: (error: string) => void) => {
      dispatch(
        UserActions.getBaseActionsRequest(
          {
            endPoint: `${API_ENDPOINT.AUTH.GET_PROFILE_DETAILS}/${id}`,
          },
          async res => {
            const token = await getKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
            dispatch(
              getUserInfo({
                ...res.data.result[0],
                accessToken: token,
              }),
            );
          },
        ),
      );
    },
    [],
  );

  return {
    user,
    loading,
    status,
    userInfo,
    onRequestOTP,
    onVerifyOTP,
    onResetPassword,
    onLogin,
    onLogout,
    workingStatusAction,
    getProfileUser,
    onForgotPasswordOTP,
    onHanldeKYCUser,
    onShowFirstIntro,
    onChangePassword,
    onRequestPhoneNumber,
  };
};
