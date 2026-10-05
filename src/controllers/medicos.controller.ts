import { Router, Request, Response } from 'express';
import { medicosService } from '../services/medicos.service';
import { StatusMedico } from '../types/medico';

const router = Router();

// 2.1 POST /medicos - Cadastrar médico (Acesso livre para testes)
router.post('/medicos', async (req: Request, res: Response) => {
  try {
    const { nome, rm, especialidade, status } = req.body;

    if (!nome || !rm || !especialidade) {
      return res.status(400).json({ erro: 'Os campos nome, rm e especialidade são obrigatórios.' });
    }

    const novoMedico = await medicosService.criarMedico({ 
      nome, 
      rm, 
      especialidade, 
      status: status || 'Disponível' 
    });

    return res.status(201).json(novoMedico);
  } catch (error: any) {
    console.error('Erro no POST /medicos:', error);
    return res.status(500).json({ erro: `Erro ao cadastrar médico: ${error.message}` });
  }
});

// 2.2 PATCH /medicos/:id/status - Alterar status
router.patch('/medicos/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ erro: 'O campo status é obrigatório.' });
    }

    const medicoAtualizado = await medicosService.alterarStatus(id as string, status as StatusMedico);
    return res.status(200).json(medicoAtualizado);
  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
});

// 2.3 GET /medicos - Listar e filtrar
router.get('/medicos', async (req: Request, res: Response) => {
  try {
    const { nome, especialidade, status, rm } = req.query;

    const medicos = await medicosService.listarMedicos({
      nome: nome ? String(nome) : undefined,
      especialidade: especialidade ? String(especialidade) : undefined,
      status: status ? (status as StatusMedico) : undefined,
      rm: rm ? String(rm) : undefined,
    });

    return res.status(200).json(medicos);
  } catch (error: any) {
    return res.status(500).json({ erro: error.message });
  }
});

export default router;