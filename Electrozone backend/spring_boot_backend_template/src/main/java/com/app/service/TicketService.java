package com.app.service;

import java.util.List;

import com.app.dto.TicketDTO;
import com.app.entities.Ticket;

public interface TicketService {
    Ticket createTicket(TicketDTO ticketDTO);
    List<Ticket> getAllTickets();
}
