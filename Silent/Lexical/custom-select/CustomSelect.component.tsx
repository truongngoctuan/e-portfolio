import React, { memo, useEffect, useRef, useState } from 'react';
import ReactSelect, {
  IMenuItem,
} from '@tutum/design-system/components/ReactSelect';
import { SelectInstance } from 'react-select';
import CustomSelectMenuList from '../custom-select-menu-list';
import { ON_ITEM_SELECTED_COMMAND } from '../select-commands';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type IMenuItemType = IMenuItem;
export interface ICustomSelectProps {
  className?: string;
  nodeKey?: string;
  preventMenuOpenDefault?: boolean;
  preventOnKeyDownEvent?: boolean;
  items: any;
  selectedValue?: IMenuItemType;
  onItemSelect?: (item: any) => void;
  renderOptions?(item: IMenuItemType): React.ReactNode;
  getOptionValue?(item: IMenuItemType): string;
  autoFocus?: boolean;
  onCustomKeyDown?: (
    lowercaseKey: string,
    event: KeyboardEvent,
    currentQuery?: string
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  innerInputRef?: (inputId: string, input: HTMLInputElement) => void;
  inputId?: string;
}

const CustomSelect: React.FC<ICustomSelectProps> = (props) => {
  const {
    nodeKey,
    items,
    className,
    getOptionValue,
    onItemSelect,
    selectedValue,
    preventMenuOpenDefault,
    autoFocus,
    innerInputRef,
    inputId,
    onFocus,
  } = props;

  const [editor] = useLexicalComposerContext();
  const selectRef = useRef<SelectInstance<any> | null>(null);
  const [internalValue, setInternalValue] = useState('');

  const handleEnterForSelect = (event) => {
    const keyEvent = event.key.toLowerCase();

    if (keyEvent === 'enter') {
      event.stopPropagation();
    }

    props.onCustomKeyDown?.(keyEvent, event, internalValue);
  };

  useEffect(() => {
    innerInputRef?.(props.inputId, selectRef.current.inputRef);
  }, [innerInputRef, props.inputId]);

  const onItemSelected = (newValue: IMenuItemType) => {
    if (nodeKey && newValue) {
      editor.dispatchCommand(ON_ITEM_SELECTED_COMMAND, {
        nodeKey,
        selectedValue: newValue.value as string,
      });
    }
    if (onItemSelect) {
      onItemSelect(newValue);
    }
  };

  return (
    <ReactSelect
      isSearchable
      className={className}
      items={items ?? []}
      selectedValue={selectedValue?.value ?? null}
      onItemSelect={onItemSelected}
      menuPosition="fixed"
      menuPlacement="top"
      defaultMenuIsOpen={!preventMenuOpenDefault}
      autoFocus={autoFocus}
      maxMenuHeight={300}
      minMenuHeight={300}
      onKeyDown={handleEnterForSelect}
      onFocus={onFocus}
      inputValue={internalValue}
      inputId={inputId}
      onInputChange={(newValue) => setInternalValue(newValue)}
      openMenuOnFocus
      ref={(el) => {
        selectRef.current = el as any;
      }}
      components={{
        DropdownIndicator: null,
        MenuList: CustomSelectMenuList,
      }}
      getOptionValue={getOptionValue}
      styles={{
        menu: (provided) => ({
          ...provided,
          minWidth: '240px',
          width: '480px',
        }),
      }}
      placeholder=" "
      formatOptionLabel={props.renderOptions}
    />
  );
};

export default memo(CustomSelect);
