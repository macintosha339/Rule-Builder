import React from 'react';
import { RuleGroup as RuleGroupType } from '../types/types';
import { FilterItem } from './FilterItem';

interface Props {
  group: RuleGroupType;
}

export const RuleGroup: React.FC<Props> = ({ group }) => {
  const borderColor = group.logic === 'AND' ? 'border-blue-500' : 'border-green-500';

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
        <RuleGroup key={subgroup.id} group={subgroup} />
      ))}

      <div className="mt-2 space-x-2">
        <button className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Filter</button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Group</button>
      </div>
    </div>
  );
};