import { IconName } from 'assets';
import { IconApp, IconCus, TextCus, TouchCus } from 'components';
import { NavigationService } from 'navigation';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'theme';
import { IHeader } from 'types';
import { HIT_SLOP } from 'utils';
import styles from './styles';

export function HeaderPrice(props: IHeader) {
  const {
    style,
    title,
    renderLeft,
    renderCenter,
    renderRight,
    notGoBack = false,
    iconColor,
    price,
    day
  } = props;

  return (
    <View style={[styles.blueHeader]}>
      <View style={[styles.book]}>
        <IconCus name={'book-open'} color={Colors.blue1B} />
      </View>
      <TextCus style={[styles.colorText]}>Tổng ngày công:{day}</TextCus>
      <TextCus style={[styles.txtPrice]}>Lương tạm tính:{price}</TextCus>
    </View>
  );
}
