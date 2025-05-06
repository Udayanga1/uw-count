package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.Supplier;
import org.uwcount.entity.SupplierEntity;
import org.uwcount.repository.SupplierRepository;
import org.uwcount.service.SupplierService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    final SupplierRepository repository;
    final ModelMapper mapper;

    @Override
    public Supplier addSupplier(Supplier supplier) {

        SupplierEntity supplierEntity = repository.save(mapper.map(supplier, SupplierEntity.class));
        return mapper.map(supplierEntity, Supplier.class);
    }

    @Override
    public Supplier getSupplierById(Integer id) {
        return null;
    }

    @Override
    public Supplier getSupplierByEmail(String email) {
        SupplierEntity supplierEntity = repository.findByEmail(email);
        return mapper.map(supplierEntity, Supplier.class);
    }

    @Override
    public Supplier getSupplierByContactNo(String contactNo) {
        SupplierEntity supplierEntity = repository.findByContactNo(contactNo);
        return mapper.map(supplierEntity, Supplier.class);
    }

    @Override
    public List<Supplier> getSuppliersByName(String name) {
        return List.of();
    }

    @Override
    public List<Supplier> getAllSuppliers() {
        return List.of();
    }

    @Override
    public Supplier updateSupplier(Supplier supplier) {
        return null;
    }

    @Override
    public Boolean deleteSupplier(Integer id) {
        return null;
    }
}
