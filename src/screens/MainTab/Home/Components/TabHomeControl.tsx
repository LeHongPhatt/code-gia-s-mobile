import { useOrder } from 'hooks';
import React, { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Colors, FontWeight } from 'theme';
// import { TabOrder } from './Order';
import { TextCus, TouchCus, ViewCus } from 'components';
import { TaxiTab } from './TaxiOrder';
import { TaxiDeviceEvent } from 'types';
import { Calendar } from '../Screens/Calendar';
import moment from 'moment';

const TabHomeControl = () => {
  const {
    getListProcessingOrder,
    listOrderProcessing,
    onEndReachedListProcessingOrder,
    numOrderProcess,
    onUpdateStatusOrder,
    loadingProcessingList,
  } = useOrder();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [from_date, setFrom_date] = useState(new Date());
  const [to_date, setTo_date] = useState(new Date());
  const [page, setPage] = useState(1);
  const [dataClass, setdataClass] = useState([]);

  const [routes] = React.useState([
    { key: 'order', title: 'Lịch dạy sắp tới của bạn' },
    { key: 'taxi', title: 'Lịch sử dạy' },
  ]);

  useEffect(() => {
    onRefresh();
  }, []);
  //#region Handle func
  const onRefresh = () => {
    getListProcessingOrder(
      {
        from_date: moment(from_date).format('YYYY-MM-DD'),
        to_date: moment(to_date).format('YYYY-MM-DD'),
        take_the_past: false,
        page: page,
      },
      res => {
        if (res.status === 200) {
          setdataClass(res.data.result);
        }
      },
    );
  };
  const onEndReached = () => {
    onEndReachedListProcessingOrder();
  };
  const onPressUpdateStatusOrder = ({ orderCode, status }) => {
    onUpdateStatusOrder({ orderCode, status });
  };
  //#endregion

  //#region Render Func
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'order': {
        return (
          <Calendar
            dataClass={dataClass}
            from_date={from_date}
            to_date={to_date}
          />
        );
      }

      case 'taxi': {
        return (
          <TaxiTab
            dataClass={dataClass}
            from_date={from_date}
            to_date={to_date}
          />
        );
      }
      default:
        break;
    }
  };

  const renderTabBar = props => {
    return (
      <ViewCus style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const selectedItem = index === i;
          return (
            <TouchCus
              key={route.key}
              style={[styles.tabItem, selectedItem && styles.selectedTabItem]}
              onPress={() => setIndex(i)}>
              <TextCus>
                <TextCus
                  useI18n
                  style={[styles.label, selectedItem && styles.selectedLabel]}>
                  {route.title}
                </TextCus>
              </TextCus>
            </TouchCus>
          );
        })}
      </ViewCus>
    );
  };
  //#endregion

  //#region Wacth change

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener(
      TaxiDeviceEvent.ON_ACCEPT_NEW_ORDER,
      () => {
        setIndex(1);
      },
    );
    return () => {
      listen.remove();
    };
  }, []);
  //#endregion

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  selectedTabItem: {
    borderBottomColor: Colors.blue1B,
    borderBottomWidth: 2,
    borderRadius: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Colors.gray85,
  },
  selectedLabel: {
    color: Colors.blue1B,
  },
});

export default TabHomeControl;
