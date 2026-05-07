
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { RequisicoesService } from '../servico/dados/requisicoes.service';
import { DadosIntefaceAdmin } from '../servico/dados/dadosIntefaceAdmin';
import { GraficoLinhasComponent } from './graficos/grafico-barras/grafico-barras.component';

@Component({
  selector: 'app-admin',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    OcorrenciasComponent,
    GraficoLinhasComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  usuario: string = 'Administrador';
  senha: string = '';
  permissao: boolean = false;
  paginasInternas: number = 0; // escolhe as paginas dentro de admin a ser exibidas

   resposta = {
    error: false,
    success: false,
    message: ""
  };

  dadosInterfaceLogin: DadosIntefaceAdmin[] = [];

  constructor(private requisicoes: RequisicoesService){}

recebePermissao(event: string){

  if (event == "sair"){
    this.permissao = false;
  }else if (event == "entrar"){
    this.permissao = true;
  }else if (event == "graficoLinhas"){
    this.paginasInternas = 1;
  }else if (event = "voltarCadastro"){
    this.paginasInternas = 0;
  }
}

recebePedidoGraficoLinha(event: boolean){
  alert(`event ${event}`)
  console.log("event", event);
  if(event == true){
    this.paginasInternas = 1;
  }else{
    this.paginasInternas = 0;
  }
}


// Keyboard INTERACTION - Verifica se alguma tecla foi precionada.
// Se precionada a tecla enter, chama a função btnEntrar()
x = document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  // Observe: key - 'Enter', code - 'Enter', keyCode - 13
  if (keyName === 'Enter') {
   this.btnEntrar();
  }
}, false);



  btnEntrar(){

    /* Login _______________________________________________________________*/

    this.dadosInterfaceLogin = [{usuario: this.usuario, senha: this.senha}]

    // Requisição http para buscar a autorização da api
    this.requisicoes.login(this.dadosInterfaceLogin).subscribe({

      next: (res) => {

        const obj = res as {[key: string]: any}; // Cast explicito

        this.resposta['error'] = obj['error'];
        this.resposta['success'] = obj['success'];
        this.resposta['message'] = obj['message'];

        this.senha = '';
        this.recebePermissao("entrar");


      },

      error:(err) => {
        console.error('Erro ao enviar', err);
      }

    });

    /*____________________________________________________________________*/


  }

}
