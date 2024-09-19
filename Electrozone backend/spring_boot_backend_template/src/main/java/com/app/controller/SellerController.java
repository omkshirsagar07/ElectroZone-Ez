package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.LoginDTO;
import com.app.dto.SellerAdditionalInfoDTO;
import com.app.dto.SellerDTO;
import com.app.dto.SellerLoginDTO;
import com.app.service.SellerService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/sellers")
@CrossOrigin
public class SellerController {

    @Autowired
    private SellerService sellerService; 

    @GetMapping("/{id}")
    public ResponseEntity<SellerDTO> findSellerById(@PathVariable String id) {
        SellerDTO sellerDto = sellerService.findSellerById(Long.valueOf(id));
        return ResponseEntity.ok(sellerDto);
    }

    @GetMapping("/allsellers")
    public ResponseEntity<?> findAllSellers() {
        List<SellerDTO> sellers = sellerService.findAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @PostMapping("/register")
    public ResponseEntity<SellerDTO> addSeller(@Valid @RequestBody SellerDTO sellerDto) {
        SellerDTO createdSeller = sellerService.addSeller(sellerDto);
        return ResponseEntity.status(201).body(createdSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable String id) {
        sellerService.deleteSeller(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SellerDTO> updateSeller(@PathVariable String id, @Valid @RequestBody SellerDTO sellerDto) {
        SellerDTO updatedSeller = sellerService.updateSeller(Long.valueOf(id), sellerDto);
        return ResponseEntity.ok(updatedSeller);
    }

    @PatchMapping("/additional-fields/{id}")
    public ResponseEntity<?> updateAdditionalFields(@PathVariable String id, @Valid @RequestBody SellerAdditionalInfoDTO sellerDto) {
        SellerAdditionalInfoDTO updatedSeller = sellerService.updateAdditionalFields(Long.valueOf(id), sellerDto);
        return ResponseEntity.ok(updatedSeller);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> findByEmailAndPassword(@RequestBody LoginDTO loginDTO) {
        try {
        	
        	
        	ResponseEntity<?> sellerLogin = sellerService.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.ok(sellerLogin);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Invalid email or password");
        }
    }
}
