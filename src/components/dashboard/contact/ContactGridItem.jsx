import React from 'react';
import { cn } from '@/lib/utils';
import ContactCard from '../ContactCard';

export default function ContactGridItem({
  contact,
  tags,
  isSelected,
  onSelect,
  onView,
  showCheckbox
}) {
  const handleClick = () => {
    if (showCheckbox) {
      onSelect(contact.id);
    } else {
      onView(contact.id);
    }
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-opacity",
        showCheckbox && isSelected && "opacity-75 ring-2 ring-blue-500 rounded-xl"
      )}
      onClick={handleClick}
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
            className="w-5 h-5 rounded border-slate-300 cursor-pointer"
          />
        </div>
      )}
      <ContactCard contact={contact} tags={tags} onClick={() => {}} />
    </div>
  );
}