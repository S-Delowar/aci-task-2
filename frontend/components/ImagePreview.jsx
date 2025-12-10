"use client";

export default function ImagePreview({ file, onRemove }) {
  if (!file) return null;

  const previewUrl = URL.createObjectURL(file);

  return (
    <div className="flex items-center gap-3 mt-2 bg-gray-100 p-2 rounded-lg">
      <img
        src={previewUrl}
        alt="preview"
        className="w-20 h-20 object-cover rounded-md border"
      />
      <button className="text-red-600 font-medium" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}