import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import {
  HomeLayout,
  IconCus,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import { useAuth } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View, Alert } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { styleSpacing, yupSchemaInputPassword } from 'utils';
import styles from './styles';
import { EnumOTP } from 'types';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import Icon from 'assets/svg/Icon';
type TFormInputPassword = {
  password: string;
};
const InputPassword: React.FC = () => {
  const { t } = useTranslation();
  // const route = useRoute<RouteProp<RootStackParamList, 'InputPassword'>>();
  const refInput = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState(false);
  useEffect(() => {
    refInput.current?.focus();
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<TFormInputPassword>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaInputPassword),
    defaultValues: {
      password: '',
    },
  });
  const { onLogin, loading, onForgotPasswordOTP } = useAuth();


  const route = useRoute();
  const [password, setPassword] = useState('');
  const phoneNumber = route.params?.phoneNumber || '';

  const onSubmitLogin = async () => {
    try {
      // Call onLogin function
      await onLogin({ phone: phoneNumber, password }, error => {
        Alert.alert('Lỗi', error);
      });
    } catch (error) {
      console.error('Lỗi khi gọi hàm đăng nhập:', error);
    }
  };

  const onForgotPassword = () => {
    onForgotPasswordOTP({
      phoneNumber: route.params?.phone_number,
      typeCheck: EnumOTP.FORGOT,
    });
  };
  return (
    <HomeLayout
      isForForm
      textBtn="auth.login"
      onPress={onSubmitLogin}
      styleContent={styles.content}
      // disabled={(!isDirty && !isValid) || loading}
      loading={loading}
      header={{
        notGoBack: false,
      }}
      isDark>
      <ViewCus mt-30>
        <TextCus heading1 mb-8 useI18n textAlign="center">
          auth.login
        </TextCus>
        <TextCus mb-32 color-grey85 useI18n textAlign="center">
          auth.sub_login
        </TextCus>
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              ref={refInput}
              onChangeText={setPassword}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              value={password}
              placeholder="auth.enter_password"
              style={[isFocused && BaseStyle.boxShadow]}
              onFocus={() => setIsFocused(true)}
              isPassword
              // leftIcon={IconName.Lock}
              leftVector={<Icon.icon_lock />}
            />
          )}
        />
        {/* <TextInputs
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        /> */}
        <TouchCus onPress={onForgotPassword}>
          <TextCus useI18n color-blue47 textAlign="center">
            auth.forgot_password
          </TextCus>
        </TouchCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default InputPassword;
