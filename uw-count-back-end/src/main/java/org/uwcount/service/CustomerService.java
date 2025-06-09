package org.uwcount.service;

import org.uwcount.dto.Customer;

import java.util.List;

public interface CustomerService {
    Customer addCustomer(Customer customer);

    List<Customer> getAllCustomers();
}
