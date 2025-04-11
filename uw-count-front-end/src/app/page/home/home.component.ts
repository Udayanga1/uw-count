import { Component } from '@angular/core';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private enterBillModalService: ModalEnterBillService) {}

  openEnterBillModal(): void {
    this.enterBillModalService.isModalOpen.emit(true);    
  }

}
