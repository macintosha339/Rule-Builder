import React, { useState } from 'react';
import { RuleGroup as RuleGroupType, Filter } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { FilterItem } from './FilterItem';
import { EditGroupNameModal } from './EditGroupNameModal';

interface Props {
  group: RuleGroupType;
  onChange: (updatedGroup: RuleGroupType) => void;
}

export const RuleGroup: React.FC<Props> = ({ group, onChange }) => {
  const [isEditingName, setIsEditingName] = useState(false);

  const borderColor = group.logic === 'AND' ? 'border-blue-500' : 'border-green-500';
  const isLocked = group.isLocked;
  const isDisabled = group.isDisabled;
  const isHidden = group.isHidden;

  const handleAddFilter = () => {
    if (isLocked) return;
    const newFilter: Filter = {
      id: uuidv4(),
      field: 'gender',
      operator: 'equals',
      value: '',
    };
    onChange({ ...group, filters: [...group.filters, newFilter] });
  };

  const handleAddGroup = () => {
    if (isLocked) return;
    const newGroup: RuleGroupType = {
      id: uuidv4(),
      name: 'New Group',
      logic: 'AND',
      filters: [],
      groups: [],
      isLocked: false,
      isDisabled: false,
      isHidden: false,
    };
    onChange({ ...group, groups: [...group.groups, newGroup] });
  };

  const handleToggleLogic = () => {
    if (isLocked) return;
    onChange({ ...group, logic: group.logic === 'AND' ? 'OR' : 'AND' });
  };

  const handleSaveName = (newName: string) => {
    onChange({ ...group, name: newName });
    setIsEditingName(false);
  };

  const toggleLock = () => onChange({ ...group, isLocked: !group.isLocked });
  const toggleDisable = () => onChange({ ...group, isDisabled: !group.isDisabled });
  const toggleHidden = () => onChange({ ...group, isHidden: !group.isHidden });

  return (
    <>
      <div
        className={`
          border-2 p-3 rounded-lg mb-4 relative
          ${borderColor}
          ${isDisabled ? 'opacity-60' : ''}
        `}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Name:</span>
          <span>{group.name}</span>
          <button
            onClick={() => !isLocked && setIsEditingName(true)}
            className="text-blue-600 hover:underline"
            disabled={isLocked}
            title="Edit name"
          >
            ✏️
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Logic:</span>
          <button
            onClick={handleToggleLogic}
            disabled={isLocked}
            className={`px-2 py-1 text-white rounded ${
              group.logic === 'AND' ? 'bg-blue-600' : 'bg-green-600'
            }`}
          >
            {group.logic}
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button onClick={toggleLock} className="text-sm px-2 py-1 border rounded">
            {isLocked ? 'Unlock 🔓' : 'Lock 🔒'}
          </button>
          <button onClick={toggleDisable} className="text-sm px-2 py-1 border rounded">
            {isDisabled ? 'Enable ✅' : 'Disable 🚫'}
          </button>
          <button onClick={toggleHidden} className="text-sm px-2 py-1 border rounded">
            {isHidden ? 'Expand 👁‍🗨' : 'Collapse 👁'}
          </button>
        </div>

        {!isHidden && (
          <>
            <div className="space-y-2">
              {group.filters.map((filter) => (
                <FilterItem
                  key={filter.id}
                  filter={filter}
                  // placeholder for future props: isEditable={!isLocked && !isDisabled}
                />
              ))}

              {group.groups.map((subgroup) => (
                <RuleGroup
                  key={subgroup.id}
                  group={subgroup}
                  onChange={(updated) => {
                    const updatedGroups = group.groups.map((g) =>
                      g.id === updated.id ? updated : g
                    );
                    onChange({ ...group, groups: updatedGroups });
                  }}
                />
              ))}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={handleAddFilter}
                className="bg-blue-600 text-white px-3 py-1 rounded"
                disabled={isLocked}
              >
                + Add Filter
              </button>
              <button
                onClick={handleAddGroup}
                className="bg-blue-600 text-white px-3 py-1 rounded"
                disabled={isLocked}
              >
                + Add Group
              </button>
            </div>
          </>
        )}
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