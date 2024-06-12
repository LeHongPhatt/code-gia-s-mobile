import React, { useCallback, useRef } from 'react';
import { InteractionManager, StyleSheet, View, Image } from 'react-native';

import {
  BottomSheetCommon,
  Buttons,
  HomeLayout,
  ImageCus,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { BaseStyle, Colors } from 'theme';
import { ListItem } from './components';
import { NavigationService, Routes } from 'navigation';
import { IconName, Images } from 'assets';
import { useAuth, useKey } from 'hooks';
import { IRefBottom } from 'types';
import Icon from 'assets/svg/Icon';
import { KEY_CONTEXT, getImage } from 'utils';
import { useRoute } from '@react-navigation/native';
import { UserActions } from 'store/user';
import { useDispatch } from 'react-redux';
import { logoutRequest } from 'store/user/Actions';
export default function Account() {
  const refBottom = useRef<IRefBottom>(null);
  const { saveKeyStore, resetKeyStore } = useKey();
  const route = useRoute();
  const { userInfo } = useAuth();
  const dispatch = useDispatch();
  const onLogout = useCallback(async () => {
    await resetKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
    await resetKeyStore(KEY_CONTEXT.USER);
    dispatch(logoutRequest({ redirect: true }));
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.white}
      header={{
        title: 'bottom.account',
        notGoBack: true,
        iconColor: Colors.black,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <ListItem
          name={userInfo?.full_name}
          onPress={() => NavigationService.navigate(Routes.KYC)}
          image={true}
          isHiden={true}
          iconRight={true}
        />
        <ListItem
          onPress={() => NavigationService.navigate(Routes.BankInfo)}
          name="Thông tin tài khoản ngân hàng"
          icon={IconName.Account}
          isHiden={true}
          iconRight={true}
        />

        <ListItem
          name="Liên hệ với trung tâm"
          onPress={() => NavigationService.navigate(Routes.ContactSupport)}
          icon={IconName.Phone}
          isHiden={true}
          iconRight={true}
        />
        <ListItem
          name="Điều khoản sử dụng"
          onPress={() => NavigationService.navigate(Routes.Term)}
          icon={IconName.Term}
          isHiden={true}
          iconRight={true}
        />

        <ListItem
          name="Chính sách bảo mật"
          icon={IconName.Policy}
          isHiden={true}
          iconRight={true}
        />
        <ListItem
          name="Thay đổi mật khẩu"
          onPress={() => NavigationService.navigate(Routes.ChangePassword)}
          icon={IconName.PassLock}
          isHiden={true}
          iconRight={IconName.ArrowRight}
        />
        <ListItem
          name="Xóa tài khoản"
          icon={IconName.DeleteUser}
          isHiden={true}
          iconRight={IconName.ArrowRight}
        />
        <TouchCus
          onPress={() => refBottom.current?.show()}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Colors.grey85,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Image source={Images.log_out} style={styles.ic_out} />
          </View>
          <TextCus color={Colors.black}>Đăng xuất</TextCus>
        </TouchCus>
      </ScrollViewCus>
      <BottomSheetCommon ref={refBottom} hideBackdrop={false}>
        <ViewCus style={styles.bgWhite} pb-10>
          <ViewCus items-center>
            <Icon.ICON_ERROR />
          </ViewCus>
          <ViewCus style={[styles.pdHorzi50, styles.mgVertzi20]}>
            <TextCus useI18n mb-8 heading1 textAlign="center">
              Xác nhận
            </TextCus>
            <TextCus useI18n textAlign="center" color={Colors.grey85}>
              Bạn có chắc chắn muốn đăng xuất?
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.bottomAction}>
            <Buttons
              style={[styles.btnAction, styles.actionLogout]}
              onPress={() => {
                refBottom.current?.close();
                InteractionManager.runAfterInteractions(() => {
                  onLogout();
                });
              }}
              disabled={false}>
              <TextCus useI18n heading5 color-main>
                Đăng xuất
              </TextCus>
            </Buttons>
            <Buttons
              style={[styles.btnAction]}
              onPress={() => refBottom.current?.close()}
              disabled={false}>
              <TextCus heading5 useI18n color={Colors.white}>
                Đóng
              </TextCus>
            </Buttons>
          </ViewCus>
        </ViewCus>
      </BottomSheetCommon>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.greyF7,
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: Colors.transparent,
  },
  image: {
    height: 62,
    width: 62,
    borderRadius: 31,
    alignSelf: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  pdHorzi50: {
    paddingHorizontal: 50,
  },
  mgVertzi20: {
    marginVertical: 20,
  },
  btnAction: {
    flex: 1,
    borderRadius: 6,
  },
  bottomAction: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  actionLogout: {
    marginRight: 10,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  ic_out: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
