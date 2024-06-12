import { Images } from 'assets';
import Icon from 'assets/svg/Icon';
import { Buttons, IconCus, TextCus, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';

import {
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface ItemData {
  time: string;
  name: string;
  city: string;
  price: string;
  subject: string;
  class: string;
  day: string;
}

const data: ItemData[] = [
  {
    time: '15:00 - 16:30',
    name: 'Nguyễn Phúc Gia Huy',
    city: 'Biên Hoà',
    price: '+ 350.000đ',
    subject: 'toán',
    class: 'TO001',
    day: '03/05/2023',
  },
  {
    time: '15:00 - 16:30',
    name: 'Nguyễn Phúc Gia Huy',
    city: 'Biên Hoà',
    price: '+ 350.000đ',
    subject: 'toán',
    class: 'TO001',
    day: '03/05/2023',
  },
];

const TabToday: React.FC = () => {
  const renderData = () => {
    return (
      <View>
        {data.map((item, index) => (
          <>
            <ViewCus style={[styles.rowCenter, styles.mh16]}>
              <ViewCus flex-row f-1 style={[styles.alCenter]}>
                <Image source={Images.calendar} />
                <TextCus medium style={[styles.fz12, styles.ml8]}>
                  {item.time}
                </TextCus>
              </ViewCus>

              <TextCus medium style={styles.fz12}>
                {item.price}
              </TextCus>
            </ViewCus>

            <ViewCus style={[styles.bg]}>
              <ViewCus
                bbw-1
                style={[styles.rowCenter, styles.pb12, styles.bbwColor]}>
                <TextCus>{item.time}</TextCus>
                <TextCus bold style={styles.txtPrice}>
                  {item.price}
                </TextCus>
              </ViewCus>
              <TextCus heading5 style={styles.pt12}>
                {item.name}
              </TextCus>
              <ViewCus mt-4 flex-row style={[styles.alCenter]}>
                <TextCus style={[styles.gr85, styles.size14]}>
                  {item.day}
                </TextCus>
                <ViewCus style={styles.bg_grey} />
                <TextCus style={[styles.gr85]}>{item.city}</TextCus>
              </ViewCus>
            </ViewCus>
          </>
        ))}
      </View>
    );
  };

  return (
    <ViewCus bg-white f-1>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Images.ic_money} />
            <View>
              <TextCus bold color={Colors.white}>
                Thu nhập hôm nay
              </TextCus>
              <TextCus bold style={[styles.fz24]} color={Colors.white}>
                2.000.000đ
              </TextCus>
            </View>
          </View>
          <View style={styles.bw1}>
            <View style={styles.row}>
              <TextCus color={Colors.white} bold>
                Chấm công
              </TextCus>
              <TextCus color={Colors.white} bold>
                4 Buổi
              </TextCus>
            </View>
          </View>
        </View>
        <TextCus mb-8 bold style={[styles.mh16, styles.mt24, styles.fz16]}>
          Chi tiết
        </TextCus>
        {renderData()}
      </ScrollView>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bg: {
    backgroundColor: Colors.white,
    padding: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.black,
    elevation: 7,
    margin: 16,
    shadowRadius: 16,
    borderRadius: 16,
  },
  bg_grey: {
    backgroundColor: Colors.grey85,
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  alCenter: {
    alignItems: 'center',
  },
  mh16: {
    marginHorizontal: 16,
  },
  pb12: {
    paddingBottom: 12,
  },
  pt12: {
    paddingTop: 12,
  },
  gr85: {
    color: Colors.grey85,
  },
  size14: {
    fontSize: 14,
  },
  bbwColor: {
    borderBottomColor: Colors.greyEE,
  },
  fz12: {
    fontSize: 12,
    color: Colors.black,
  },
  txtPrice: {
    fontSize: 14,
  },
  fz16: {
    fontSize: 16,
  },
  ml8: {
    marginLeft: 8,
  },
  fz24: {
    fontSize: 24,
    marginTop: 4,
  },
  mt24: {
    marginTop: 24,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#277CBE',
    marginHorizontal: 20,
    borderRadius: 16,
  },
  bw1: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.white,
    paddingTop: 8,
    width: '100%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default TabToday;
