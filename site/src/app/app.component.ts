import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { BannerCarrouselComponent } from './componentes/banner-carrousel/banner-carrousel.component';
import { PaginaServicosComponent } from './componentes/pagina-servicos/pagina-servicos.component';
import { PaginaContatoComponent } from './componentes/pagina-contato/pagina-contato.component';
import { PaginaProdutosComponent } from './componentes/pagina-produtos/pagina-produtos.component';
import { PaginaQuemSomosNosComponent } from './componentes/pagina-quem-somos-nos/pagina-quem-somos-nos.component';

import { PaginaOndeEstamosComponent } from './componentes/pagina-onde-estamos/pagina-onde-estamos.component';
import { AdminComponent } from './componentes/admin/admin.component';



@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
     MatButtonModule,
      MatMenuModule,
      BannerCarrouselComponent,
      PaginaServicosComponent,
      PaginaContatoComponent,
      PaginaProdutosComponent,
      PaginaQuemSomosNosComponent,
      PaginaOndeEstamosComponent,
      AdminComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  selecaoPagina: number = 0;

  pagina_servicos(){
    this.selecaoPagina = 0;
  };

  pagina_produtos(){
    this.selecaoPagina = 1;
  };

  pagina_quem_somos(){
    this.selecaoPagina = 2;
  };

 /* pagina_nossos_valores(){
    this.selecaoPagina = 3;
  };*/

  pagina_onde_estamos(){
    this.selecaoPagina = 4;
  }

  pagina_contato(){
    this.selecaoPagina = 5;
  };

  admin(){
    this.selecaoPagina = 6;
  };
}
