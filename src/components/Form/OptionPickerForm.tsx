import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetCommon, TextInputs} from 'components';
import {SelecterPicker} from 'components/SelecterPicker';
import React, {Fragment, useRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SELECT_OPTION, TArrayGender, TGenderValue} from 'types';
import {styleSpacing} from 'utils';
interface IProps {
  onBlur: () => void;
  onChange: () => void;
  value: TGenderValue | string | number;
  error: string | undefined;
  onConfirmOption: (date: TGenderValue) => void;
  title: string;
  dataOptions: TArrayGender | string[];
  selectedOption?: any;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isViewTouch?: boolean;
  icon?: string;
  styleContent: StyleProp<ViewStyle>;
  iconColor?: string;
}
const OptionPickerForm: React.FC<IProps> = ({
  onBlur,
  onChange,
  value,
  error,
  onConfirmOption,
  title,
  dataOptions,
  selectedOption,
  label,
  placeholder,
  isDisabled,
  isViewTouch,
  icon,
  styleContent,
  iconColor,
}) => {
  const refModal = useRef<BottomSheet>(null);
  return (
    <Fragment>
      <TextInputs
        styleContent={[styleSpacing('mb-10'), styleContent]}
        label={label ?? 'kyc.gender'}
        isRequire
        placeholder={placeholder ?? 'kyc.choose_gender'}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={error}
        type="none"
        onPress={() => refModal.current?.snapToIndex(0)}
        isViewTouch={isViewTouch}
        isDisabled={isDisabled}
        icon={icon}
        iconColor={iconColor}
      />
      <BottomSheetCommon ref={refModal}>
        <SelecterPicker
          selectOptionTitle={title}
          selectType={SELECT_OPTION.OPTION_PICKER}
          dataOptions={dataOptions}
          onCancelSelect={() => refModal.current?.close()}
          onConfirmSelect={option => {
            onConfirmOption(option.data);
            refModal.current?.close();
          }}
          selectedGenderOption={selectedOption}
        />
      </BottomSheetCommon>
    </Fragment>
  );
};
export default OptionPickerForm;
