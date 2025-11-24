import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Agenda.css'; 

// Ajuste o caminho conforme sua estrutura real
import { listarPedidos } from '../../services/pedidoService'; 
import { getClienteById } from '../../services/clienteService';


const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarioPedidos() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listarPedidos();
        const pedidosArray = response.data || response; 

        if (!Array.isArray(pedidosArray)) {
          console.error("Formato de dados inválido recebido:", pedidosArray);
          return;
        }
        
        const pedidosFiltrados = pedidosArray.filter(p => p.data_aluguel && p.data_devolucao);

        const promisesDeEventos = pedidosFiltrados.map(async (pedido) => {
            let nomeCliente = 'Cliente Desconhecido';
            
            try {
                const clienteRes = await getClienteById(pedido.cliente_id);
                const dadosCliente = clienteRes.data || clienteRes;
                nomeCliente = dadosCliente.nome || `Cliente ${pedido.cliente_id}`;
            } catch (err) {
                console.warn(`Erro ao buscar cliente ${pedido.cliente_id}`, err);
            }

            return {
                title: `#${pedido.id} - ${nomeCliente}`,
                start: new Date(pedido.data_aluguel), 
                end: new Date(pedido.data_devolucao),
                resource: pedido,
                status: pedido.status
            };
        });

        const eventosResolvidos = await Promise.all(promisesDeEventos);

        setEventos(eventosResolvidos);

      } catch (error) {
        console.error("Erro ao carregar pedidos para o calendário:", error);
      }
    };

    fetchPedidos();
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#95a5a6'; 

    const status = event.status ? event.status.toUpperCase() : '';

    switch (status) {
      case 'ATRASADO':
        backgroundColor = '#e74c3c'; 
        break;
      case 'EM_ANDAMENTO':
      case 'ATIVO':
      case 'RETIRADO':
        backgroundColor = '#27ae60'; 
        break;
      case 'AGUARDANDO':
      case 'AGENDADO':
      case 'AGUARDANDO_ASSINATURA':
        backgroundColor = '#1abc9c'; 
        break;
      case 'FINALIZADO':
      case 'DEVOLVIDO':
        backgroundColor = '#7f8c8d'; 
        break;
      default : backgroundColor = '#95a5a6'; 
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '0.85rem'
      }
    };
  };

  return (
    <div className="calendario-page">
      <div className="header-section">
        <h1>Calendário de Locações</h1>
        
        {/* Legenda visual */}
        <div className="legenda">
          <div className="legenda-item">
            <span className="dot agendado"></span> Agendado
          </div>
          <div className="legenda-item">
            <span className="dot ativo"></span> Em uso
          </div>
          <div className="legenda-item">
            <span className="dot atrasado"></span> Atrasado
          </div>
        </div>
      </div>
      
      <div className="calendario-container">
        <Calendar
          localizer={localizer}
          events={eventos}
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