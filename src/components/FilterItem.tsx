import React from 'react';
import { Filter } from '../types/types';

interface Props {
  filter: Filter;
  editable?: boolean;
  onChange?: (filter: Filter) => void;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

export const FilterItem: React.FC<Props> = ({
  filter,
  editable = false,
  onChange,
  onDelete,
  showDeleteButton = false,
}) => {
  const handleChange = (key: keyof Filter) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editable || !onChange) return;
    onChange({ ...filter, [key]: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-2 rounded-md mb-2 flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <select
          value={filter.field}
          onChange={handleChange('field')}
          disabled={!editable}
          className="border p-1 rounded"
        >
          <option value="gender">gender</option>
          <option value="birth_date">birth_date</option>
          <option value="channel">channel</option>
        </select>

        <select
          value={filter.operator}
          onChange={handleChange('operator')}
          disabled={!editable}
          className="border p-1 rounded"
        >
          <option value="equals">equals</option>
          <option value="not equals">not equals</option>
          <option value="is after">is after</option>
          <option value="is before">is before</option>
        </select>

        <input
          value={filter.value}
          onChange={handleChange('value')}
          disabled={!editable}
          className="border p-1 rounded"
        />
      </div>

      {showDeleteButton && onDelete && (
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
          title="Delete filter"
        >
          ❌
        </button>
      )}
    </div>
  );
};