import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Account } from '../../../models/account';
import { HttpClient } from '@angular/common/http';

type SortField = 'code' | 'name' | 'accountCode';
type SortDir   = 'asc' | 'desc';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy{

  isProductsOpen: boolean = true;
  private subscription!: Subscription;
  private accountListSubscription!: Subscription;

  showAddForm = false;
  newProduct: Product = {
    code: '',
    name: '',
    accountCode: 'Account',
  }

  filterText = '';
  sortField: SortField = 'code';
  sortDirection: SortDir   = 'asc';

  incomeAccountList: Account[] = [];

  constructor(private productService: ProductService, private coaService: ChartOfAccountsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.productService.isProductsOpen.subscribe(
      (isProductsOpen: boolean) => {
        this.isProductsOpen = isProductsOpen;
      }
    );

    this.incomeAccountList = [];
    this.accountListSubscription = this.coaService.getAccounts()
      .subscribe(list => {
        list.forEach(account => {
          if(account.type=="Revenue" || account.type=="Other Revenue") {
              this.incomeAccountList.push(account);
          }
        })
      });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeProducts() {
    this.isProductsOpen = false;
  }

  addProduct() {
    const data: any = {
      code: this.newProduct.code,
      name: this.newProduct.name,
      accountId: this.newProduct.accountCode,
      unitPrice: this.newProduct.unitPrice
    }

    console.log(data);
    this.http.post<any>('http://localhost:8080/product/add', data)
      .subscribe({
        next: created => {
          console.log(created);
          this.resetNew();
        },
        error: err => {
          console.log('Error creating product', err);
          alert('Failed to save product')
          
        }
      })
    
  }

  resetNew() {
    this.newProduct = {
      code: '',
      name: '',
      accountCode: 'Account',
      unitPrice: 0
    }
  }

}
