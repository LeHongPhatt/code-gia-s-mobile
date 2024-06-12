import { Images } from 'assets';
import {
  Divider,
  IconApp,
  IconCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { useAuth } from 'hooks';
import React from 'react';
import { StyleProp, ViewStyle, View, Image } from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  icon?: string;
  name: string;
  isLine?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styleLine?: StyleProp<ViewStyle>;
  isHiden?: boolean;
}

const ListItem: React.FC<IProps> = ({
  icon,
  name,
  isLine,
  onPress,
  style,
  styleLine,
  isHiden,
  iconRight,
  image,
}) => {
  const { userInfo } = useAuth();
  if (!isHiden) {
    return <ViewCus />;
  }

  return (
    <>
      <TouchCus
        onPress={onPress}
        style={[BaseStyle.flexRowSpaceBetwwen, BaseStyle.wrapperMain, style]}
        bg-white>
        <ViewCus style={[BaseStyle.flexRowCenter]}>
          {icon && (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 14,
                backgroundColor: '#1A2D59',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconApp name={icon} size={14} color={Colors.white} />
            </View>
          )}
          {image && (
            <Image
              source={
                userInfo?.avatar ? { uri: userInfo?.avatar } : Images.comsuon
              }
              style={{
                width: 44,
                height: 44,
                borderRadius: 122,
              }}
            />
          )}
          <TextCus ml-16 useI18n>
            {name}
          </TextCus>
        </ViewCus>
        {iconRight && <IconCus name={'chevron-right'} />}
      </TouchCus>
      {!isLine && <Divider large style={[styleLine]} />}
    </>
  );
};
export default ListItem;
