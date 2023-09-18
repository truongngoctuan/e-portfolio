import React from 'react';
import { getCssClass } from '@tutum/design-system/infrastructure/utils';
import OriginCustomSelect, {
  ICustomSelectProps,
} from './CustomSelect.component';
import { mixTypography } from '@tutum/design-system/themes/styles';
import { styled } from '@tutum/design-system/models';

const CustomSelect: React.ComponentType<ICustomSelectProps> = styled(
  OriginCustomSelect
).attrs(() => ({
  className: getCssClass('sl-composerx-suggest'),
}))`
  ${mixTypography('composer')}
  text-align: left;

  .react-select__control {
    border: none;
    min-height: 16px;
    max-height: 20px;
    background-color: transparent;

    &:hover,
    &--menu-is-open,
    &--is-focused {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }

    .react-select__input {
      height: 16px;
    }
  }

  .react-select__value-container {
    padding: 0px;
  }

  .react-select__single-value {
    margin: 0px;
    color: ${(props) => props.theme.foreground['01']};
    line-height: initial;
  }

  .react-select__single-value:focused {
    border: none !important;
  }

  .react-select__input-container {
    margin: 0px;
    line-height: 20px;
    height: 20px;
    color: ${(props) => props.theme.foreground['01']};
  }

  .react-select__placeholder {
    margin: 0px;
    line-height: 16px;
    height: 16px;
    color: ${(props) => props.theme.foreground['01']};
  }

  .react-select__menu {
    min-width: 200px;
    height: auto !important;
  }

  .react-select__option {
    padding-left: 22px;
  }
`;

export default CustomSelect;
