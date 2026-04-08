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

   mes: string = "mês";
  servico: string = "";
  private vendas: number = 0;
  private manutencao: number = 0;
  private instalacao: number = 0;
  private outros: number = 0;

  private pessoaFisica: number = 0;
  private pessoaJuridica: number = 0;

  private preferencia: string = "";
  private telefone: number = 0;
  private whatsApp: number = 0;
  private email: number = 0;


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
            label: 'Pessoa física / Pessoa jurídica',
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
            label: 'Meio e comunicação preferido',
            data: [this.telefone, this.whatsApp, this.email],
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
          labels: ['Pessoa física', 'Pessoa juridica'],
          datasets: [{
            label: 'Seviços 2026',
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



  fazerRequisicao(){

    this.requisicoesService.recebeDados().subscribe({

      next: (dados) => {

        this.contadorServicos(dados);
        this.contadorTipoCliente(dados);
        this.contadorMeiosComunicacao(dados);
        this.renderizarGrafico1();
        this.renderizarGrafico2();
        this.renderizarGrafico3();
        this.renderizarGrafico4();
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

contadorMeiosComunicacao(dados: RespostaAPI){
   for(var i = 0; i < dados.data.length; i++){
        this.preferencia = dados.data[i]['preferencia_cliente_juridico'] != null ? dados.data[i]['preferencia_cliente_juridico'] : "";

        if(this.preferencia[0] == "t" || this.preferencia[1] == "t" || this.preferencia[2] == "t" ){
          this.telefone += 1;
        }
        if(this.preferencia[0] == "w" || this.preferencia[1] == "w" || this.preferencia[2] == "w"){
          this.whatsApp += 1;
        }
        if(this.preferencia[0] == "e" || this.preferencia[1] == "e" || this.preferencia[2] == "e"){
          this.email += 1;
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
