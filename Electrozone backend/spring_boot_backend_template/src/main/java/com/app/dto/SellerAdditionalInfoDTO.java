package com.app.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerAdditionalInfoDTO {

   
    @NotBlank(message = "GST number should not be blank")
    @Length(min = 15, message = "GST number should be at least 15 characters")
    private String gstNo;

    @NotBlank(message = "Bank account number should not be blank")
    private String bankAccountNo;

    @NotBlank(message = "IFSC number should not be blank")
    private String ifscNumber;

    @NotBlank(message = "Branch should not be blank")
    private String branch;

    @NotBlank(message = "Address should not be blank")
    private String address;
}