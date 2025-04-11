import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnterBillComponent } from "../../page/vendor/enter-bill/enter-bill.component";
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})

export class ModalContainerComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  private subscription!: Subscription;

  constructor(private modalService: ModalEnterBillService) {}

  isModalOpen: boolean = false;

  ngOnInit(): void {
    // Subscribe to modal state changes
    this.subscription = this.modalService.isModalOpen.subscribe(
      (name: boolean) => {
        this.isModalOpen = true;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }

  // closeModal(): void {
  //   this.isModalOpen = false;
    
  // }
}
