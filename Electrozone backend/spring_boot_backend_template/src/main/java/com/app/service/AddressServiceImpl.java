package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressDao;
import com.app.dao.UserDao;
import com.app.dto.AddressDTO;
import com.app.entities.Address;
import com.app.entities.User;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void assignUserAddress(Long userId, AddressDTO address) {
        User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
        Address addressEntity = mapper.map(address, Address.class);
        addressEntity.setUser(user);
        addressDao.save(addressEntity);
    }

    @Override
    public List<AddressDTO> getAddressByUser(@NotNull Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
        List<Address> addresses = addressDao.findByUser(user);
        List<AddressDTO> addressDtoList = new ArrayList<>();
        for (Address address : addresses) {
            addressDtoList.add(mapper.map(address, AddressDTO.class));
        }
        return addressDtoList;
    }

    public void deleteAddressById(Long addressId) {
        Address address = addressDao.findById(addressId).orElseThrow(() -> new ResourceNotFoundException("Invalid Address ID!"));
        addressDao.delete(address);
    }
}
