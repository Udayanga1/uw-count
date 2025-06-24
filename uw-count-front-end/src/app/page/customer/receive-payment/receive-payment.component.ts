import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../../service/invoice.service';

@Component({
  selector: 'app-receive-payment',
  imports: [RouterLink],
  templateUrl: './receive-payment.component.html',
  styleUrl: './receive-payment.component.css'
})
export class ReceivePaymentComponent implements OnInit{
  payDate: string = '';
  
  private receivedAmount: number = 0;

  invoiceList: {no: string, value: number}[] = [
    {no: "inv1",
    value: 1250
    },
    {no: "inv2",
    value: 1350
    },
    {no: "inv3",
    value: 1200
    },
  ];

  total: number = this.invoiceList.length>0 ? this.invoiceList[0].value : 0;

  constructor(private readonly service: InvoiceService, private readonly router: Router) {}

  ngOnInit(): void {   
    const today = new Date();
    this.payDate = today.toISOString().split('T')[0];
  }

  fillPayingAmount(event: any): void {

    let changeAmountPaying: boolean = true;

    const currentRow = event.target.closest('tr');
        
    const invoiceAmount = currentRow.querySelector('.invoice-value');
    const discount = currentRow.querySelector('.discount');
    const amountToPay = currentRow.querySelector('.amount-to-pay');
    const amountPaying = currentRow.querySelector('.amount-paying');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');

    if(amountPaying.value > 0 && amountToPay.value!=amountPaying.value){
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
    console.log("fillPayingAmount(): " + currentRow.querySelector('.form-check-input').checked);
    
  }

  calculateAmountPaying(amountDue: number, discount: number): number {
    return  (amountDue - discount);
  }

  calculateTotal(event: any): void{
    const currentRow = event.target.closest('tr');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');
    const table = currentRow.parentElement.parentElement;
    const totalInput = table.parentElement.querySelector('.total-pay-bill');

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

}
