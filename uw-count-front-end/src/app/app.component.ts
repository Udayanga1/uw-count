import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./common/nav-bar/nav-bar.component";
import { ModalContainerComponent } from "./common/modal-container/modal-container.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, ModalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uw-count-front-end';
}
