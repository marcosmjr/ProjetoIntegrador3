export interface RespostaAPI {
  error: boolean;
  success: boolean;
  message: string;
  data: Ocorrencias[];
}

export interface Ocorrencias{

  id_ocorrencias: number;
	servico_ocorrencias: string;
	data_ocorrencias: string;
	atendida_ocorrencias: string;
	data_atendimento: string;
	mensagem_ocorrencias: string;


  id_cliente_fisico: number;
	nome_cliente_fisico: string;
	sobrenome_cliente_fisico: string;
  rua_cliente_fisico: string;
	bairro_cliente_fisico: string;
	numero_cliente_fisico: string;
  cidade_cliente_fisico: string;
	estado_cliente_fisico: string;
	telefone_cliente_fisico: string;
	whatsapp_cliente_fisico: string;
	e_mail_cliente_fisico: string;
	preferencia_cliente_fisico: string;


  id_cliente_juridico: number;
	nome_cliente_juridico: string;
	sobrenome_cliente_juridico: string;
	rua_cliente_juridico: string;
	bairro_cliente_juridico: string;
	numero_cliente_juridico: string;
	cidade_cliente_juridico: string;
	estado_cliente_juridico: string;
	telefone_cliente_juridico: string;
	whatsapp_cliente_juridico: string;
	e_mail_cliente_juridico: string;
	preferencia_cliente_juridico: string;
	nome_empresa_cliente_juridico: string;


	fk_ocorrencia: number;
}
