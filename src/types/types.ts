export type LogicType = 'AND' | 'OR';

export interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface RuleGroup {
  id: string;
  name: string;
  logic: LogicType;
  filters: Filter[];
  groups: RuleGroup[];
  isLocked: boolean;
  isDisabled: boolean;
  isHidden: boolean;
}