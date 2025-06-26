import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../../service/invoice.service';
import { CustomerService } from '../../../service/customer.service';
import { Invoice } from '../../../models/invoice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receive-payment',
  imports: [RouterLink, FormsModule],
  templateUrl: './receive-payment.component.html',
  styleUrl: './receive-payment.component.css'
})
export class ReceivePaymentComponent implements OnInit{
  payDate: string = '';
  
  private receivedAmount: number = 0;
  public customerList: string[] = [];
  public customer: string = '';

  invoiceList: Invoice[] = [];
  invoiceListSelectedCustomer: {no: string, value: number}[] = [];

  total: number = this.invoiceListSelectedCustomer.length>0 ? this.invoiceListSelectedCustomer[0].value : 0;

  constructor(private readonly service: InvoiceService, private readonly router: Router, private readonly customerService: CustomerService) {}

  ngOnInit(): void {   
    const today = new Date();
    this.payDate = today.toISOString().split('T')[0];
    
    this.service.getInvoices().subscribe(list => {
      this.invoiceList = list;
    });

    this.customerService.getCustomers().subscribe(list => {
      list.forEach(customer => {
        this.customerList.push(`${customer.id} : ${customer.name}`);
      })
    });

  }

  fillPayingAmount(event: any): void {

    let changeAmountPaying: boolean = true;

    const currentRow = event.target.closest('tr');
        
    const invoiceAmount = currentRow.querySelector('.invoice-value');
    const discount = currentRow.querySelector('.discount');
    const amountToPay = currentRow.querySelector('.amount-to-pay');
    const amountPaying = currentRow.querySelector('.amount-paying');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');

    if(+amountPaying.value > 0 && +amountToPay.value!=+amountPaying.value){
        changeAmountPaying = false;
    } 

    const amountToPayValue: number = this.calculateAmountPaying(invoiceAmount.value, discount.value);

    amountToPay.value = amountToPayValue;
    
    if(currentRow.querySelector('.form-check-input').checked) {
      if (changeAmountPaying) {
        amountPaying.value = amountToPayValue;
      }
    } else {
      amountPaying.value = 0;
    }

    this.total = 0;
    payingAmountRows.forEach((row: any) => {
      const value = row.value.length>0 ? parseFloat(row.value) : 0;
      this.total+=value;
    })

    // adjust amount receive if changing discount reduce net receivable than amount
    if(+amountPaying.value > +amountToPay.value){
      this.calculateTotal(event);
    }
  }

  calculateAmountPaying(amountDue: number, discount: number): number {
    return  (amountDue - discount);
  }

  calculateTotal(event: any): void{
    const currentRow = event.target.closest('tr');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');
    const table = currentRow.parentElement.parentElement;
    const totalInput = table.parentElement.querySelector('.total-pay-bill');

    const amountReceiving: number = currentRow.querySelector('.amount-paying').value;
    const amountToReceive: number = currentRow.querySelector('.amount-to-pay').value;
    const invoiceNo: number = currentRow.querySelector('.invoice-no').value;

    if(amountReceiving < 0) {
      alert(`${invoiceNo}: amount receive can not be negative`);
      currentRow.querySelector('.amount-paying').value = 0;
    }

    if(amountReceiving > amountToReceive) {
      alert(`${invoiceNo}: amount receive should equal or lesser than net receivable`);
      currentRow.querySelector('.amount-paying').value = amountToReceive;
    }

    if(amountReceiving > 0) {
      currentRow.querySelector('.form-check-input').checked = true;
    } else {
      currentRow.querySelector('.form-check-input').checked = false;
    }

    this.total = 0;
    payingAmountRows.forEach((row: any) => {
      const value = row.value.length>0 ? parseFloat(row.value) : 0;
      this.total+=value;
    })

    totalInput.value = this.total;
  }

  receiveAndNew() {
    this.receiveAndClose();
    setTimeout(()=>{
      this.router.navigate(['customers/receive-payment']);
    }, 10);
  }

  receiveAndClose(){
    if(this.receivedAmount==this.total){
      console.log("Received");
      this.router.navigate(['/']);
    } else {
      alert("Received amount should equal to the total");
    }
  }

  setReceivedAmount(event: any){
    this.receivedAmount = event.target.value;
    console.log(this.receivedAmount);
  }

  showCustomerInvoices() {
    const customerId: number = +this.customer.split(' ')[0];
    this.invoiceListSelectedCustomer = [];
    this.invoiceList.forEach(invoice => {
      if(customerId == invoice.customerId) {
        this.invoiceListSelectedCustomer.push({no: `${invoice.id} : ${invoice.invoiceNo}`, value: invoice.total})
      }
    })
    
  }

}
