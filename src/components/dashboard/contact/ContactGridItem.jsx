import React from 'react';
import ContactCard from '../ContactCard';

export default function ContactGridItem({
  contact,
  tags,
  isSelected,
  onSelect,
  onView,
  showCheckbox
}) {
  return (
    <div
      className="relative"
      onClick={() => onView(contact.id)}
    >
      {showCheckbox && (
        <div className="absolute top-2 right-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(contact.id);
            }}
            className="w-5 h-5 rounded border-slate-300"
          />
        </div>
      )}
      <ContactCard contact={contact} tags={tags} onClick={() => {}} />
    </div>
  );
}