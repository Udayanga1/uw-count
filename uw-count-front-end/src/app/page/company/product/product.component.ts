import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Account } from '../../../models/account';
import { RouterLink } from '@angular/router';

type SortField = 'code' | 'name' | 'accountId';
type SortDir   = 'asc' | 'desc';

@Component({
  selector: 'app-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  private accountListSubscription!: Subscription;
  private productListSubscription!: Subscription;

  showAddForm = false;
  newProduct: Product = {
    code: '',
    name: '',
    accountId: 'Account',
    unitPrice: 0
  }

  filterText = '';
  sortField: SortField = 'code';
  sortDirection: SortDir   = 'asc';

  incomeAccountList: Account[] = [];

  productList: Product[] = [];

  constructor(private readonly productService: ProductService, private readonly coaService: ChartOfAccountsService) {}

  ngOnInit(): void {
    this.incomeAccountList = [];
    this.accountListSubscription = this.coaService.getAccounts()
      .subscribe(list => {
        list.forEach(account => {
          if(account.type=="Revenue" || account.type=="Other Revenue") {
              this.incomeAccountList.push(account);
          }
        })
      });

    this.productListSubscription = this.productService.getProducts().subscribe(list => {
      this.productList = list
    });
    
  }

  addProduct() {
    const data: Product = {
      code: this.newProduct.code,
      name: this.newProduct.name,
      accountId: this.newProduct.accountId,
      unitPrice: this.newProduct.unitPrice
    }

    this.productService.addProduct(data)
      .subscribe({
        next: created => {
          this.productService.getProducts()
            .subscribe(list => {
              this.productList = list;
              this.resetNew();
            })
        },
        error: err => {
          console.log('Error creating product', err);
          alert('Failed to save product')
          
        }
      })
    
  }

  get displayedProducts(): Product[] {
    const filtered = this.productList.filter(a => {
      const txt = this.filterText.toLowerCase();
      return a.code.toLowerCase().includes(txt) 
          || a.name.toLowerCase().includes(txt)
          || ('' + a.accountId).toLowerCase().includes(txt);
    });

    return filtered.sort((a, b) => {
      const aVal = ('' + a[this.sortField]).toLowerCase();
      const bVal = ('' + b[this.sortField]).toLowerCase();
      const cmp = aVal.localeCompare(bVal);
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  resetNew() {
    this.newProduct = {
      code: '',
      name: '',
      accountId: 'Account',
      unitPrice: 0
    }
  }

}
