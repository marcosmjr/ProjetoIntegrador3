import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-pagina-servicos',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './pagina-servicos.component.html',
  styleUrl: './pagina-servicos.component.css'
})
export class PaginaServicosComponent {

}
