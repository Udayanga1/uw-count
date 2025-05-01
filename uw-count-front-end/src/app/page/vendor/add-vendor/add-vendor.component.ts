import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../../service/modal-enter-bill.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private modalService: ModalEnterBillService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isAddSupplierOpen
      .subscribe((isOpen: boolean) => {
        this.isAddSupplierOpen = isOpen;

        if (isOpen) {
          this.supplierName = this.modalService.supplierName;

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
    console.log('name: '    + this.supplierName);
    console.log('address: ' + this.supplierAddress);
    console.log('email: '   + this.supplierEmail);
    console.log('tel: '     + this.supplierTel);
    this.closeModal();
  }

  closeModal(): void {
    // wipe everything out on close
    this.supplierName    = '';
    this.supplierAddress = '';
    this.supplierEmail   = '';
    this.supplierTel     = '';
    this.isAddSupplierOpen = false;
  }
}