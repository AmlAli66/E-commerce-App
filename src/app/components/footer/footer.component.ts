import { Component } from '@angular/core';
import { MainBtnComponent } from "../../shared/main-btn/main-btn.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MainBtnComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
