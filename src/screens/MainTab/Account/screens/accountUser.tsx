import BottomSheet from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconName, Images } from 'assets';
import {
  BottomSheetCommon,
  HomeLayout,
  IconCus,
  ImageCus,
  SelecterPicker,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import { useAuth } from 'hooks';
import React, { Fragment, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  InteractionManager,
  Keyboard,
  ScrollView,
  View,
} from 'react-native';
import { Options } from 'react-native-image-crop-picker';
import { Colors } from 'theme';
import { IUserKYC, SELECT_OPTION, dataGender } from 'types';
import {
  dimensions,
  formatDMY,
  getHeight,
  getNow,
  styleSpacing,
  yupSchemaInfoUser,
} from 'utils';
import styles from './styles';
import { useRenderInfo } from '@uidotdev/usehooks';
const { width } = dimensions;

const UploadImageConfig: Options = {
  cropping: false,
  includeBase64: false,
  multiple: false,
  compressImageMaxHeight: 400,
  compressImageMaxWidth: 400,
};

export default function AccountInfo() {
  const { loading } = useAuth();

  const refModal = useRef<BottomSheet>(null);
  const refGender = useRef<IRefBottom>(null);
  const [isEdit, setIsEdit] = useState(true);

  const { userInfo } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<IUserKYC>({
    mode: 'onSubmit',
    resolver: yupResolver(yupSchemaInfoUser),
    defaultValues: {
      name: userInfo?.full_name,
      phone: userInfo?.phone,
      gender: '',
    },
  });


  const headerProps = {
    renderLeft: () => (
      <IconCus name={'chevron-left'} size={18} color={Colors.white} />
    ),
    renderCenter: () => (
      <TextCus title3 whiteColor medium>
        Thông tin cá nhân
      </TextCus>
    ),
  };

  const onHandleUpdateInfo = value => {};
  return (
    <>
      <HomeLayout
        textBtn="auth.update_kyc"
        statusBarMode={'dark-content'}
        header={{ ...headerProps }}>
        <View style={styles.container}>
          <View style={styles.flex1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styleSpacing('px-16')]}>
              <View style={styles.cenItem}>
                <View style={getHeight(24)} />
                <Controller
                  control={control}
                  name={'avatar'}
                  rules={{ required: false }}
                  render={() => (
                    <View style={[styles.wrapAvatar, styles.cenItemvh]}>
                      <ImageCus
                        style={[styles.wrapAvatar]}
                        source={
                          userInfo?.avatar
                            ? { uri: userInfo?.avatar }
                            : Images.banner
                        }
                      />
                      <TouchCus
                        // onPress={() => selectFile('avatar')}
                        style={[
                          styles.posBtnCamera,
                          styles.posAbsolute,
                          styles.wrapBtnCamera,
                          styles.cenItemvh,
                        ]}>
                        <IconCus
                          name={'camera'}
                          size={8}
                          color={Colors.white}
                        />
                      </TouchCus>
                    </View>
                  )}
                />
                {isEdit && (
                  <>
                    <View style={getHeight(12)} />
                    <TextCus title4 medium>
                      {userInfo?.full_name}
                    </TextCus>
                  </>
                )}

                <View style={getHeight(16)} />
              </View>
              <Controller
                control={control}
                name={'name'}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      <View style={[styles.rowItem]}>
                        <TextCus>Họ tên *</TextCus>
                      </View>
                      <TextInputs
                        autoCapitalize="none"
                        placeholder={'Họ tên'}
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        color={Colors.colorLine}
                        editable={isEdit}
                        success
                      />
                    </>
                  );
                }}
              />
              <Controller
                control={control}
                name={'phone'}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Số điện thoại </TextCus>
                      <TextCus errorColor>*</TextCus>
                    </View>
                    <TextInputs
                      // style={[styles.inputDisabled, styles.fs16]}
                      autoCapitalize="none"
                      placeholder={'Số điện thoại'}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      value={value}
                      onBlur={onBlur}
                      // color={Colors.colorLine}
                      editable={false}
                      success
                    />
                  </View>
                )}
              />

              <Controller
                control={control}
                name={'birthday'}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View style={[styles.rowItem]}>
                      <TextCus>Sinh nhật *</TextCus>
                    </View>
                    <TouchCus
                      onPress={() => isEdit && refModal.current?.show()}>
                      <View pointerEvents="none">
                        <TextInputs
                          // style={[styles.input, styles.fs16]}
                          autoCapitalize="none"
                          placeholder={'DD/MM/YYYY'}
                          onChangeText={onChange}
                          value={value}
                          onBlur={onBlur}
                          // color={Colors.colorLine}
                          editable={false}
                          success
                        />
                      </View>
                    </TouchCus>
                  </>
                )}
              />
              <Controller
                control={control}
                name="gender"
                // rules={}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputs
                    label="account.gender"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="account.choose_gender"
                    onPress={() => refGender.current?.show()}
                    isViewTouch
                    type="none"
                    rightIcon={IconName.ChevronRight}
                    size={16}
                    styleIconRight={{ transform: [{ rotate: '90deg' }] }}
                    // isRequired={!isTabAccount}
                  />
                )}
              />
              <Controller
                control={control}
                name={'address'}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Địa chỉ *</TextCus>
                    </View>
                    <TextInputs
                      // style={[styles.input, styles.fs16]}
                      autoCapitalize="none"
                      placeholder={'Địa chỉ'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      // color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name={'School'}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Trường *</TextCus>
                    </View>
                    <TextInputs
                      autoCapitalize="none"
                      placeholder={'Trường'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name={'specialized'}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styleSpacing('mt-16')}>
                    <View style={[styles.rowItem]}>
                      <TextCus>Chuyên ngành *</TextCus>
                    </View>
                    <TextInputs
                      autoCapitalize="none"
                      placeholder={'Chuyên ngành'}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      color={Colors.colorLine}
                      editable={isEdit}
                      success
                    />
                  </View>
                )}
              />
              <View style={getHeight(16)} />
            </ScrollView>
          </View>
          {/* <View
            style={[
              styles.bgWhite,
              styleSpacing('mx-16'),
              styleSpacing('my-8'),
            ]}>
            <TouchCus
              style={[styles.radius4, styles.btnActive, styles.cenItem]}
              disabled={false}
              onPress={handleSubmit(onHandleUpdateInfo)}>
              <TextCus
                medium
                my-12
                color-white
                style={[styles.fs16, styles.lh24, styles.color]}>
                {isEdit ? 'Cập nhật' : 'Chỉnh sửa thông tin '}
              </TextCus>
            </TouchCus>
          </View> */}
        </View>
      </HomeLayout>
      <BottomSheetCommon ref={refModal}>
        <SelecterPicker
          selectOptionTitle={'Sinh nhật'}
          selectType={SELECT_OPTION.DATE_PICKER}
          maxDate={getNow()}
          onCancelSelect={() => refModal.current?.close()}
          onConfirmSelect={date => {
            setValue('birthday', formatDMY(date));
            InteractionManager.runAfterInteractions(() => {
              refModal.current?.close();
            });
          }}
        />
      </BottomSheetCommon>
      <BottomSheetCommon ref={refGender} hideBackdrop={false}>
        <SelecterPicker
          selectType={SELECT_OPTION.OPTION_PICKER}
          selectOptionTitle="account.choose_gender"
          dataOptions={dataGender}
          onConfirmSelect={gender => {
            setValue('gender', gender.data, {
              shouldValidate: true,
              shouldTouch: true,
            });
            refGender.current?.close();
          }}
          selectedChooseOption={{
            index: dataGender.indexOf(getValues('gender')),
            data: getValues('gender'),
          }}
          onCancelSelect={() => refGender.current?.close()}
        />
      </BottomSheetCommon>
    </>
  );
}
