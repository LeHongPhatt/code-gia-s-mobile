import { yupResolver } from '@hookform/resolvers/yup';
import { Buttons, ImageCus, TextCus, TextInputs, ViewCus } from 'components';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IconName, Images } from 'assets';
import Icon from 'assets/svg/Icon';
import { useAuth } from 'hooks';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { yupSchemaInputPhone } from 'utils';
import styles from './styles';
import { NavigationService, Routes } from 'navigation';
import { View } from 'moti';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
type TFormInputPhone = {
  phoneNumber: string;
  password: string;
};
const InputPhone: React.FC = ({}) => {
  const [isPhoneNumberComplete, setIsPhoneNumberComplete] = useState(false);
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const continueButtonColor = isPhoneNumberComplete ? '#007AFF' : '#CCCCCC';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormInputPhone>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaInputPhone),
    defaultValues: {
      phoneNumber: '',
    },
  });
  const { loading, onRequestOTP, onLogin, onRequestPhoneNumber } = useAuth();

  const onSubmitInputPhone = () => {
    if (phoneNumber) {
      NavigationService.navigate(Routes.InputPassword, { phoneNumber });
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <ViewCus style={styles.flex04}>
          {/* <Icon.Logo /> */}
          <Image source={Images.logo} style={{ resizeMode: 'contain' }} />
        </ViewCus>
        <ViewCus px-24 style={styles.flex06}>
          <TextCus heading1 mb-8 useI18n textAlign="center">
            auth.login_title
          </TextCus>
          <TextCus bold mb-12 color-grey85 useI18n textAlign="center">
            auth.login_subtitle
          </TextCus>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputs
                style={{ borderRadius: 5 }}
                onChangeText={setPhoneNumber}
                onBlur={onBlur}
                value={phoneNumber}
                placeholder="account.phone_id_input"
                keyboardType="phone-pad"
                error={errors.phoneNumber?.message}
                leftVector={<Icon.user_round/>}
              />
            )}
          />
          <TextCus textAlign="center" style={[styles.size]} color-grey84>
            Bằng cách bấm tiếp tục, tôi đồng ý
            <TextCus
              style={[styles.unline]}
              color-blue47
              onPress={() => NavigationService.navigate(Routes.Term)}>
              {' '}
              những điều khoản và điều kiện {''}
            </TextCus>
            của ứng dụng
          </TextCus>
          <Buttons
            style={continueButtonColor}
            textBtn={'continue'}
            mt-24
            mb-32
            onPress={onSubmitInputPhone}
          />
        </ViewCus>
      </ScrollView>
    </View>
  );
};
export default InputPhone;
