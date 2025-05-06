import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../../service/modal-enter-bill.service';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from '../../../service/supplier.service';

@Component({
  selector: 'app-add-vendor',
  imports: [FormsModule],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})
export class AddVendorComponent implements OnInit, OnDestroy {
  public isAddSupplierOpen = false;

  public supplierName    = '';
  public supplierEmail   = '';
  public supplierTel     = '';
  public supplierAddress = '';

  private subscription!: Subscription;

  constructor(private supplierService: SupplierService , private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.supplierService.isAddSupplierOpen
      .subscribe((isOpen: boolean) => {
        this.isAddSupplierOpen = isOpen;

        if (isOpen) {
          this.supplierName = this.supplierService.supplierName;

          this.supplierEmail   = '';
          this.supplierTel     = '';
          this.supplierAddress = '';
        }
      });
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.httpClient.post<Supplier>('http://localhost:8080/supplier/add', supplier)
      .subscribe({
        next: created => {
          this.closeModal();
        },
        error: err => {
          console.error('Error creating bill', err);
          alert('Failed to save supplier');
        }
      });
  }

  closeModal(): void {
    this.supplierName    = '';
    this.supplierAddress = '';
    this.supplierEmail   = '';
    this.supplierTel     = '';
    this.isAddSupplierOpen = false;
    this.supplierService.supplierName = '';

    this.supplierService.loadSuppliers().subscribe(suppliers => {
      this.supplierService.supplierList = suppliers;
    })
  }

  checkEmailAvailability(): void {
    this.httpClient.get<Supplier>(`http://localhost:8080/supplier/search/email/${this.supplierEmail}`, {observe: 'response'}).subscribe(res => {
      alert("this email is registered with " + res.body?.name);
    })
  }
  
  checkContactNoAvailability(): void {
    this.httpClient.get<Supplier>(`http://localhost:8080/supplier/search/contact/${this.supplierTel}`, {observe: 'response'}).subscribe(res => {
      alert("this contact no. is registered with " + res.body?.name);
    })
  }
}