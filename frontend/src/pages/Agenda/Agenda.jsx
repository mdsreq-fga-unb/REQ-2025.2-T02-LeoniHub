import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer, Navigate } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import endOfWeek from 'date-fns/endOfWeek';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Agenda.css'; 

import { listarPedidos } from '../../services/pedidoService'; 
import { getClienteById } from '../../services/clienteService';

const locales = { 'pt-BR': ptBR };

const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales,
});

const EventList = ({ events, startDate, endDate }) => {
  const navigate = useNavigate();

  const eventosVisiveis = events.filter(event => {
    const eventTime = startOfDay(new Date(event.start)).getTime();
    const startRange = startOfDay(new Date(startDate)).getTime();
    const endRange = endOfDay(new Date(endDate)).getTime();
    return eventTime >= startRange && eventTime <= endRange;
  });

  eventosVisiveis.sort((a, b) => a.start - b.start);

  if (eventosVisiveis.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px', margin: '10px 0' }}>
        <p>Nenhum evento para este período.</p>
      </div>
    );
  }

  return (
    <div className="custom-agenda-list" style={{ marginTop: '10px' }}>
      {eventosVisiveis.map((evt, idx) => (
        <div 
          key={idx} 
          onClick={() => navigate(`/pedidos/${evt.resource.id}`)}
          style={{
             borderLeft: evt.tipo === 'RETIRADA' ? '5px solid #27ae60' : '5px solid #e74c3c',
             backgroundColor: 'white',
             boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
             padding: '16px',
             marginBottom: '10px',
             borderRadius: '6px',
             cursor: 'pointer',
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             transition: 'transform 0.1s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div>
            <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', marginBottom: '4px' }}>
               {/* Removemos as setas do texto aqui para não duplicar com o badge */}
               {format(evt.start, 'dd ')} de {format(evt.start, 'MMMM', { locale: ptBR })} - {evt.title.replace('⬇️ ', '').replace('⬆️ ', '')}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
              {evt.resource.descricao || 'Sem descrição adicional'}
            </div>
          </div>
          <div style={{ 
              backgroundColor: evt.tipo === 'RETIRADA' ? '#dcfce7' : '#fee2e2', 
              color: evt.tipo === 'RETIRADA' ? '#166534' : '#991b1b', 
              padding: '6px 12px', 
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              border: `1px solid ${evt.tipo === 'RETIRADA' ? '#bbf7d0' : '#fecaca'}`
          }}>
            {evt.tipo === 'RETIRADA' ? '⬇️ RETIRADA' : '⬆️ DEVOLUÇÃO'}
          </div>
        </div>
      ))}
    </div>
  );
};

function WeekList({ date, events }) {
  const start = startOfWeek(date, { locale: ptBR });
  const end = endOfWeek(date, { locale: ptBR });
  return <EventList events={events} startDate={start} endDate={end} />;
}

WeekList.range = (date) => {
  const start = startOfWeek(date, { locale: ptBR });
  const end = endOfWeek(date, { locale: ptBR });
  return [start, end];
};

WeekList.navigate = (date, action) => {
  if (action === Navigate.PREVIOUS) return addDays(date, -7);
  if (action === Navigate.NEXT) return addDays(date, 7);
  return date;
};

WeekList.title = (date) => {
  const start = startOfWeek(date, { locale: ptBR });
  const end = endOfWeek(date, { locale: ptBR });
  return `${format(start, 'dd MMM', { locale: ptBR })} – ${format(end, 'dd MMM', { locale: ptBR })}`;
};

function DayList({ date, events }) {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return <EventList events={events} startDate={start} endDate={end} />;
}

DayList.range = (date) => [date]; 

DayList.navigate = (date, action) => {
  if (action === Navigate.PREVIOUS) return addDays(date, -1);
  if (action === Navigate.NEXT) return addDays(date, 1);
  return date;
};

DayList.title = (date) => format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

export default function CalendarioPedidos() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [date, setDate] = useState(new Date()); 
  const [view, setView] = useState('month');    

  const { views } = useMemo(() => ({
      views: {
        month: true,
        week: WeekList,
        day: DayList, 
        agenda: true    
      },
    }), []
  );

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listarPedidos();
        const pedidosArray = response.data || response; 

        if (!Array.isArray(pedidosArray)) return;
        
        const pedidosFiltrados = pedidosArray.filter(p => p.data_aluguel && p.data_devolucao);

        const promisesDeEventos = pedidosFiltrados.map(async (pedido) => {
            let nomeCliente = 'Cliente Desconhecido';
            try {
                const clienteRes = await getClienteById(pedido.cliente_id);
                const dadosCliente = clienteRes.data || clienteRes;
                nomeCliente = dadosCliente.nome || `Cliente ${pedido.cliente_id}`;
            } catch (err) {
                console.warn(`Erro cliente ${pedido.cliente_id}`, err);
            }

            const dataRetirada = new Date(pedido.data_aluguel);
            const dataDevolucao = new Date(pedido.data_devolucao);

            dataRetirada.setHours(0,0,0,0);
            dataDevolucao.setHours(0,0,0,0);

            return [
              {
                title: `⬇️ #${pedido.id} - ${nomeCliente}`, // Seta adicionada aqui para aparecer no Mês
                start: dataRetirada, 
                end: dataRetirada,
                resource: pedido,
                tipo: 'RETIRADA',
                allDay: true
              },
              {
                title: `⬆️ #${pedido.id} - ${nomeCliente}`, // Seta adicionada aqui para aparecer no Mês
                start: dataDevolucao,
                end: dataDevolucao,
                resource: pedido,
                tipo: 'DEVOLUCAO',
                allDay: true
              }
            ];
        });

        const arraysDeEventos = await Promise.all(promisesDeEventos);
        setEventos(arraysDeEventos.flat());

      } catch (error) {
        console.error("Erro calendário:", error);
      }
    };

    fetchPedidos();
  }, []);

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const onView = useCallback((newView) => setView(newView), [setView]);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#95a5a6'; 
    if (event.tipo === 'RETIRADA') backgroundColor = '#27ae60';
    else if (event.tipo === 'DEVOLUCAO') backgroundColor = '#e74c3c';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        display: 'block',
        fontSize: '0.80rem'
      }
    };
  };

  return (
    <div className="calendario-page">
      <div className="header-section">
        <h1>Calendário de Locações</h1>
        <div className="legenda">
          <div className="legenda-item">
            <span className="dot" style={{background: '#27ae60'}}></span> Dia de Retirada
          </div>
          <div className="legenda-item">
            <span className="dot" style={{background: '#e74c3c'}}></span> Dia de Devolução
          </div>
        </div>
      </div>
      
      <div className="calendario-container">
        <Calendar
          localizer={localizer}
          events={eventos}
          date={date}          
          view={view}          
          onNavigate={onNavigate} 
          onView={onView}         
          views={views}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 650 }}
          culture='pt-BR'
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Não há eventos neste período."
          }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => navigate(`/pedidos/${event.resource.id}`)}
          popup
        />
      </div>
    </div>
  );
}