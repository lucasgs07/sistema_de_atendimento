import { Request, Response, NextFunction } from 'express';

export const validarPerfilPermitido = (req: Request, res: Response, next: NextFunction) => {
  // Simula utilizador autenticado como Admin sem checar token ou banco
  (req as any).usuarioLogado = {
    id: 'dev-id',
    email: 'admin@sistema.com',
    perfil: 'Admin'
  };
  
  next();
};