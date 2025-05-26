
import React, { useState } from 'react';
import { TicketStats } from './TicketStats';
import { TicketTable } from './TicketTable';
import { TicketFilters } from './TicketFilters';
import { Check, Plus } from 'lucide-react';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'nuevo' | 'en-progreso' | 'resuelto' | 'cerrado';
  priority: 'alta' | 'media' | 'baja';
  assignee: string;
  created_at: string;
  updated_at: string;
}

// Datos de ejemplo (estos vendrían de tu Supabase)
const initialTickets: Ticket[] = [
  {
    id: '1',
    title: 'Error en el sistema de pagos',
    description: 'Los usuarios no pueden procesar pagos con tarjeta de crédito',
    status: 'nuevo',
    priority: 'alta',
    assignee: 'Juan Pérez',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Actualizar documentación de API',
    description: 'La documentación de la API necesita ser actualizada con los nuevos endpoints',
    status: 'en-progreso',
    priority: 'media',
    assignee: 'María García',
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-15T14:20:00Z'
  },
  {
    id: '3',
    title: 'Mejorar rendimiento de búsqueda',
    description: 'La función de búsqueda es lenta cuando hay muchos resultados',
    status: 'resuelto',
    priority: 'media',
    assignee: 'Carlos Rodríguez',
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-15T11:30:00Z'
  },
  {
    id: '4',
    title: 'Problema con notificaciones',
    description: 'Las notificaciones push no se están enviando correctamente',
    status: 'cerrado',
    priority: 'baja',
    assignee: 'Ana López',
    created_at: '2024-01-10T08:20:00Z',
    updated_at: '2024-01-13T15:45:00Z'
  },
  {
    id: '5',
    title: 'Integración con servicio externo',
    description: 'Necesitamos integrar con el nuevo servicio de análisis',
    status: 'nuevo',
    priority: 'alta',
    assignee: 'David Martín',
    created_at: '2024-01-15T13:10:00Z',
    updated_at: '2024-01-15T13:10:00Z'
  }
];

export const Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(initialTickets);

  const handleStatusChange = (ticketId: string, newStatus: Ticket['status']) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus, updated_at: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets);
    
    // Aplicar filtros actuales a los tickets actualizados
    setFilteredTickets(updatedTickets);
    
    console.log(`Ticket ${ticketId} estado cambiado a ${newStatus}`);
  };

  const handleFilterChange = (
    statusFilter: string,
    priorityFilter: string,
    searchTerm: string
  ) => {
    let filtered = tickets;

    // Filtrar por estado
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Filtrar por prioridad
    if (priorityFilter !== 'todas') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dashboard-blue rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Dashboard de Tickets
                </h1>
              </div>
            </div>
            <button className="bg-dashboard-blue text-white px-4 py-2 rounded-lg hover:bg-dashboard-blue-dark transition-colors duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <TicketStats tickets={tickets} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TicketFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Tickets Table */}
        <div className="dashboard-card">
          <TicketTable 
            tickets={filteredTickets} 
            onStatusChange={handleStatusChange} 
          />
        </div>
      </div>
    </div>
  );
};
