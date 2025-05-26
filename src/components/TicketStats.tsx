
import React from 'react';
import { Ticket } from './Dashboard';

interface TicketStatsProps {
  tickets: Ticket[];
}

export const TicketStats: React.FC<TicketStatsProps> = ({ tickets }) => {
  const stats = {
    total: tickets.length,
    nuevo: tickets.filter(t => t.status === 'nuevo').length,
    enProgreso: tickets.filter(t => t.status === 'en-progreso').length,
    resuelto: tickets.filter(t => t.status === 'resuelto').length,
    cerrado: tickets.filter(t => t.status === 'cerrado').length,
    altaPrioridad: tickets.filter(t => t.priority === 'alta').length
  };

  const statCards = [
    {
      title: 'Total de Tickets',
      value: stats.total,
      color: 'bg-dashboard-blue',
      textColor: 'text-white',
      icon: '📊'
    },
    {
      title: 'Nuevos',
      value: stats.nuevo,
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
      icon: '🆕'
    },
    {
      title: 'En Progreso',
      value: stats.enProgreso,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      icon: '⏳'
    },
    {
      title: 'Resueltos',
      value: stats.resuelto,
      color: 'bg-green-100',
      textColor: 'text-green-800',
      icon: '✅'
    },
    {
      title: 'Cerrados',
      value: stats.cerrado,
      color: 'bg-gray-100',
      textColor: 'text-gray-800',
      icon: '🔒'
    },
    {
      title: 'Alta Prioridad',
      value: stats.altaPrioridad,
      color: 'bg-red-100',
      textColor: 'text-red-800',
      icon: '🚨'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((card, index) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 transition-all duration-200 hover:scale-105 animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${card.textColor} opacity-80`}>
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.textColor} mt-1`}>
                {card.value}
              </p>
            </div>
            <div className="text-2xl opacity-80">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
