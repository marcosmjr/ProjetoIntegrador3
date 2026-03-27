
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { MatButtonModule } from '@angular/material/button';

import { Validacao } from './validação';
import { NgxMaskDirective } from 'ngx-mask';
import { TermosPrivacidadeComponent } from './privacidade/termos-privacidade/termos-privacidade.component';


//import { RequisicaoService } from './requisicao.service';
import { RequisicoesService } from '../servico/dados/requisicoes.service';
import { DadosClienteInterface } from '../servico/dados/dadosClienteInterface';

interface UF {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pagina-contato',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    TextareaModule,
    MatButtonModule,
    MatCheckbox,
    NgxMaskDirective,
  ],
  templateUrl: './pagina-contato.component.html',
  styleUrl: './pagina-contato.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginaContatoComponent {

  valida: Validacao = new Validacao;
  temosPrivacidade: TermosPrivacidadeComponent = new TermosPrivacidadeComponent;

  nome_empresa_estado: boolean = true;

  private termosPrivacidade: boolean = false;

  dadosClienteInterface: DadosClienteInterface[] = [];

  servico: string = "";
  preferencia: string = "";

  resposta = {
    error: false,
    success: false,
    message: ""
  };

  mesmoWhasApp: boolean = false;
  pj: boolean = false;
  termosPriv: boolean = false;

  nome: string = '';
  sobrenome: string = '';
  telefone: string = '';
  whatsApp: string = '';
  email: string = '';
  rua: string = '';
  numero: string = '';
  bairro: string = '';
  cidade: string = '';
  uf: string = '';
  instalacao: boolean = false;
  manutencao: boolean = false;
  compra: boolean = false;
  outros: boolean = false;
  preferenciaTelefone: boolean = false;
  preferenciaWhatsApp: boolean = false;
  preferenciaEmail: boolean = false;
  nomeEmpresa: string = '';
  mensagem: string = '';

  contato = {
    nome: '',
    sobrenome: '',
    telefone: '',
    whatsApp: '',
    email: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    instalacao: false,
    manutencao: false,
    compra: false,
    outros: false,
    preferenciaTelefone: false,
    preferenciaWhatsApp: false,
    preferenciaEmail: false,
    nomeEmpresa: '',
    mensagem: '',
    termosPriv: false
  };

  constructor(private requisicoesService:RequisicoesService){}



  /**
   * Lista de valores para o seletor de estado.
   */
  estados: UF[] = [
    {value: 'SP', viewValue: 'SP'},
    {value: 'AC', viewValue: 'AC'},
    {value: 'AL', viewValue: 'AL'},
    {value: 'AP', viewValue: 'AP'},
    {value: 'AM', viewValue: 'AM'},
    {value: 'BA', viewValue: 'BA'},
    {value: 'CE', viewValue: 'CE'},
    {value: 'DF', viewValue: 'DF'},
    {value: 'ES', viewValue: 'ES'},
    {value: 'GO', viewValue: 'GO'},
    {value: 'MA', viewValue: 'MA'},
    {value: 'MT', viewValue: 'MT'},
    {value: 'MS', viewValue: 'MS'},
    {value: 'MG', viewValue: 'MG'},
    {value: 'PA', viewValue: 'PA'},
    {value: 'PB', viewValue: 'PB'},
    {value: 'PR', viewValue: 'PR'},
    {value: 'PE', viewValue: 'PE'},
    {value: 'PI', viewValue: 'PI'},
    {value: 'RJ', viewValue: 'RJ'},
    {value: 'RN', viewValue: 'RN'},
    {value: 'RS', viewValue: 'RS'},
    {value: 'RO', viewValue: 'RO'},
    {value: 'RR', viewValue: 'RR'},
    {value: 'SC', viewValue: 'SC'},
    {value: 'SE', viewValue: 'SE'},
    {value: 'TO', viewValue: 'TO'},
  ];

  /*
  * Se o checkBox "Usar o mesmo número para WhatsApp?" for verdadeiro,
  * copia o número do telefone da classe contato para o campo whatsApp
  * da classe contados que é substituído automaticamente no formulário
  */
   ckbUsarMesmoNumero(evento: boolean) {
    if(evento == true){
      this.whatsApp = this.telefone;
    }else {
      this.whatsApp = '';
    }
   }


  /**
   * Se checkBox dos "termos privacidade" é marcado
   * a variável termosPrivacidade se torna verdadeira (true)
   */
  ckbTermosPrivacidade(evento: boolean){
    this.termosPrivacidade = evento;

  }
   /**
    * Se o checkBox "É pessoa jurídica?" é marcado,
    * habilita o campo Nome da Empresa e limpa o campo
    */
   ckbPessoaJuridica(evento: boolean){
     if(evento == true){
       this.nome_empresa_estado = false;
       this.nomeEmpresa = '';

     } else {
       this.nome_empresa_estado = true;
       this.nomeEmpresa = 'N/A';

     }
   }

   converterEscolhasCheckBox(){
    if(this.instalacao && !this.manutencao && !this.compra && !this.outros){
      this.servico = "i";
    }else if(!this.instalacao && this.manutencao && !this.compra && !this.outros){
      this.servico = "m";
    }else if(!this.instalacao && !this.manutencao && this.compra && !this.outros){
      this.servico = "c";
    }else if(!this.instalacao && !this.manutencao && !this.compra && this.outros){
      this.servico = "o";
    }else if(this.instalacao && this.manutencao && !this.compra && !this.outros){
      this.servico = "im";
    }else if(this.instalacao && !this.manutencao && this.compra && !this.outros){
      this.servico = "ic";
    }else if(this.instalacao && !this.manutencao && !this.compra && this.outros){
      this.servico = "io";
    }else if(!this.instalacao && this.manutencao && this.compra && !this.outros){
      this.servico = "mc";
    }else if(!this.instalacao && this.manutencao && !this.compra && this.outros){
      this.servico = "mo";
    }else if(!this.instalacao && !this.manutencao && this.compra && this.outros){
      this.servico = "co";
    }else if(this.instalacao && this.manutencao && this.compra && !this.outros){
      this.servico = "imc";
    }else if(this.instalacao && this.manutencao && !this.compra && this.outros){
      this.servico = "imo";
    }else if(!this.instalacao && this.manutencao && this.compra && this.outros){
      this.servico = "mco";
    }else if(this.instalacao && !this.manutencao && this.compra && this.outros){
      this.servico = "ico";
    }else if(this.instalacao && this.manutencao && this.compra && this.outros){
      this.servico = "imco";
    } else {
      this.servico = "";
    }

    if(this.preferenciaEmail && !this.preferenciaTelefone && !this.preferenciaWhatsApp){
      this.preferencia = "e";
    } else if(!this.preferenciaEmail && this.preferenciaTelefone && !this.preferenciaWhatsApp){
      this.preferencia = "t";
    } else if(!this.preferenciaEmail && !this.preferenciaTelefone && this.preferenciaWhatsApp){
      this.preferencia = "w";
    } else if(this.preferenciaEmail && this.preferenciaTelefone && !this.preferenciaWhatsApp){
      this.preferencia = "et";
    } else if(!this.preferenciaEmail && this.preferenciaTelefone && this.preferenciaWhatsApp){
      this.preferencia = "tw";
    } else if(this.preferenciaEmail && !this.preferenciaTelefone && this.preferenciaWhatsApp){
      this.preferencia = "ew";
    } else if(this.preferenciaEmail && this.preferenciaTelefone && this.preferenciaWhatsApp){
      this.preferencia = "etw";
    } else {
      this.preferencia = "";
    }

   }

   limpaVariaveis(){
    this.nome = '';
    this.sobrenome = '';
    this.telefone = '';
    this.whatsApp = '';
    this.email = '';
    this.rua = '';
    this.numero = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.instalacao = false;
    this.manutencao = false;
    this.compra = false;
    this.outros = false;
    this.preferenciaTelefone = false;
    this.preferenciaWhatsApp = false;
    this.preferenciaEmail = false;
    this.nomeEmpresa = '';
    this.mensagem = '';
    this.mesmoWhasApp = false;
    this.pj = false;
    this.termosPriv = false;
   }



/**
 * Executa as validações e envia o formulário
 */
  onSubmit(){

    /**
     * Verifica se os termos de privacidade foram aceitos
     */
      if (this.termosPrivacidade == false){
        alert("Para enviar a mensagem é necessário ler e concordar com os termos de privacidade")
        return;
       }


    /**
     * Verifica se algum assunto foi escolhido
     */
    if (!this.instalacao && !this.manutencao && !this.compra && !this.outros){
        alert("Escolha um assunto");
        return;
    }


    /**
     * Verifica se os campo nome e sobrenome estão vazios, neste caso
     * emite um alerta e para a execução do envio do formulário
     */
    if(this.nome == '' || this.sobrenome == ''){
      alert("O campo nome e sobrenome não devem estar vazio")
      return;
    }

    /**
     * Chama a validação do email se ele não estiver vazio
     */
    if(!(this.valida.validaEmail(this.email)) && this.email != ''){
      alert('Digite um e-mail valido');
      return;
    }

    /**
     * Chama a validação do número de telefone
     */
    if(!(this.valida.validaTelefone(this.telefone)) || this.telefone == ''){
      alert('Verifique se número do telefone está correto');
    }

    /**
     * Chama a validação do número de WhatsApp se ele não estiver vazio
     */
     if(!(this.valida.validaTelefone(this.whatsApp)) && this.whatsApp != ''){
        alert('Verifique se número do WhatsApp está correto');
        return;
      }

    this.converterEscolhasCheckBox(); //Converte as escolhas de serviço e canais de comunicação com cliente para string

  //Preenche a interface com os dados do cliente para enviar para a API
    this.dadosClienteInterface = [{
      nome_cliente: this.nome,
      sobrenome_cliente: this.sobrenome,
      telefone_cliente: this.telefone,
      whatsapp_cliente: this.whatsApp,
      e_mail_cliente: this.email,
      rua_cliente: this.rua,
      numero_cliente: this.numero,
      bairro_cliente: this.bairro,
      cidade_cliente: this.cidade,
      estado_cliente: this.uf,
      servico_ocorrencias: this.servico,
      preferencia_cliente: this.preferencia,
      nome_empresa_cliente: this.nomeEmpresa,
      mensagem_ocorrencias: this.mensagem,
      dataOcorrencia: "",
      dataAtendimento: "",
      atendida_ocorrencias: ""
    }];

    /**
     * Envia os dados para o serviço de requisições que envia para a API salvar
     * os dados do cliente no banco de dados
     */

     this.requisicoesService.enviaDados(this.dadosClienteInterface).subscribe(
      {
        next: (res) => {

        const obj = res as {[key: string]: any}; // Cast explicito

        this.resposta['error'] = obj['error'];
        this.resposta['success'] = obj['success'];
        this.resposta['message'] = obj['message'];

      },

      error:(err) => {
        console.error('Erro ao enviar', err);
      }
     });

     this.limpaVariaveis(); // Limpas as variáveis depois de enviar

  }

     termosPrivacidade_()
     {
       this.temosPrivacidade.termosPrivacidade();
     }


}