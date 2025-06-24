import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { SupplierService } from '../../../service/supplier.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-vendor',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})
export class AddVendorComponent implements OnInit {
  public supplierName    = '';
  public supplierEmail   = '';
  public supplierTel     = '';
  public supplierAddress = '';

  constructor(private readonly service: SupplierService , private readonly router: Router) {}

  ngOnInit(): void {
    this.supplierName = this.service.supplierName;
    this.supplierEmail   = '';
    this.supplierTel     = '';
    this.supplierAddress = '';
  }

  addSupplier(): void {
    const supplier: Supplier = {
      id: null,
      name: this.supplierName,
      address: this.supplierAddress,
      email: this.supplierEmail,
      contactNo: this.supplierTel,
      balancePayable: 0
    };

    this.service.addSupplier(supplier)
      .subscribe({
        next: created => {
          this.router.navigate(['/']);         
        },
        error: err => {
          console.error('Error creating bill', err);
          alert('Failed to save supplier');
        }
      });
  }

  checkEmailAvailability(): void {
    this.service.checkEmail(this.supplierEmail);
  }
  
  checkContactNoAvailability(): void {
    this.service.checkContactNo(this.supplierTel);
  }
}