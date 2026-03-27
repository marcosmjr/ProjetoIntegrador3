import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DadosIntefaceAdmin } from './dadosIntefaceAdmin';
import { DadosClienteInterface } from './dadosClienteInterface';
import { RespostaAPI } from './dados-cliente-recebe-bdinterface';

@Injectable({
  providedIn: 'root'
})
export class RequisicoesService {

  constructor(private http: HttpClient){}

  /**
   * Requisição de dados do administrador
   */
  private urlAdmin = "http://localhost/PHP/projetoIntegrador/apiPHP/admin/login";

    login(dadosAdmin: DadosIntefaceAdmin[]): Observable<DadosIntefaceAdmin[]>{
      return this.http.post<DadosIntefaceAdmin[]>(this.urlAdmin, dadosAdmin[0]);
  }

  /**
   * Envia dados para serem salvos pela api
   */
    apiPostUrl = 'http://localhost/PHP/projetoIntegrador/apiPHP/cliente/cadastro/contato';

    enviaDados(dadosCliente: DadosClienteInterface[] ): Observable<DadosClienteInterface[]>{
      return this.http.post<DadosClienteInterface[]>(this.apiPostUrl, dadosCliente[0]);
    }

    /**
     * Recebe dados do banco de dados
     */

    apiGetUrl = 'http://localhost/PHP/projetoIntegrador/apiPHP/cliente/buscatodos';

    recebeDados(): Observable<RespostaAPI>{
      return this.http.get<RespostaAPI>(this.apiGetUrl);

    }

    /**
     * Apaga um cadastro
     */

    apiDelete = 'http://localhost/PHP/projetoIntegrador/apiPHP/cliente/remove'

    apagarCadastro(id: number){

      return this.http.delete(`${this.apiDelete}/${id}`);

    }




}
