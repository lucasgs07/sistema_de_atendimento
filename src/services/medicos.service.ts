import { supabase } from '../config/supabase';
import { Medico, CriarMedicoDTO, StatusMedico, FiltrosMedico } from '../types/medico';

const STATUS_PERMITIDOS: StatusMedico[] = ['Disponível', 'Ocupado', 'Inativo'];

export class MedicosService {
  /**
   * 1.2 & 2.1 Cadastrar médico garantindo unicidade do RM
   */
  async criarMedico(data: CriarMedicoDTO): Promise<Medico> {
    if (!data.rm || data.rm.trim() === '') {
      throw new Error('O RM é obrigatório.');
    }

    const statusInicial = data.status || 'Disponível';
    if (!STATUS_PERMITIDOS.includes(statusInicial)) {
      throw new Error(`Status inválido. Status permitidos: ${STATUS_PERMITIDOS.join(', ')}`);
    }

    // Verifica existência prévia de RM para tratamento preventivo
    const { data: existente } = await supabase
      .from('medicos')
      .select('id')
      .eq('rm', data.rm)
      .maybeSingle();

    if (existente) {
      throw new Error(`O RM "${data.rm}" já está cadastrado no sistema.`);
    }

    const { data: novoMedico, error } = await supabase
      .from('medicos')
      .insert([
        {
          nome: data.nome,
          rm: data.rm,
          especialidade: data.especialidade,
          status: statusInicial,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error(`O RM "${data.rm}" já está cadastrado no sistema.`);
      }
      throw new Error(`Erro ao cadastrar médico: ${error.message}`);
    }

    return novoMedico;
  }

  /**
   * 1.2 & 2.2 Alterar status do médico
   */
  async alterarStatus(id: string, novoStatus: StatusMedico): Promise<Medico> {
    if (!STATUS_PERMITIDOS.includes(novoStatus)) {
      throw new Error(`Status inválido: "${novoStatus}". Os valores aceitos são: ${STATUS_PERMITIDOS.join(', ')}`);
    }

    const { data: medicoAtualizado, error } = await supabase
      .from('medicos')
      .update({ status: novoStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error || !medicoAtualizado) {
      throw new Error(`Médico não encontrado ou erro ao atualizar status: ${error?.message}`);
    }

    return medicoAtualizado;
  }

  /**
   * 1.2 & 2.3 Listar e filtrar médicos
   */
  async listarMedicos(filtros: FiltrosMedico = {}): Promise<Medico[]> {
    let query = supabase.from('medicos').select('*');

    if (filtros.nome) {
      query = query.ilike('nome', `%${filtros.nome}%`);
    }
    if (filtros.especialidade) {
      query = query.ilike('especialidade', `%${filtros.especialidade}%`);
    }
    if (filtros.status) {
      query = query.eq('status', filtros.status);
    }
    if (filtros.rm) {
      query = query.eq('rm', filtros.rm);
    }

    const { data, error } = await query.order('nome', { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar médicos: ${error.message}`);
    }

    return data || [];
  }
}

export const medicosService = new MedicosService();