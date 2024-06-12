import { useOrder } from 'hooks';
import React, { useEffect } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Colors, FontWeight } from 'theme';
import { TextCus, TouchCus, ViewCus } from 'components';
import { TaxiDeviceEvent } from 'types';
import TabToday from './components/TabToday';
import TabMonth from './components/TabMonth';

const TabControl = () => {
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

  const [routes] = React.useState([
    { key: 'today', title: 'Hôm nay' },
    { key: 'month', title: 'Tháng này' },
  ]);



  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'today': {
        return <TabToday />;
      }

      case 'month': {
        return <TabMonth/>
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

export default TabControl;
