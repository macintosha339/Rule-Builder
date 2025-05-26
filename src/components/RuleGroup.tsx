import React from 'react';
import { RuleGroup as RuleGroupType, Filter } from '../types/types';
import { FilterItem } from './FilterItem';

interface Props {
  group: RuleGroupType;
  onChange: (updatedGroup: RuleGroupType) => void;
}

export const RuleGroup: React.FC<Props> = ({ group, onChange }) => {
  const borderColor = group.logic === 'AND' ? 'border-blue-500' : 'border-green-500';

  const handleAddFilter = () => {
    const newFilter: Filter = {
      id: crypto.randomUUID(),
      field: 'gender',
      operator: 'equals',
      value: '',
    };

    onChange({
      ...group,
      filters: [...group.filters, newFilter],
    });
  };

  const handleAddGroup = () => {
    const newGroup: RuleGroupType = {
      id: crypto.randomUUID(),
      name: 'New GROUP',
      logic: 'AND',
      filters: [],
      groups: [],
      isLocked: false,
      isDisabled: false,
      isHidden: false,
    };

    onChange({
      ...group,
      groups: [...group.groups, newGroup],
    });
  };

  const handleSubgroupChange = (updatedSubgroup: RuleGroupType) => {
    const updatedGroups = group.groups.map(g => g.id === updatedSubgroup.id ? updatedSubgroup : g);
    onChange({ ...group, groups: updatedGroups });
  };

  return (
    <div className={`border-2 p-3 rounded-lg mb-4 ${borderColor}`}>
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {group.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Logic:</span> {group.logic}
      </div>

      {group.filters.map((filter) => (
        <FilterItem key={filter.id} filter={filter} />
      ))}

      {group.groups.map((subgroup) => (
        <RuleGroup
          key={subgroup.id}
          group={subgroup}
          onChange={(updated) => handleSubgroupChange(updated)}
        />
      ))}

      <div className="mt-2 space-x-2">
        <button onClick={handleAddFilter} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Filter</button>
        <button onClick={handleAddGroup} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Group</button>
      </div>
    </div>
  );
};