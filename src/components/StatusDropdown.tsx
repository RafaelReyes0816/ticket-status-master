
import React, { useState } from 'react';
import { Ticket } from './Dashboard';

interface StatusDropdownProps {
  currentStatus: Ticket['status'];
  onStatusChange: (newStatus: Ticket['status']) => void;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({ 
  currentStatus, 
  onStatusChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'nuevo', label: 'Nuevo', color: 'status-nuevo' },
    { value: 'en-progreso', label: 'En Progreso', color: 'status-en-progreso' },
    { value: 'resuelto', label: 'Resuelto', color: 'status-resuelto' },
    { value: 'cerrado', label: 'Cerrado', color: 'status-cerrado' }
  ] as const;

  const currentOption = statusOptions.find(option => option.value === currentStatus)!;

  const handleStatusChange = (newStatus: Ticket['status']) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`status-badge ${currentOption.color} cursor-pointer hover:opacity-80 transition-opacity duration-200 flex items-center space-x-1`}
      >
        <span>{currentOption.label}</span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar el dropdown */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg min-w-max animate-fade-in">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                  option.value === currentStatus ? 'bg-slate-50' : ''
                }`}
              >
                <span className={`status-badge ${option.color}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
