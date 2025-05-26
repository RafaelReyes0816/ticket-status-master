
import React, { useState } from 'react';

interface TicketFiltersProps {
  onFilterChange: (status: string, priority: string, search: string) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({ onFilterChange }) => {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterUpdate = (newStatus?: string, newPriority?: string, newSearch?: string) => {
    const status = newStatus !== undefined ? newStatus : statusFilter;
    const priority = newPriority !== undefined ? newPriority : priorityFilter;
    const search = newSearch !== undefined ? newSearch : searchTerm;

    if (newStatus !== undefined) setStatusFilter(newStatus);
    if (newPriority !== undefined) setPriorityFilter(newPriority);
    if (newSearch !== undefined) setSearchTerm(newSearch);

    onFilterChange(status, priority, search);
  };

  const clearFilters = () => {
    setStatusFilter('todos');
    setPriorityFilter('todas');
    setSearchTerm('');
    onFilterChange('todos', 'todas', '');
  };

  return (
    <div className="dashboard-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
              Buscar tickets
            </label>
            <input
              id="search"
              type="text"
              placeholder="Buscar por título, descripción o asignado..."
              value={searchTerm}
              onChange={(e) => handleFilterUpdate(undefined, undefined, e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dashboard-blue focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Filtro por Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
              Estado
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => handleFilterUpdate(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dashboard-blue focus:border-transparent transition-colors duration-200 bg-white"
            >
              <option value="todos">Todos los estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="en-progreso">En Progreso</option>
              <option value="resuelto">Resuelto</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* Filtro por Prioridad */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
              Prioridad
            </label>
            <select
              id="priority"
              value={priorityFilter}
              onChange={(e) => handleFilterUpdate(undefined, e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-dashboard-blue focus:border-transparent transition-colors duration-200 bg-white"
            >
              <option value="todas">Todas las prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>

        {/* Botón de limpiar filtros */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
