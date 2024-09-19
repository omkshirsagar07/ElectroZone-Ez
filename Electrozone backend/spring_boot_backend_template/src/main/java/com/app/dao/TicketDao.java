package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long>{

	
}
