import React, {Fragment, useRef} from 'react';
import {TextInputs} from 'components/TextInputs';
import {styleSpacing} from 'utils';
import {SelecterPicker} from 'components/SelecterPicker';
import {InteractionManager, StyleProp, TextStyle} from 'react-native';
import {SELECT_OPTION} from 'types';
import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetModals} from 'components';
interface IProps {
  onBlur: () => void;
  onChange?: () => void;
  value: string;
  error: string | undefined;
  minDate?: string;
  maxDate?: string;
  onConfirmDate: (date: string) => void;
  isDisabled?: boolean;
  isViewTouch?: boolean;
  label?: string;
  placeholder?: string;
  isRequire?: boolean;
  styleLabel?: StyleProp<TextStyle>;
  icon?: string;
  type?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  iconColor?: string;
}
const DatePickerForm: React.FC<IProps> = ({
  onBlur,
  onChange,
  value,
  error,
  maxDate,
  minDate,
  onConfirmDate,
  isDisabled,
  isViewTouch,
  label,
  placeholder,
  isRequire,
  styleLabel,
  icon,
  type = 'none',
  iconColor = 'white',
}) => {
  const refModal = useRef<BottomSheet>(null);
  return (
    <Fragment>
      <TextInputs
        styleLabel={styleLabel}
        styleContent={[styleSpacing('mb-10')]}
        label={label ?? 'kyc.birthday'}
        isRequire={isRequire ?? false}
        placeholder={placeholder ?? 'kyc.choose_birthday'}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={error}
        type={type}
        onPress={() => refModal.current?.snapToIndex(0)}
        isViewTouch={isViewTouch}
        isDisabled={isDisabled}
        icon={icon}
        iconColor={iconColor}
      />
      <BottomSheetModals ref={refModal}>
        <SelecterPicker
          selectOptionTitle={'Chọn ngày'}
          selectType={SELECT_OPTION.DATE_PICKER}
          minDate={minDate}
          maxDate={maxDate}
          onCancelSelect={() => refModal.current?.close()}
          onConfirmSelect={date => {
            onConfirmDate(date);
            InteractionManager.runAfterInteractions(() => {
              refModal.current?.close();
            });
          }}
          selectedPickerDate={value}
        />
      </BottomSheetModals>
    </Fragment>
  );
};
export default DatePickerForm;
