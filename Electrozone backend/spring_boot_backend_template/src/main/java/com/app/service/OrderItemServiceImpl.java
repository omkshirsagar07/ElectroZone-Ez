package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.*;
import com.app.dto.ApiResponse;
import com.app.entities.*;

@Service
@Transactional
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemDao orderItemdao;

    @Autowired
    private OrdersDao ordersDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    ModelMapper modelMapper;
    
    @Autowired
	private SellerDao sellerDao;

    @Autowired
	private EmailService emailService;

    public List<OrderItem> getOrderItemByOrder(Long orderId) {
        Orders order = ordersDao.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid Order ID!!!"));
        return orderItemdao.findByOrder(order);
    }

    public List<OrderItem> getAllOrderItemsOfUser(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!"));

        List<OrderItem> allOrderItem = new ArrayList<>();
        List<Orders> order = ordersDao.findByUser(user);
        for (Orders eachOrder : order) {
            List<OrderItem> orderItem = getOrderItemByOrder(eachOrder.getId());
            allOrderItem.addAll(orderItem);
        }
        return allOrderItem;
    }

    public ApiResponse placeOrder(Long userId, Long addressId) {
        User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Address address = addressDao.findById(addressId).orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        List<Cart> cartItemList = cartDao.findByUser(user);

        Double totalCartAmount = 0.0;
        for (Cart cartItem : cartItemList) {
            totalCartAmount += (cartItem.getProduct().getMrp() - cartItem.getProduct().getDiscount())*cartItem.getQuantity();
        }

        Orders newOrder = new Orders();
        newOrder.setBillingAmount(totalCartAmount);
        newOrder.setUser(user);
        newOrder.setAddress(address);
        LocalDate deliveryDate = LocalDate.now().plusDays(6);
        newOrder.setDelivaryDate(deliveryDate);
        newOrder.setOrderStatus(OrderStatus.PENDING);
        ordersDao.save(newOrder);

        for (Cart cartItem : cartItemList) {
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.setOrder(newOrder);
            newOrderItem.setQuantity(cartItem.getQuantity());
            newOrderItem.setSeller(cartItem.getProduct().getSeller());
            newOrderItem.setProduct(cartItem.getProduct());
            orderItemdao.save(newOrderItem);

            Product updateProductQuantity = cartItem.getProduct();
            updateProductQuantity.setQuantity(updateProductQuantity.getQuantity() - cartItem.getQuantity());
            productDao.save(updateProductQuantity);

            cartDao.delete(cartItem);
        }

        Payment newPayment = new Payment();
        newPayment.setOrder(newOrder);
        newPayment.setPaymentMethod(PaymentMethod.ONLINE_PAYMENT);
        newPayment.setStatus(PaymentStatus.COMPLETED);
        paymentDao.save(newPayment);

     
     // Send confirmation email after order is placed
        String toEmail = newOrder.getUser().getEmail();
        String subject = "Order Confirmation";
        String body = "Dear " + newOrder.getUser().getName() + ",\n\nYour order has been placed successfully. Order ID: " + newOrder.getId() + "\n\nThank you for shopping with us!";
        
        emailService.sendOrderConfirmationEmail(toEmail, subject, body);
        
        return new ApiResponse("Order placed successfully!");
    }

	@Override
	public List<OrderItem> getAllOrderItem() {
		return orderItemdao.findAll();
	}

	@Override
	public List<OrderItem> getOrderItemBySeller(Long sellerId) {
	    // Fetch the seller by ID, throw an exception if not found
	    Seller seller = sellerDao.findById(sellerId)
	        .orElseThrow(() -> new ResourceNotFoundException("Invalid Seller ID!!!"));

	    // Fetch the order items associated with this seller
	    return orderItemdao.findBySeller(seller);
	}

}
