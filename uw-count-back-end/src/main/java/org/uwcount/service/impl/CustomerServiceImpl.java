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
        CustomerEntity saved = repository.save(mapper.map(customer, CustomerEntity.class));
        return mapper.map(saved, Customer.class);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll().stream()
                .map(customerEntity -> mapper.map(customerEntity, Customer.class))
                .collect(Collectors.toList());
    }
}
