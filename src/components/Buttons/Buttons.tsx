import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from 'theme';
// import {Texts} from 'components';
import styles from './styles';
import { withStyle } from 'HOC';
import { TextCus } from 'components';
import { IButtons } from 'types';

const Buttons: React.FC<IButtons> = props => {
  const {
    styleTitle,
    style,
    icon,
    outline,
    full,
    round,
    loading,
    shadow,
    children,
    disabled,
    textBtn,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[
        [styles.default, { backgroundColor: Colors.main }],
        outline && [styles.outline],
        shadow && styles.shadow,
        full && styles.full,
        round && styles.round,
        disabled && { backgroundColor: Colors.disable },
        style,
      ]}
      activeOpacity={0.9}>
      {children && children}
      {textBtn && (
        <TextCus style={styleTitle} useI18n heading5 color-white>
          {textBtn}
        </TextCus>
      )}
      {icon ? icon : null}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? Colors.main : Colors.white}
          style={styles.padLeft5}
        />
      ) : null}
    </TouchableOpacity>
  );
};
export default withStyle(Buttons);
