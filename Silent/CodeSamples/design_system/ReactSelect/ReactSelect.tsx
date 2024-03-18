import React, { useEffect, useState } from 'react';
import { Icon } from 'design-system/components/Core';
import ReactSelect, { Props, GroupBase } from 'react-select';
import { COLOR } from 'design-system/themes/styles';
import { scaleSpace } from 'design-system/styles';
import ISelect from 'react-select/dist/declarations/src/Select';
import I18n from 'infrastructure/i18n';
import { useTheme } from 'styled-components';
import { BaseDefaultTheme } from 'design-system/themes';

export interface IMenuItem<T = number | string> {
  value: T;
  label: string;
  id?: string;
  isDisabled?: boolean;
}

export interface IMenuItemWithData<T> {
  value: number | string;
  label: string;
  data?: T;
}

export interface ISelectProps<T extends IMenuItem> extends Props {
  selectedValue?: number | string | Array<string | number>;
  items: T[];
  noResults?: React.ReactNode;
  className?: string;
  placeholder?: string;
  onItemSelect?: (item: T) => void;
}

const DropdownIndicator = () => {
  return <Icon icon="caret-down" color={COLOR.COLOR_TEXT_03} />;
};

const handleValue = (
  items: IMenuItem[],
  selectedValue?: number | string | Array<string | number>
): IMenuItem | IMenuItem[] => {
  if (Array.isArray(selectedValue)) {
    const listItem = selectedValue?.map((value) =>
      items?.find((item) => item?.value === value)
    );
    return listItem?.length ? listItem : null;
  }
  const itemMenu = items?.find((item) => item?.value === selectedValue);
  if (itemMenu) return itemMenu;
  return selectedValue
    ? { value: selectedValue, label: `${selectedValue}` }
    : null;
};

const Select = React.forwardRef(
  <T extends IMenuItem>(
    {
      selectedValue,
      items,
      noResults,
      placeholder,
      onItemSelect,
      ...props
    }: ISelectProps<T>,
    ref: React.Ref<ISelect<unknown, boolean, GroupBase<unknown>>>
  ) => {
    const { t } = I18n.useTranslation<any>({
      namespace: 'Common',
      nestedTrans: 'Select',
    });
    const [target, setTarget] = useState(undefined);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setTarget(document.body);
      }
    }, []);

    const styledTheme = useTheme() as BaseDefaultTheme<{}>;

    // todo <ReactSelect<T>
    return (
      <ReactSelect
        {...props}
        ref={ref}
        value={handleValue(items, selectedValue)}
        classNamePrefix={props.classNamePrefix ?? 'react-select'}
        options={items}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
          ClearIndicator: null,
          ...props.components,
        }}
        placeholder={placeholder || t('select')}
        noOptionsMessage={() => noResults || <div>{t('noResults')}</div>}
        onChange={(item) => {
          onItemSelect((item || { value: '' }) as T);
        }}
        menuPortalTarget={target}
        isClearable={props.isClearable || true}
        backspaceRemovesValue={props.backspaceRemovesValue || true}
        styles={{
          ...props.styles,
          menuPortal: (base) => ({ ...base, zIndex: 999 }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? COLOR.COLOR_PALETTE_BLUE_LIGHTER
              : state.isFocused
              ? COLOR.COLOR_PALETTE_BLUE_LIGHTEST
              : 'initial',
            color: state.isSelected ? COLOR.COLOR_TEXT_01 : 'initial',
            ...(props.styles?.option ? props.styles?.option(base, state) : {}),
          }),
          indicatorsContainer: (base) => ({
            ...base,
            paddingRight: scaleSpace(2),
          }),
        }}
        theme={(theme) => ({
          ...theme,
          ...styledTheme,
        })}
      />
    );
  }
);

export default Select;
