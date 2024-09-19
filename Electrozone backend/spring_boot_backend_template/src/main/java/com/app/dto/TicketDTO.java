package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.app.entities.TicketCategory;

public class TicketDTO {

    @NotNull(message = "Ticket category should not be null")
    private TicketCategory ticketCategory;

    @NotBlank(message = "Query subject should not be blank")
    private String subject;

    @NotBlank(message = "Query description should not be blank")
    private String description;

    @NotNull(message = "User ID should not be null")
    private Long userId;

    // Getters and setters
    public TicketCategory getTicketCategory() {
        return ticketCategory;
    }

    public void setTicketCategory(TicketCategory ticketCategory) {
        this.ticketCategory = ticketCategory;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
