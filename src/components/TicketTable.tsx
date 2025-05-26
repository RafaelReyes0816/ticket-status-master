
import React from 'react';
import { Ticket } from './Dashboard';
import { StatusDropdown } from './StatusDropdown';

interface TicketTableProps {
  tickets: Ticket[];
  onStatusChange: (ticketId: string, newStatus: Ticket['status']) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({ tickets, onStatusChange }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityBadge = (priority: Ticket['priority']) => {
    const classes = {
      alta: 'priority-alta',
      media: 'priority-media',
      baja: 'priority-baja'
    };

    const labels = {
      alta: 'Alta',
      media: 'Media',
      baja: 'Baja'
    };

    return (
      <span className={`status-badge ${classes[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">📋</div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No se encontraron tickets</h3>
        <p className="text-slate-500">No hay tickets que coincidan con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Tickets ({tickets.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">ID</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Título</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Estado</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Prioridad</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Asignado</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Creado</th>
              <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr 
                key={ticket.id} 
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="py-4 px-4">
                  <span className="text-sm font-mono text-slate-600">#{ticket.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{ticket.title}</div>
                    <div className="text-slate-500 text-xs mt-1 max-w-xs truncate">
                      {ticket.description}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusDropdown
                    currentStatus={ticket.status}
                    onStatusChange={(newStatus) => onStatusChange(ticket.id, newStatus)}
                  />
                </td>
                <td className="py-4 px-4">
                  {getPriorityBadge(ticket.priority)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-dashboard-blue rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {ticket.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-slate-900">{ticket.assignee}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-slate-600">{formatDate(ticket.created_at)}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-slate-600">{formatDate(ticket.updated_at)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
