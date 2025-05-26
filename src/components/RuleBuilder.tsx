import React, { useState } from 'react';
import { RuleGroup } from './RuleGroup';
import { RuleGroup as RuleGroupType } from '../types/types';

const initialGroup: RuleGroupType = {
  id: 'group-1',
  name: 'New group',
  logic: 'AND',
  filters: [],
  groups: [],
  isLocked: false,
  isDisabled: false,
  isHidden: false,
};

export const RuleBuilder: React.FC = () => {
  const [rootGroup, setRootGroup] = useState<RuleGroupType>(initialGroup);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Rule Builder</h1>
      <RuleGroup group={rootGroup} />
    </div>
  );
};