import React from 'react';
// import { NotificationItem } from './components';
import { HomeLayout, TextCus, ViewCus } from 'components';
import { Colors } from 'theme';
import TabControl from './TabControl';

const Money: React.FC = () => {
  // const renderItem = useCallback(() => {
  //   return <NotificationItem />;
  // }, []);
  return (
    <HomeLayout
      // bgColor={Colors.main}
      header={{
        // title: 'bottom.price',
        notGoBack: true,
        iconColor: Colors.white,
      }}>
      {/* <RNFlatList
        data={[...Array(10).keys()]}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      /> */}
      <ViewCus f-1 bg-greyF7 style={{ overflow: 'hidden' }}>
        <ViewCus
          flex-row
          justify-space-between
          px-16
          py-12
          items-center
          bg-white>
          <ViewCus>
            <TextCus heading4 bold color={Colors.blue1B}>
              {/* {userInfo?.full_name || ''} */}
              Lương của tôi
            </TextCus>
          </ViewCus>
        </ViewCus>
        <TabControl />
      </ViewCus>
    </HomeLayout>
  );
};
export default Money;
