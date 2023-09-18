import type { ISelectProps, IMenuItem, IMenuItemWithData } from './ReactSelect';
import StyledReactSelect from './ReactSelect.styled';
import { components } from 'react-select';

export default StyledReactSelect;

export const coreComponents = components;

export { StyledReactSelect as ReactSelect };
export type { ISelectProps, IMenuItem, IMenuItemWithData };
