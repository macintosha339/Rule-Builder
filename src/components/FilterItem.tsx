import React from 'react';
import { Filter } from '../types/types';

interface Props {
  filter: Filter;
}

export const FilterItem: React.FC<Props> = ({ filter }) => {
  return (
    <div className="bg-gray-100 p-2 rounded-md mb-2 flex gap-2 items-center">
      <select value={filter.field} disabled className="border p-1 rounded">
        <option>{filter.field}</option>
      </select>
      <select value={filter.operator} disabled className="border p-1 rounded">
        <option>{filter.operator}</option>
      </select>
      <input value={filter.value} disabled className="border p-1 rounded" />
    </div>
  );
};