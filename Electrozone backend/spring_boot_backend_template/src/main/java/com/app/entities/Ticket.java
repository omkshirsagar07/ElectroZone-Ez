package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ticket extends BaseEntity{

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Ticket category should not be null")
    private TicketCategory ticketCategory;
    
    @NotBlank(message = "Query subject should not be blank")
    private String subject;
    
    @NotBlank(message = "Query description should not be blank")
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
