import { useRoute } from '@react-navigation/native';
import { Images } from 'assets';
import { HeaderPrice, HomeLayout, IconCus, TextCus, ViewCus } from 'components';
import { useAuth, useOrder } from 'hooks';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Colors } from 'theme';
import { isIos } from 'utils';
import { TabHomeControl } from './Components';
import styles from './styles';

const Home: React.FC = () => {
  const { userInfo } = useAuth();
  const { getSalary } = useOrder();
  useEffect(() => {
    getSalary();
  }, []);

  return (
    <HomeLayout
      bgColor={isIos ? Colors.main : Colors.white}
      header={{
        notGoBack: true,
      }}>
      {/* <IndicatorTop /> */}
      <ViewCus f-1 bg-greyF7 style={{ overflow: 'hidden' }}>
        <ViewCus
          style={[styles.shadow]}
          flex-row
          justify-space-between
          px-16
          py-12
          items-center
          bg-white>
          <ViewCus f-1>
            <TextCus heading4 bold color={Colors.blue1B}>
              {userInfo?.full_name || 'Chào Bạn'}
            </TextCus>
          </ViewCus>
          <ViewCus items-center f-1>
            <Image source={Images.logo} style={styles.logo} />
          </ViewCus>
          <ViewCus items-flex-end f-1>
            <ViewCus style={styles.containerBell}>
              <ViewCus>
                <IconCus name={'bell'} size={24} color={Colors.blue1B} />
                <ViewCus style={[styles.tick]} />
              </ViewCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
        <HeaderPrice price={'90000000' || '......'} day={'15'} />
        <TabHomeControl />
      </ViewCus>
    </HomeLayout>
  );
};
export default Home;
