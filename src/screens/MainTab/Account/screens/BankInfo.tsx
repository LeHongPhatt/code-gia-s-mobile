import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { HomeLayout, OptionPickerForm, TextCus, TextInputs, ViewCus } from 'components';
import { useAuth } from 'hooks';
import { BaseStyle, Colors } from 'theme';
import { height, yupBankSchema, yupChangePasswordSchema } from 'utils';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'assets/svg/Icon';
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

interface PageProps { }
type TFormChangePassword = {
  newPassword: string;
};
const dataBank =
  [
    {
      "Name": "TMCP Đầu tư và Phát triển Việt Nam",
      "ShortName": "BIDV"
    },
    {
      "Name": "TMCP Công thương Việt Nam",
      "ShortName": "VietinBank"
    },
    {
      "Name": "TMCP Ngoại Thương Việt Nam",
      "ShortName": "Vietcombank"
    },
    {
      "Name": "TMCP Việt Nam Thịnh Vượng",
      "ShortName": "VPBank"
    },
    {
      "Name": "TMCP Quân Đội",
      "ShortName": "MB"
    },
    {
      "Name": "TMCP Kỹ Thương",
      "ShortName": "Techcombank"
    },
    {
      "Name": "NN&PT Nông thôn Việt Nam",
      "ShortName": "Agribank"
    },
    {
      "Name": "TMCP Á Châu",
      "ShortName": "ACB"
    },
    {
      "Name": "TMCP Phát triển Thành phố Hồ Chí Minh",
      "ShortName": "HDBank"
    },
    {
      "Name": "TMCP Sài Gòn - Hà Nội",
      "ShortName": "SHB"
    },
    {
      "Name": "TMCP Sài Gòn Thương Tín",
      "ShortName": "Sacombank"
    },
    {
      "Name": "Chính sách xã hội Việt Nam",
      "ShortName": "VBSP"
    },
    {
      "Name": "TMCP Quốc Tế",
      "ShortName": "VIB"
    },
    {
      "Name": "TMCP Hàng Hải",
      "ShortName": "MSB"
    },
    {
      "Name": "TMCP Sài Gòn",
      "ShortName": "SCB"
    },
    {
      "Name": "Phát triển Việt Nam",
      "ShortName": "VDB"
    },
    {
      "Name": "TMCP Đông Nam Á",
      "ShortName": "SeABank"
    },
    {
      "Name": "TMCP Phương Đông",
      "ShortName": "OCB"
    },
    {
      "Name": "TMCP Xuất Nhập Khẩu",
      "ShortName": "Eximbank"
    },
    {
      "Name": "TMCP Bưu điện Liên Việt",
      "ShortName": "LienVietPostBank"
    },
    {
      "Name": "TMCP Tiên Phong",
      "ShortName": "TPBank"
    },
    {
      "Name": "TMCP Đại Chúng Việt Nam",
      "ShortName": "PVcomBank"
    },
    {
      "Name": "TNHH MTV Woori - Việt Nam",
      "ShortName": "Woori"
    },
    {
      "Name": "TMCP Bắc Á",
      "ShortName": "Bac A Bank"
    },
    {
      "Name": "TNHH MTV HSBC - Việt Nam",
      "ShortName": "HSBC"
    },
    {
      "Name": "TNHH MTV Standard Chartered - Việt Nam",
      "ShortName": "SCBVL"
    },
    {
      "Name": "TNHH MTV Public Bank Việt Nam",
      "ShortName": "PBVN"
    },
    {
      "Name": "TMCP An Bình",
      "ShortName": "ABBANK"
    },
    {
      "Name": "TNHH MTV Shinhan Việt Nam",
      "ShortName": "SHBVN"
    },
    {
      "Name": "TMCP Việt Á",
      "ShortName": "VietABank"
    },
    {
      "Name": "TMCP Đông Á",
      "ShortName": "DongA Bank"
    },
    {
      "Name": "TNHH MTV UOB Việt Nam",
      "ShortName": "UOB"
    },
    {
      "Name": "TMCP Việt Nam Thương Tín",
      "ShortName": "Vietbank"
    },
    {
      "Name": "TMCP Nam Á",
      "ShortName": "Nam A Bank"
    },
    {
      "Name": "TMCP Quốc dân",
      "ShortName": "NCB"
    },
    {
      "Name": "TNHH MTV Đại Dương",
      "ShortName": "OceanBank"
    },
    {
      "Name": "TNHH MTV CIMB Việt Nam",
      "ShortName": "CIMB"
    },
    {
      "Name": "TMCP Bản Việt",
      "ShortName": "Viet Capital Bank"
    },
    {
      "Name": "TMCP Kiên Long",
      "ShortName": "Kienlongbank"
    },
    {
      "Name": "TNHH Indovina",
      "ShortName": "IVB"
    },
    {
      "Name": "TMCP Bảo Việt",
      "ShortName": "BAOVIET Bank"
    },
    {
      "Name": "TMCP Sài Gòn Công Thương",
      "ShortName": "SAIGONBANK"
    },
    {
      "Name": "Hợp tác xã Việt Nam",
      "ShortName": "Co-opBank"
    },
    {
      "Name": "TNHH MTV Dầu khí toàn cầu",
      "ShortName": "GPBank"
    },
    {
      "Name": "Liên doanh Việt Nga",
      "ShortName": "VRB"
    },
    {
      "Name": "TNHH MTV Xây dựng",
      "ShortName": "CB"
    },
    {
      "Name": "TMCP Xăng dầu Petrolimex",
      "ShortName": "PG Bank"
    },
    {
      "Name": "TNHH MTV ANZ - Việt Nam",
      "ShortName": "ANZVL"
    },

    {
      "Name": "TNHH MTV Hong Leong - Việt Nam",
      "ShortName": "HLBVN"
    }
  ]

const BankInfo: React.FC<PageProps> = () => {
  const { onChangePassword, userInfo, loading } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(null);
  const [bankNumber, setbankNumber] = React.useState(null);
  const [items, setItems] = React.useState(dataBank.map(item => { return { value: item.ShortName, label: item.ShortName } }));
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TFormChangePassword>({
    mode: 'onChange',
    resolver: yupResolver(yupBankSchema),
  });

  const handleChangePassword = useCallback((value: TFormChangePassword) => {
  }, []);

  return (
    <HomeLayout
      bgColor={Colors.white}
      header={{
        title: 'Thông tin tài khoản ngân hàng',
        iconColor: Colors.black,
      }}
      isForForm
      textBtn="Chỉnh sửa thông tin"
      onPress={handleSubmit(handleChangePassword)}
      disabled={getValues('newPassword') && values ? false : true}
      loading={loading}
      scrollEnabled={false}
      styleContent={styles.container}>
      <ViewCus style={{ flex: 1, height: height }} p-16>
        <Controller
          control={control}
          name="currentPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ViewCus mb-20>
              <TextCus mb-5 heading5>Tên ngân hàng</TextCus>
              <DropDownPicker
                open={open}
                placeholder='Chọn ngân hàng'
                style={{ borderWidth: 0, marginHorizontal: 10 }}
                value={values}
                items={items}
                setOpen={setOpen}
                setValue={setValues}
                setItems={setItems}
              />
            </ViewCus>
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="Số tài khoản"
              bold
              onChangeText={(txt) => {
                setValue('newPassword', txt)
                setbankNumber(txt)
              }}
              onBlur={onBlur}
              value={value}
              placeholder="Nhập số tài khoản"
              error={errors.newPassword?.message}
              isRequired
              style={styles.input}
            />
          )}
        />

      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 0,
    // borderBottomWidth: 1,
    backgroundColor: Colors.transparent,
  },
  container: {
    // flexGrow: 1,
    backgroundColor: Colors.white,
    flex: 1
  },
  dots: {
    width: 4,
    height: 4,
    backgroundColor: Colors.grey85,
    borderRadius: 4,
    marginRight: 8,
  },
});
export default BankInfo;
