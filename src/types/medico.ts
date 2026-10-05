export type StatusMedico = 'Disponível' | 'Ocupado' | 'Inativo';
export type PerfilUsuario = 'Admin' | 'Recepcao' | 'Medico' | 'Paciente';

export interface Medico {
  id: string;
  nome: string;
  rm: string;
  especialidade: string;
  status: StatusMedico;
  created_at?: string;
  updated_at?: string;
}

export interface Usuario {
  id: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface CriarMedicoDTO {
  nome: string;
  rm: string;
  especialidade: string;
  status?: StatusMedico;
}

export interface FiltrosMedico {
  nome?: string;
  especialidade?: string;
  status?: StatusMedico;
  rm?: string;
}