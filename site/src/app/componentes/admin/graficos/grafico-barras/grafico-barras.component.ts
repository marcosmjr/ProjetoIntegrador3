import { Component,AfterViewInit, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RequisicoesService } from '../../../servico/dados/requisicoes.service';
import { RespostaAPI } from '../../../servico/dados/dados-cliente-recebe-bdinterface';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-barras',
  imports: [],
  templateUrl: './grafico-barras.component.html',
  styleUrl: './grafico-barras.component.css'
})
export class GraficoLinhasComponent implements OnInit {

  @ViewChild("estatistica1", { static: true }) elemento1!: ElementRef;
  chart1: any;

  @ViewChild("estatistica2", { static: true }) elemento2!: ElementRef;
  chart2: any;

   @ViewChild("estatistica3", { static: true }) elemento3!: ElementRef;
  chart3: any;

   @ViewChild("estatistica4", { static: true }) elemento4!: ElementRef;
  chart4: any;

  @ViewChild("estatistica5", { static: true }) elemento5!: ElementRef;
  chart5: any;

  mes: string = "";
  servico: string = "";
  private vendas: number = 0;
  private manutencao: number = 0;
  private instalacao: number = 0;
  private outros: number = 0;

  private pessoaFisica: number = 0;
  private pessoaJuridica: number = 0;

  private preferenciaJuridico: string = "";
  private telefoneJuridico: number = 0;
  private whatsAppJuridico: number = 0;
  private emailjuridico: number = 0;
 // private cidadeJuridica: any;
 // private bairroJuridica:Array<string> = [];

  private preferenciaFisico: string = "";
  private telefoneFisico: number = 0;
  private whatsAppFisico: number = 0;
  private emailFisico: number = 0;
//  private cidadeFisica: Array<string> = [];
//  private bairroFisica: Array<string> = [];

//  private cidadesPessoaJuridica: any;

servicoPedido = "";
tipoCliente = "";
meioCamunicacaoFisico = "";
meioCamunicacaoJuridico = "";
cidadesDestaque: any[] =[];

 cidades = [
            {cidade: "Americana", quantidade: 0 },
            {cidade: "Santa Barbara d'Oeste", quantidade: 0 },
            {cidade: "Nova Odessa", quantidade: 0 },
            {cidade: "Limeira", quantidade: 0 },
            {cidade: "Cosmópolis", quantidade: 0 },
            {cidade: "Paulínia", quantidade: 0 },
            {cidade: "outras cidades", quantidade: 0 }
          ];


private teste: any;

  constructor(private requisicoesService: RequisicoesService){}


  ngOnInit(): void {
    this.fazerRequisicao();
  }

  renderizarGrafico1() {
      this.chart1 = new Chart(this.elemento1.nativeElement, {
        type: 'bar', // Tipo: bar, line, pie, doughnut, etc.
        data: {
          labels: ['Vendas', 'instalação', 'Manutenção', 'Outros'],
          datasets: [{
            label: 'Seviços',
            data: [this.vendas, this.instalacao, this.manutencao, this.outros],
            backgroundColor: ['#42A5F5', '#FFA726', '#26A69A', '#EC407A'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
  }

   renderizarGrafico2() {
      this.chart2 = new Chart(this.elemento2.nativeElement, {
        type: 'bar', // Tipo: bar, line, pie, doughnut, etc.
        data: {
          labels: ['Pessoa física', 'Pessoa juridica'],
          datasets: [{
            label: 'Tipo de cliente',
            data: [this.pessoaFisica, this.pessoaJuridica],
            backgroundColor: ['#42A5F5', '#FFA726'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
  }

  renderizarGrafico3() {
      this.chart3 = new Chart(this.elemento3.nativeElement, {
        type: 'bar', // Tipo: bar, line, pie, doughnut, etc.
        data: {
          labels: ['Telefone', 'WhatsApp', 'E-mail'],
          datasets: [{
            label: 'Meio e comunicação preferido - Cliente jurídico',
            data: [this.telefoneJuridico, this.whatsAppJuridico, this.emailjuridico],
            backgroundColor: ['#42A5F5', '#FFA726', '#26A69A', '#EC407A'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
  }

   renderizarGrafico4() {
      this.chart4 = new Chart(this.elemento4.nativeElement, {
        type: 'bar', // Tipo: bar, line, pie, doughnut, etc.
        data: {
          labels: ['Telefone', 'WhatsApp', 'E-mail'],
          datasets: [{
            label: 'Meio e comunicação preferido - Cliente físico',
            data: [this.telefoneFisico, this.whatsAppFisico, this.emailFisico],
            backgroundColor: ['#42A5F5', '#FFA726', '#26A69A', '#EC407A'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
  }

   renderizarGrafico5() {
      this.chart5 = new Chart(this.elemento5.nativeElement, {
        type: 'bar', // Tipo: bar, line, pie, doughnut, etc.
        data: {
          labels: [this.cidades[0].cidade,
                   this.cidades[1].cidade,
                   this.cidades[2].cidade,
                   this.cidades[3].cidade,
                   this.cidades[4].cidade,
                   this.cidades[5].cidade,
                   this.cidades[6].cidade],
          datasets: [{
            label: 'Número de clientes / cidades',
            data: [this.cidades[0].quantidade,
                   this.cidades[1].quantidade,
                   this.cidades[2].quantidade,
                   this.cidades[3].quantidade,
                   this.cidades[4].quantidade,
                   this.cidades[5].quantidade,
                   this.cidades[6].quantidade],
            backgroundColor: ['#42A5F5', '#FFA726', '#aa3664', 'rgba(166, 238, 21, 0.2)', 'rgba(155, 98, 0, 0.27)', '#ab3226','#FDA'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
   }


  fazerRequisicao(){

    this.requisicoesService.recebeDados().subscribe({

      next: (dados) => {

        this.contadorServicos(dados);
        this.contadorTipoCliente(dados);
        this.contadorMeiosComunicacaoJuridica(dados);
        this.contadorMeiosComunicacaoFisica(dados);
        this.contadorCidadesJuridica(dados);
        this.renderizarGrafico1();
        this.renderizarGrafico2();
        this.renderizarGrafico3();
        this.renderizarGrafico4();
        this.renderizarGrafico5();
        this.destaque();
        this.cidadeComMaisClientes()


      },

      error: (erro) => {
        console.error('Erro ao obter dados', erro);
      }

    });

  }

  contadorServicos(dados: RespostaAPI){

     for(var i = 0; i < dados.data.length; i++){
        this.servico = dados.data[i]['servico_ocorrencias'] != null ? dados.data[i]['servico_ocorrencias'] : "";

        if(this.servico[0] == "i" || this.servico[1] == "i" || this.servico[2] == "i" || this.servico[4] == "i"){
          this.instalacao += 1;
        }
        if(this.servico[0] == "c" || this.servico[1] == "c" || this.servico[2] == "c" || this.servico[4] == "c"){
          this.vendas += 1;
        }
        if(this.servico[0] == "m" || this.servico[1] == "m" || this.servico[2] == "m" || this.servico[4] == "m"){
          this.manutencao += 1;
        }
        if(this.servico[0] == "o" || this.servico[1] == "o" || this.servico[2] == "o" || this.servico[4] == "o"){
          this.outros += 1;
        }
      }

  }

    contadorTipoCliente(dados: RespostaAPI){
      for(var i = 0; i < dados.data.length; i++){
        if(dados.data[i]['nome_empresa_cliente_juridico'] != null){
        this.pessoaJuridica += 1;
      }else{
        this.pessoaFisica += 1;
      }

    }
  }

contadorMeiosComunicacaoJuridica(dados: RespostaAPI){
   for(var i = 0; i < dados.data.length; i++){
        this.preferenciaJuridico = dados.data[i]['preferencia_cliente_juridico'] != null ? dados.data[i]['preferencia_cliente_juridico'] : "";

        if(this.preferenciaJuridico[0] == "t" || this.preferenciaJuridico[1] == "t" || this.preferenciaJuridico[2] == "t" ){
          this.telefoneJuridico += 1;
        }
        if(this.preferenciaJuridico[0] == "w" || this.preferenciaJuridico[1] == "w" || this.preferenciaJuridico[2] == "w"){
          this.whatsAppJuridico += 1;
        }
        if(this.preferenciaJuridico[0] == "e" || this.preferenciaJuridico[1] == "e" || this.preferenciaJuridico[2] == "e"){
          this.emailjuridico += 1;
        }
   }
}

contadorMeiosComunicacaoFisica(dados: RespostaAPI){
   for(var i = 0; i < dados.data.length; i++){

        this.preferenciaFisico = dados.data[i]['preferencia_cliente_fisico'] != null ? dados.data[i]['preferencia_cliente_fisico'] : "";

        if(this.preferenciaFisico[0] == "t" || this.preferenciaFisico[1] == "t" || this.preferenciaFisico[2] == "t" ){
          this.telefoneFisico += 1;
        }
        if(this.preferenciaFisico[0] == "w" || this.preferenciaFisico[1] == "w" || this.preferenciaFisico[2] == "w"){
          this.whatsAppFisico += 1;
        }
        if(this.preferenciaFisico[0] == "e" || this.preferenciaFisico[1] == "e" || this.preferenciaFisico[2] == "e"){
          this.emailFisico += 1;
        }
   }
}

cidadeComMaisClientes(){
if (this.cidades.length === 0) return;

    // 1. Encontra qual é o maior valor numérico no array
    const maxValor = Math.max(...this.cidades.map(c => c.quantidade));

    // 2. Filtra todas as cidades que possuem esse valor exato
    this.cidadesDestaque = this.cidades.filter(c => c.quantidade === maxValor);
}

destaque(){

  //Verifica qual serviço esta em destaque na amostra de clientes
  if(this.vendas > this.instalacao &&  this.vendas > this.manutencao && this.vendas > this.outros){
    this.servicoPedido = " é a compra"
  }else if(this.instalacao > this.vendas &&  this.instalacao > this.manutencao  && this.instalacao > this.outros){
    this.servicoPedido = "é a instalção";
  }else if(this.manutencao > this.vendas &&  this.manutencao > this.instalacao  && this.manutencao > this.outros){
    this.servicoPedido = "é a manutencao";
  }else if(this.outros > this.vendas &&  this.outros > this.instalacao  && this.outros > this.manutencao){
    this.servicoPedido = " são outrooutros";
  }else{
    this.servicoPedido = " é um empate de um ou mais serviços";
  }

  //Verifica que tipo de cliente esta em destaque na amostra de clientes
  if(this.pessoaFisica > this.pessoaJuridica){
    this.tipoCliente = " o tipo pessoa física se destaca.";
  }else if(this.pessoaJuridica > this.pessoaFisica) {
    this.tipoCliente = " o tipo pessoa jurídica se destaca.";
  }else{
    this.tipoCliente = " observamos um empate, ou seja quantidades iguais de cliente de ambos os tipo procuram a empresa.";
  }

  //Verifica qual meio de comunicação preferida está em destaque na amostra de clientes pessoa juridica
  if(this.telefoneJuridico > this.whatsAppJuridico && this.telefoneJuridico > this.emailjuridico){
    this.meioCamunicacaoJuridico = "é o telefone.";
  }else if(this.whatsAppJuridico > this.telefoneJuridico && this.whatsAppJuridico > this.emailjuridico){
    this.meioCamunicacaoJuridico = "é o WhatsApp.";
  }else if(this.emailjuridico > this.telefoneJuridico && this.emailjuridico > this.whatsAppJuridico){
    this.meioCamunicacaoJuridico = "é o e-mail.";
  }else{
    this.meioCamunicacaoJuridico = "está empatado entre dois ou mais meios de comunicação.";
  }

    //Verifica qual meio de comunicação preferida está em destaque na amostra de clientes pessoa física
  if(this.telefoneFisico > this.whatsAppFisico && this.telefoneFisico > this.emailFisico){
    this.meioCamunicacaoFisico = "é o telefone.";
  }else if(this.whatsAppFisico > this.telefoneFisico && this.whatsAppFisico > this.emailFisico){
    this.meioCamunicacaoFisico = "é o WhatsApp.";
  }else if(this.emailFisico > this.telefoneFisico && this.emailFisico > this.whatsAppFisico){
    this.meioCamunicacaoFisico = "é o e-mail.";
  }else{
    this.meioCamunicacaoFisico = "está empatado entre dois ou mais meios de comunicação.";
  }
}


contadorCidadesJuridica(dados: RespostaAPI): void{

 for(var i = 0; i < dados.data.length; i++){


    if((new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "americana"){
      this.cidades[0].quantidade += 1;
    }else if(
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "santa barbara" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "santa barbara do oeste" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLocaleLowerCase() == "santa barbara d'oeste" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "santa barbara d'Oeste"
    ){
      this.cidades[1].quantidade += 1;
    }else if((new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "nova odessa"){

      this.cidades[2].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "limeira"){

      this.cidades[3].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "cosmópolis" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "cosmopolis"){

      this.cidades[4].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "paulínia" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "paulinia" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "paulínea" ||
      (new String(dados.data[i].cidade_cliente_juridico)).toLowerCase() == "paulinea"){

      this.cidades[5].quantidade += 1;

    }else if(dados.data[i].cidade_cliente_juridico !== undefined){

      this.cidades[6].quantidade += 1;

    }


   if((new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "americana"){

      this.cidades[0].quantidade += 1;

    }else if(
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "santa barbara" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "santa barbara do oeste" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLocaleLowerCase() == "santa barbara d'oeste" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "santa barbara d'Oeste"
    ){

      this.cidades[1].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "nova odessa"){

      this.cidades[2].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "limeira"){

      this.cidades[3].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "cosmópolis" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "cosmopolis"){

      this.cidades[4].quantidade += 1;

    }else if((new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "paulínia" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "paulinia" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "paulínea" ||
      (new String(dados.data[i].cidade_cliente_fisico)).toLowerCase() == "paulinea"){

      this.cidades[5].quantidade += 1;

    }else if(dados.data[i].cidade_cliente_fisico !== undefined){

      this.cidades[6].quantidade += 1;

    }


 }

}

/*************************************************** */
@Output() enviaVoltar = new EventEmitter<string>();

btnVoltar():void{
    this.enviaVoltar.emit("voltarCadastro")
  }
/***************************************************** */

}
