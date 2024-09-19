package com.app.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.app.dto.AddressDTO;


public interface AddressService {
	
	void assignUserAddress(Long userId, @Valid AddressDTO address);

	List<AddressDTO> getAddressByUser(@NotNull Long userID);


}
