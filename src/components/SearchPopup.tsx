import React from "react";
// ... imports

export function SearchPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popup">
      <h2 className="font-bold text-xl mb-2">Search Everlasting Kin Database</h2>
      {/* Implement search form, results (read-only) */}
      <button className="btn-muted mt-4" onClick={onClose}>Close</button>
    </div>
  );
}