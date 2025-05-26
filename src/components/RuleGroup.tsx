import React, { useState } from 'react';
import { RuleGroup as RuleGroupType, Filter } from '../types/types';
import { FilterItem } from './FilterItem';
import { EditGroupNameModal } from './EditGroupNameModal';

interface Props {
  group: RuleGroupType;
  onChange: (updatedGroup: RuleGroupType) => void;
}

export const RuleGroup: React.FC<Props> = ({ group, onChange }) => {
  const [isEditingName, setIsEditingName] = useState(false);

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

  const handleSaveName = (newName: string) => {
    onChange({ ...group, name: newName });
  };

  const handleToggleLogic = () => {
    const newLogic = group.logic === 'AND' ? 'OR' : 'AND';
    onChange({ ...group, logic: newLogic });
  };

  return (
    <>
      <div className={`border-2 p-3 rounded-lg mb-4 ${borderColor}`}>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold">Name:</span>
          <span>{group.name}</span>
          <button
            onClick={() => setIsEditingName(true)}
            className="text-blue-600 hover:underline"
            title="Edit group name"
          >
            ✏️
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold">Logic:</span>
          <button
            onClick={handleToggleLogic}
            className={`px-2 py-1 text-white rounded ${
              group.logic === 'AND' ? 'bg-blue-600' : 'bg-green-600'
            }`}
          >
            {group.logic}
          </button>
        </div>

        {group.filters.map((filter) => (
          <FilterItem key={filter.id} filter={filter} />
        ))}

        {group.groups.map((subgroup) => (
          <RuleGroup
            key={subgroup.id}
            group={subgroup}
            onChange={handleSubgroupChange}
          />
        ))}

        <div className="mt-2 space-x-2">
          <button onClick={handleAddFilter} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Filter</button>
          <button onClick={handleAddGroup} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Group</button>
        </div>
      </div>

      <EditGroupNameModal
        isOpen={isEditingName}
        initialName={group.name}
        onClose={() => setIsEditingName(false)}
        onSave={handleSaveName}
      />
    </>
  );
};