import { Component } from '@angular/core';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MainBtnComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
