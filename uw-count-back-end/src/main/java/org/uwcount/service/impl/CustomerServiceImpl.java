package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.Customer;
import org.uwcount.entity.CustomerEntity;
import org.uwcount.repository.CustomerRepository;
import org.uwcount.service.CustomerService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository repository;
    private final ModelMapper mapper;

    @Override
    public Customer addCustomer(Customer customer) {

        // set null if empty strings passed to the properties
        if (customer.getEmail().isEmpty()) {
            customer.setEmail(null);
        }
        if (customer.getContactNo().isEmpty()) {
            customer.setContactNo(null);
        }
        if (customer.getAddress().isEmpty()) {
            customer.setAddress(null);
        }

        CustomerEntity saved = repository.save(mapper.map(customer, CustomerEntity.class));
        return mapper.map(saved, Customer.class);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll().stream()
                .map(customerEntity -> mapper.map(customerEntity, Customer.class))
                .collect(Collectors.toList());
    }

    @Override
    public Customer updateCustomer(Customer customer) {

        if (customer.getId() == null) return null;
        if (!repository.existsById(customer.getId())) return null;

        CustomerEntity updated = repository.save(mapper.map(customer, CustomerEntity.class));
        return mapper.map(updated, Customer.class);
    }
}
