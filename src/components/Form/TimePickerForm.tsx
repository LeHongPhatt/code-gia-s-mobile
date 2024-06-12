import React, {Fragment, useRef} from 'react';
import {TextInputs} from 'components/TextInputs';
import {styleSpacing} from 'utils';
import {SelecterPicker} from 'components/SelecterPicker';
import {InteractionManager, StyleProp, TextStyle} from 'react-native';
import {ISelectTime, SELECT_OPTION} from 'types';
import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetModals} from 'components/BottomSheetModals';
interface IProps {
  onBlur: () => void;
  onChange: () => void;
  value: ISelectTime;
  error: string;
  minDate?: string;
  maxDate?: string;
  onConfirmTime: (time: string) => void;
  placeholder?: string;
  label?: string;
  isRequire?: boolean;
  styleLabel?: StyleProp<TextStyle>;
  icon?: string;
  type?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  iconColor?: string;
}
const TimePickerForm: React.FC<IProps> = ({
  onBlur,
  onChange,
  value,
  error,
  onConfirmTime,
  label,
  placeholder,
  isRequire,
  styleLabel,
  icon,
  type = 'none',
  iconColor,
}) => {
  const refModal = useRef<BottomSheet>(null);
  return (
    <Fragment>
      <TextInputs
        styleLabel={styleLabel}
        styleContent={[styleSpacing('mb-10')]}
        label={label ?? 'kyc.birthday'}
        isRequire={isRequire ?? true}
        placeholder={placeholder ?? 'kyc.choose_birthday'}
        onBlur={onBlur}
        onChangeText={onChange}
        value={!!value?.hour ? `${value?.hour}:${value?.minute}` : ''}
        error={error}
        type={type}
        onPress={() => refModal.current?.snapToIndex(0)}
        isViewTouch
        icon={icon}
        iconColor={iconColor}
      />
      <BottomSheetModals ref={refModal}>
        <SelecterPicker
          selectOptionTitle={'Chọn giờ'}
          selectType={SELECT_OPTION.TIME_PICKER}
          addedMinutes={'0'}
          onConfirmSelect={time => {
            onConfirmTime(time);
            InteractionManager.runAfterInteractions(() => {
              refModal.current?.close();
            });
          }}
          selectedPickerTime={value}
          onCancelSelect={() => refModal.current?.close()}
        />
      </BottomSheetModals>
    </Fragment>
  );
};
export default TimePickerForm;
