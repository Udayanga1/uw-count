import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnterBillComponent } from "../../page/vendor/enter-bill/enter-bill.component";
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { PayBillComponent } from "../../page/vendor/pay-bill/pay-bill.component";

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent, PayBillComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})

export class ModalContainerComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  
  isEnterBillsOpen: boolean = false;
  isPayBillsOpen: boolean = false;
  
  private enterBillSubscription!: Subscription;
  private payBillSubscription!: Subscription;

  constructor(private modalEnterBillService: ModalEnterBillService, private modalPayBillService: ModalPayBillService) {}

  ngOnInit(): void {
    // Subscribe to modal state changes
    this.enterBillSubscription = this.modalEnterBillService.isEnterBillsOpen.subscribe(
      (jisOpen: boolean) => {
        this.isEnterBillsOpen = true;
      }
    );
    this.payBillSubscription = this.modalPayBillService.isPayBillsOpen.subscribe(
      (isOpen: boolean) => {
        this.isPayBillsOpen = true;
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.enterBillSubscription.unsubscribe();
    this.payBillSubscription.unsubscribe();
  }

}
