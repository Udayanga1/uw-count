package org.uwcount.service;

import org.uwcount.dto.Supplier;

import java.util.List;

public interface SupplierService {
    Supplier addSupplier(Supplier supplier);
    Supplier getSupplierById(Integer id);
    Supplier getSupplierByEmail(String email);
    Supplier getSupplierByContactNo(String contactNo);
    List<Supplier> getSuppliersByName(String name);
    List<Supplier> getAllSuppliers();
    Supplier updateSupplier(Supplier supplier);
    Boolean deleteSupplier(Integer id);
}
