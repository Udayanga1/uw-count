import { Component } from '@angular/core';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private enterBillModalService: ModalEnterBillService, private payBillModalService: ModalPayBillService) {}

  openEnterBillModal(): void {
    this.enterBillModalService.isEnterBillsOpen.emit(true);    
  }

  openPayBillModal(): void {
    console.log("openPayBillModal()");
    this.payBillModalService.isPayBillsOpen.emit(true);
  }

}
