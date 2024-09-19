package com.app.service;

import com.app.dao.TicketDao;
import com.app.dao.UserDao;
import com.app.dto.TicketDTO;
import com.app.entities.Ticket;
import com.app.entities.User;
import com.app.custom_exceptions.ResourceNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketDao ticketDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Ticket createTicket(TicketDTO ticketDTO) {
        User user = userDao.findById(ticketDTO.getUserId())
                           .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Ticket ticket = modelMapper.map(ticketDTO, Ticket.class);
        ticket.setUser(user);
        return ticketDao.save(ticket);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketDao.findAll();
    }
}
