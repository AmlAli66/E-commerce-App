import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { myTranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent {
  readonly _TranslateService = inject(TranslateService)
  private readonly _myTranslationService = inject(myTranslationService);

  selectLang(lang: string) {
    this._myTranslationService.changeLang(lang)
  }

}
