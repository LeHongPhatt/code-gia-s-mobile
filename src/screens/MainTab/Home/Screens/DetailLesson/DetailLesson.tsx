import Icon from 'assets/svg/Icon';
import {
  Buttons,
  Divider,
  HomeLayout,
  IconApp,
  IconCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { isIos } from 'utils';
import {
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { useCallback } from 'react';

interface ItemData {
  time: string;
  name: string;
  city: string;
  price: string;
  subject: string;
  class: string;
  day: string;
  location: string;
  total: number;
  week: string;
}

const data: ItemData[] = [
  {
    time: '15:00 - 16:30',
    name: 'Nguyễn Phúc Gia Huy',
    city: 'Biên Hoà',
    price: '+ 450.000đ',
    subject: 'toán',
    class: 'TO001',
    day: '03/05/2023',
    total: 5,
    week: 'Thứ 3',
    location: 'Thống nhất',
  },
];

const DetailLesson: React.FC = () => {
  const headerProps = {
    renderLeft: () => <IconCus name={'arrow-left'} color={Colors.white} />,
    renderCenter: () => (
      <TextCus pt-10 heading3>
        Thông tin cá nhân
      </TextCus>
    ),
  };
  const renderDetail = () => {
    return (
      <View>
        {data.map((item, index) => (
          <View key={index} style={styles.container}>
            <ViewCus flex-row bbw-1 style={[styles.borderColor]}>
              <ViewCus f-1 flex-row>
                <IconCus name={'calendar'} size={20} color="blue" />
                <TextCus color={Colors.black} ml-8>
                  {item.time}
                </TextCus>
              </ViewCus>
              <ViewCus>
                <TextCus semiBold>{item.price}</TextCus>
              </ViewCus>
            </ViewCus>
            <TextCus pb-4 pt-12 heading5>
              {item.name}
            </TextCus>
            <ViewCus flex-row items-center>
              <TextCus color={Colors.grey85}>{item.day}</TextCus>
              <View style={styles.dot} />
              <TextCus color={Colors.grey85}>{item.location}</TextCus>
            </ViewCus>
            <View style={styles.rowPv28}>
              <ViewCus>
                <TextCus color={Colors.black} medium>
                  Thứ:
                  <TextCus color={Colors.grey85}>{item.week}</TextCus>
                </TextCus>
                <TextCus color={Colors.black} medium>
                  Lớp:<TextCus color={Colors.grey85}>{item.class}</TextCus>
                </TextCus>
                <TextCus color={Colors.black} medium>
                  Số buổi học:
                  <TextCus color={Colors.grey85}>{item.total}</TextCus>
                </TextCus>
              </ViewCus>
              <ViewCus>
                <TextCus color={Colors.black} medium>
                  Thời gian học:
                  <TextCus color={Colors.grey85}>{item.day}</TextCus>
                </TextCus>
                <TextCus color={Colors.black} medium>
                  Môn:<TextCus color={Colors.grey85}>{item.subject}</TextCus>
                </TextCus>
                <TextCus color={Colors.black} medium>
                  Còn lại:<TextCus color={Colors.grey85}>{item.total}</TextCus>
                </TextCus>
              </ViewCus>
            </View>
            <Buttons
              // onPress={() => NavigationService.navigate(Routes.DetailLesson)}
              style={styles.btn}
              textBtn="Điểm danh"
            />
          </View>
        ))}
      </View>
    );
  };
  return (
    <HomeLayout
      bgColor={isIos ? Colors.main : Colors.white}
      header={{ ...headerProps }}>
      {/* <IndicatorTop /> */}
      <ViewCus style={{ overflow: 'hidden', flex: 1 }}>
        <ViewCus style={[styles.shadow]} px-16 py-12 items-center></ViewCus>

        {/* /// viww */}
        {renderDetail()}
        <ViewCus style={styles.boxInput}>
          <TextCus semiBold style={styles.ask_for}>
            Xin nghỉ nghép
          </TextCus>
          <TextInput
            placeholder="Nhập lý do"
            style={styles.input}
            multiline={true}
          />
          <Buttons
            // onPress={() => NavigationService.navigate(Routes.DetailLesson)}
            style={styles.reason}
            textBtn="Xin nghỉ phép"
            styleTitle={styles.styleTitle}
          />
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 5,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.grey85,
    marginHorizontal: 16,
  },
  btn: {
    alignSelf: 'center',
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: Colors.blue1B,
  },
  rowPv28: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 28,
  },
  borderColor: {
    borderBottomColor: Colors.greyEE,
  },
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    shadowColor: Colors.black,
    borderRadius: 16,
  },
  input: {
    borderWidth: 1,
    height: 100,
    textAlignVertical: 'top',
    borderColor: Colors.greyD1,
  },
  boxInput: {
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 5,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
  },
  reason: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderColor: Colors.blue1B,
    paddingHorizontal: 15,
    borderRadius: 9,
    paddingVertical: 4,
    marginTop: 16,
  },
  styleTitle: {
    color: Colors.blue1B,
    fontSize: 12,
  },
  ask_for: {
    fontSize: 14,
    marginBottom: 16,
    color: Colors.black,
  },
});

export default DetailLesson;
