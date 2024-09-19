package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandDTO extends BaseDTO{

    @NotBlank(message = "Brand Name should not be blank")
    private String name;

    private boolean isActive=true;

    private MultipartFile image;
}