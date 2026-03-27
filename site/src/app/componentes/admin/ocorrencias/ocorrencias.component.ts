import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RequisicoesService } from '../../servico/dados/requisicoes.service';
import { RespostaAPI } from '../../servico/dados/dados-cliente-recebe-bdinterface';
import { ItensTabela } from './itens-tabela';


@Component({
  selector: 'app-ocorrencias',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.css'
})

export class OcorrenciasComponent  implements OnInit{

  arrayItensTabela: ItensTabela[] = []


  constructor(private requisicoesService: RequisicoesService){}


  ngOnInit(): void {
    this.fazerRequisicao();
  }

  fazerRequisicao(){

    this.requisicoesService.recebeDados().subscribe({

      next: (dados) => {

        this.arrayTabela(dados);

      },

      error: (erro) => {
        console.error('Erro ao obter dados', erro);
      }

    });

  }

  @Output() enviaEstadoPermissão = new EventEmitter<boolean>();

  enviaPermissao(): void{
    this.enviaEstadoPermissão.emit(false);
  }

  btnVoltar() {
  this.enviaPermissao();
  }


  arrayTabela(dados: RespostaAPI){
      for(var i = 0; i < dados.data.length; i++){

        const itensTabela = new ItensTabela;


        let entradaServico: string = dados.data[i]['servico_ocorrencias'] != null ? dados.data[i]['servico_ocorrencias'] : "";
        let servico: string = "";

        let element1: string = entradaServico[0]?? "";
        let element2: string = entradaServico[1]?? "";
        let element3: string = entradaServico[2]?? "";
        let element4: string = entradaServico[3]?? "";

        if (element1 == "i"){
          element1 = "Instalação";
        } else if(element1 == "m"){
          element1 = "Manutenção";
        } else if (element1 == "c"){
          element1 = "Compra";
        } else if (element1 == "o"){
          element1 = "Outros";
        }

        if (element2 == "i"){
          element2 = "Instalação";
        } else if (element2 == "m"){
          element2 = "Manutenção";
        } else if ( element2 == "c"){
          element2 = "Compra";
        } else if (element2 == "o"){
          element2 = "Outros";
        }

        if (element3 == "i"){
          element3 = "Instalação";
        } else if (element3 == "m"){
          element3 = "Manutenção";
        } else if ( element3 == "c"){
          element3 = "Compra";
        } else if (element3 == "o"){
          element3 = "Outros";
        }

        if (element4 == "i"){
          element4 = "Instalação";
        } else if (element4 == "m"){
          element4 = "Manutenção";
        } else if (element4 == "c"){
          element4 = "Compra";
        } else if (element4 == "o"){
          element4 = "Outros";
        }

        if (element1 != ""){
          servico = element1;
        }
        if (element2 != ""){
          servico = servico + ", " + element2;
        }
        if (element3 != ""){
          servico = servico + ", " + element3;
        }
        if (element4 != ""){
          servico = servico + ", " + element4;
        }

        itensTabela['id_ocorrencias'] = dados.data[i]['id_ocorrencias'];
        itensTabela['servico_ocorrencias'] = servico;
        itensTabela['mensagem_ocorrencias'] = dados.data[i]['mensagem_ocorrencias'];
        itensTabela['dataOcorrencia'] = dados.data[i]['data_ocorrencias'];
        itensTabela['dataAtendimento'] = dados.data[i]['data_atendimento'];

        if(dados.data[i]['nome_cliente_fisico'] != undefined ){
          itensTabela['nome_cliente'] = dados.data[i]['nome_cliente_fisico'];
          itensTabela['sobrenome_cliente'] = dados.data[i]['sobrenome_cliente_fisico'];
          itensTabela['telefone_cliente'] = dados.data[i]['telefone_cliente_fisico'];
          itensTabela['whatsapp_cliente'] = dados.data[i]['whatsapp_cliente_fisico'];
          itensTabela['e_mail_cliente'] = dados.data[i]['e_mail_cliente_fisico'];
          itensTabela['rua_cliente'] = dados.data[i]['rua_cliente_fisico'];
          itensTabela['numero_cliente'] = dados.data[i]['numero_cliente_fisico'];
          itensTabela['bairro_cliente'] = dados.data[i]['bairro_cliente_fisico'];
          itensTabela['cidade_cliente'] = dados.data[i]['cidade_cliente_fisico'];
          itensTabela['estado_cliente'] = dados.data[i]['estado_cliente_fisico'];
          itensTabela['preferencia_cliente'] = dados.data[i]['preferencia_cliente_fisico'];
          itensTabela['nome_empresa_cliente'] = dados.data[i]['nome_empresa_cliente_juridico'];
        }

        if(dados.data[i]['nome_cliente_juridico'] != undefined ){
          itensTabela['nome_cliente'] = dados.data[i]['nome_cliente_juridico'];
          itensTabela['sobrenome_cliente'] = dados.data[i]['sobrenome_cliente_juridico'];
          itensTabela['telefone_cliente'] = dados.data[i]['telefone_cliente_juridico'];
          itensTabela['whatsapp_cliente'] = dados.data[i]['whatsapp_cliente_juridico'];
          itensTabela['e_mail_cliente'] = dados.data[i]['e_mail_cliente_juridico'];
          itensTabela['rua_cliente'] = dados.data[i]['rua_cliente_juridico'];
          itensTabela['numero_cliente'] = dados.data[i]['numero_cliente_juridico'];
          itensTabela['bairro_cliente'] = dados.data[i]['bairro_cliente_juridico'];
          itensTabela['cidade_cliente'] = dados.data[i]['cidade_cliente_juridico'];
          itensTabela['estado_cliente'] = dados.data[i]['estado_cliente_juridico'];
          itensTabela['preferencia_cliente'] = dados.data[i]['preferencia_cliente_juridico'];
          itensTabela['nome_empresa_cliente'] = dados.data[i]['nome_empresa_cliente_juridico'];
        }

        let entradaPreferencia: string = "";
        let preferencia: string = "";

        entradaPreferencia = itensTabela['preferencia_cliente'] != null ? itensTabela['preferencia_cliente'] : "" ;

        let elemento1: string = entradaPreferencia[0]?? "";
        let elemento2: string = entradaPreferencia[1]?? "";
        let elemento3: string = entradaPreferencia[2]?? "";

        if(elemento1 == "t"){
          elemento1 = "Telefone";
        }else if (elemento1 == "w"){
          elemento1 = "WhatsApp";
        } else if (elemento1 == "e"){
          elemento1 = "E-Mail"
        }

        if(elemento2 == "t"){
          elemento2 = "Telefone";
        }else if (elemento2 == "w"){
          elemento2 = "WhatsApp";
        } else if (elemento2 == "e"){
          elemento2 = "E-Mail";
        }

        if(elemento3 == "t"){
          elemento3 = "Telefone";
        }else if (elemento3 == "w"){
          elemento3 = "WhatsApp";
        } else if (elemento3 == "e"){
          elemento3 = "E-Mail";
        }

       if (elemento1 != ""){
        preferencia = elemento1;
       }
       if (elemento2 != ""){
        preferencia = preferencia + ", " + elemento2;
       }
       if (elemento3 != ""){
        preferencia = preferencia + ", " + elemento3;
       }

        itensTabela['preferencia_cliente'] = preferencia;

        this.arrayItensTabela[i] = itensTabela;

     }

      this.arrayItensTabela.sort((a, b) => b.id_ocorrencias - a.id_ocorrencias  );
  }

  ordenaCrescente(){
    this.arrayItensTabela.sort((a, b) => a.id_ocorrencias - b.id_ocorrencias  );
    this.dataSource.data = this.arrayItensTabela;
  }

  ordenaDecrescente(){
    this.arrayItensTabela.sort((a, b) => b.id_ocorrencias - a.id_ocorrencias  );
    this.dataSource.data = this.arrayItensTabela;
  }


  displayedColumns: string[] = ['linha', 'dadosCliente', 'lixeira'];
  dataSource = new MatTableDataSource<ItensTabela>(this.arrayItensTabela);

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  apagarCadastro(id: number){

      if (confirm('Quer realmente apagar o cadastro?')){

        this.requisicoesService.apagarCadastro(id).subscribe({
          next: ()=>{
            let novoArray = this.arrayItensTabela.filter(iten => iten.id_ocorrencias != id)
            this.arrayItensTabela = novoArray;
            this.ordenaDecrescente();
          },

          error: (err) => {
          console.error(err);
          alert('Erro ao apagar cadastro');
        }

        });

      }









  }
}
