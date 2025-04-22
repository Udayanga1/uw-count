import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalPayBillService } from '../../../service/modal-pay-bill.service';

@Component({
  selector: 'app-pay-bill',
  imports: [],
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.css'
})


export class PayBillComponent implements OnInit, OnDestroy{
  isPayBillsOpen: boolean = true;
  private subscription!: Subscription;
  payDate: string = '';

  total: number = 0;

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

  constructor(private modalService: ModalPayBillService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isPayBillsOpen.subscribe(
      (isPayBillsOpen: boolean) => {
        this.isPayBillsOpen = isPayBillsOpen;
      } 
    );

    const today = new Date();
    this.payDate = today.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.isPayBillsOpen = false;
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

  payAndNew() {
    this.payAndClose();
    setTimeout(()=>{
      this.isPayBillsOpen = true;
    }, 10);
  }

  payAndClose(){
    console.log("Paid");
    this.closeModal();
  }
}
