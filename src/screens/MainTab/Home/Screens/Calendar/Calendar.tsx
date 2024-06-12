import Icon from 'assets/svg/Icon';
import {
  Buttons,
  IconCus,
  TextCus,
  ViewCus,
  TouchCus,
  BottomSheetCommon,
  SelecterPicker,
} from 'components';
import { NavigationService, Routes } from 'navigation';

import {
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  InteractionManager,
} from 'react-native';
import { BaseStyle, Colors } from 'theme';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { formatDMY, getNow, styleSpacing } from 'utils';
import { SELECT_OPTION } from 'types';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
interface ItemData {
  time: string;
  name: string;
  city: string;
  price: string;
  subject: string;
  class: string;
}

const data: ItemData[] = [
  {
    time: '15:00 - 16:30',
    name: 'Nguyễn Phúc Gia Huy',
    city: 'Biên Hoà',
    price: '450K/Buổi',
    subject: 'toán',
    class: 'TO001',
  },
  {
    time: '15:00 - 16:30',
    name: 'Nguyễn Phúc Gia Huy',
    city: 'Biên Hoà',
    price: '450K/Buổi',
    subject: 'toán',
    class: 'TO001',
  },
];

const Calendar: React.FC = ({ to_date, from_date, dataClass }) => {
  const route = useRoute();
  const userData = route.params?.userData;

  const [startDate, setStartDate] = useState<string | null>(
    from_date || new Date(),
  );
  const [endDate, setEndDate] = useState<string | null>(to_date || new Date());
  const refModalStartDate = useRef<IRefBottom>(null);
  const refModalEndDate = useRef<IRefBottom>(null);

  const _onConfirmStartDate = (date: any) => {
    setStartDate(date);
    InteractionManager.runAfterInteractions(() => {
      refModalStartDate.current?.close();
    });
  };

  const _onConfirmEndDate = (date: any) => {
    setEndDate(date);
    InteractionManager.runAfterInteractions(() => {
      refModalEndDate.current?.close();
    });
  };
  const renderData = () => {
    if (dataClass?.length > 0) {
      return (
        <View>
          {dataClass.map((item, index) => {
            return (
              <View key={index} style={styles.boxContainer}>
                <View style={styles.containerTime}>
                  <IconCus name={'calendar'} size={20} color="blue" />
                  <TextCus color={Colors.black} ml-8>
                    {/* {item.user.full_name} */}
                  </TextCus>
                </View>
                <TextCus pt-12 heading5>
                  {item.name}
                </TextCus>
                <View style={[styles.rowCenter, styles.mv4]}>
                  <TextCus color={Colors.grey85}>Lớp:{item.class}</TextCus>
                  <View style={[styles.dot]} />
                  <TextCus color={Colors.grey85}>{item.city}</TextCus>
                  <View style={[styles.dot]} />
                  <TextCus color={Colors.grey85}>{item.price}</TextCus>
                </View>

                <TextCus color={Colors.grey85}>
                  Môn : {item?.user?.teaching_subjects}
                </TextCus>
                <Buttons
                  onPress={() =>
                    NavigationService.navigate(Routes.DetailLesson)
                  }
                  style={styles.btn}
                  textBtn="Xem chi tiết "
                />
              </View>
            );
          })}
        </View>
      );
    } else {
      return (
        <ViewCus justify-center f-1>
          <TextCus color={Colors.gray85} heading4 textAlign="center">
            Danh sách trống
          </TextCus>
        </ViewCus>
      );
    }
  };

  return (
    <>
      <ViewCus style={styles.tabContainer}>
        <ViewCus style={[styles.cenItem]}>
          <TouchCus
            style={[styleSpacing('mx-16')]}
            onPress={() => refModalStartDate.current?.show()}>
            <View style={styles.flex1}>
              <View style={{ flexDirection: 'row' }}>
                <TextCus style={styles.txtStartDay} useI18n>
                  home.prevDay
                </TextCus>
                <TextCus style={[styles.pickDay]}>
                  {moment(startDate).format('DD-MM-YYYY')}
                </TextCus>
              </View>
            </View>
          </TouchCus>
          <TouchCus
            style={[styleSpacing('mx-16')]}
            onPress={() => refModalEndDate.current?.show()}>
            <View style={styles.flex1}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextCus style={styles.txtStartDay} useI18n>
                  home.endDay
                </TextCus>
                <TextCus style={[styles.pickDay]}>
                  {moment(endDate).format('DD-MM-YYYY')}
                </TextCus>
              </View>
            </View>
          </TouchCus>
        </ViewCus>

        <BottomSheetCommon
          ref={refModalStartDate}
          pressBehavior="close"
          hideBackdrop>
          <SelecterPicker
            selectOptionTitle={'Từ ngày'}
            selectType={SELECT_OPTION.DATE_PICKER}
            // maxDate={getNow()}
            onCancelSelect={() => refModalStartDate.current?.close()}
            onConfirmSelect={_onConfirmStartDate}
            selectedPickerDate={moment(startDate).format('DD-MM-YYYY')}
          />
        </BottomSheetCommon>
        <BottomSheetCommon
          ref={refModalEndDate}
          pressBehavior="close"
          hideBackdrop>
          <SelecterPicker
            selectOptionTitle={'Đến ngày'}
            selectType={SELECT_OPTION.DATE_PICKER}
            // maxDate={getNow()}
            onCancelSelect={() => refModalEndDate.current?.show()}
            onConfirmSelect={_onConfirmEndDate}
            selectedPickerDate={moment(endDate).format('DD-MM-YYYY')}
          />
        </BottomSheetCommon>
      </ViewCus>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {renderData()}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 9,
    paddingVertical: 8,
    backgroundColor: Colors.blue1B,
  },

  dot: {
    width: 4,
    height: 4,
    backgroundColor: Colors.grey85,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  containerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
    justifyContent: 'center',
    borderBottomColor: Colors.greyEE,
  },
  boxContainer: {
    padding: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    shadowColor: Colors.black,
    borderRadius: 16,
    marginTop: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mv4: {
    marginVertical: 4,
  },
  cenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txtStartDay: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 9,
  },
  pickDay: {
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
    borderColor: Colors.greyEE,
  },
});

export default Calendar;
