package com.app.dto;

import com.app.entities.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaceOrderDTO {
    private Long userId;
    private Long addressId;
    private PaymentMethod paymentMethod;
}