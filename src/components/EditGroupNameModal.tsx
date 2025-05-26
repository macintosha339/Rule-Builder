import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export const EditGroupNameModal: React.FC<Props> = ({ isOpen, initialName, onClose, onSave }) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) setName(initialName);
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Group Name</h2>
        <input
          type="text"
          className="border w-full p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              if (name.trim() !== '') {
                onSave(name.trim());
                onClose();
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};