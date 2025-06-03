// components/ConfirmationModal.tsx
'use client';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-white">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
