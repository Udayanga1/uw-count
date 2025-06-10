import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../../service/customer.service';
import { Customer } from '../../../models/customer';
import { FormsModule } from '@angular/forms';

type SortField = 'name' | 'email' | 'contactNo' | 'address';
type SortDir   = 'asc' | 'desc';

@Component({
  selector: 'app-customer-list',
  imports: [FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit, OnDestroy{
  isCustomersOpen: boolean = true;
  private subscription!: Subscription;
  private customerListSubscription!: Subscription;

  showAddForm = false;
  newCustomer: Customer = {
    name: '',
    email: '',
    address: '',
    contactNo: ''
  }

  showEditCustomerForm = false;
  selectedCustomer: Customer = { ...this.newCustomer }

  private customerList: Customer[] = [];

  filterText = '';
  sortField: SortField = 'name';
  sortDirection: SortDir = 'asc';


  constructor(private readonly service: CustomerService){}

  ngOnInit(): void {
    this.subscription = this.service.isCustomersOpen.subscribe(
      (isCustomersOpen: boolean) => {
        this.isCustomersOpen = isCustomersOpen;
      }
    );

    this.customerListSubscription = this.service.getCustomers().subscribe(list => {
        this.customerList = list;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeCustomers() {
    this.isCustomersOpen = false;
    this.showAddForm = false;
    this.showEditCustomerForm = false;
  }

  addCustomer() {
    const data: Customer = {
      name: this.newCustomer.name,
      email: this.newCustomer.email,
      address: this.newCustomer.address,
      contactNo: this.newCustomer.contactNo,
      balanceReceivable: 0
    }

    this.service.addCustomer(data)
      .subscribe({
        next: created => {
          this.service.getCustomers()
          .subscribe(list => {
            this.customerList = list;
            this.resetNew();
          })
        },
        error: err => {
          console.log('Error creating the customer', err);
          alert('Failed to save customer')
        }
      });
    
  }

  get displayedCustomers(): Customer[] {
    const filtered = this.customerList.filter(a => {
      const txt = this.filterText.toLowerCase();
      return a.name.toLowerCase().includes(txt)
        || a.email?.toLowerCase().includes(txt)
        || a.contactNo?.toLowerCase().includes(txt)
        || a.address?.toLowerCase().includes(txt);
    });

    return filtered.sort((a, b) => {
      const aVal = ('' + a[this.sortField]).toLowerCase();
      const bVal = ('' + b[this.sortField]).toLowerCase();
      const cmp = aVal.localeCompare(bVal);
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  resetNew() {
    this.newCustomer = {
      name: '',
      email: '',
      address: '',
      contactNo: ''
    }
  }

  showEditCustomer(customer: Customer){
    this.showEditCustomerForm = true;
    this.selectedCustomer = { ...customer };
  }

  editCustomer() {
    console.log(this.selectedCustomer);
    this.service.updateCustomer(this.selectedCustomer)
      .subscribe({
        next: updated => {
          this.service.getCustomers()
          .subscribe(list => {
            this.customerList = list;
            this.closeEditForm();
          })
        },
        error: err => {
          console.log('Error updating the customer', err);
          alert('Failed to update customer')
        }
      });
    
  }

  closeEditForm() {
    this.showEditCustomerForm = false;
    this.selectedCustomer = {
      id: 0,
      name: '',
      email: '',
      address: '',
      contactNo: ''
    }
  }
}
