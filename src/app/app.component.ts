import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedLanguage = 'es';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selectedLanguage);
  }

  public onChangeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    this.translateService.use(this.selectedLanguage);
  }
}
