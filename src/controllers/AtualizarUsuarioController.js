import { prismaClient } from "../database/PrismaClient.js"; 


export class AtualizarUsuarioController {
    async atualizarUsuario(request, response) {
        const {id} = request.params;
        const {nome, email, telefone, senha, confirmarSenha} = request.body; 
        try {
            const Usuario = await prismaClient.Usuario.update({
                where: {id: parseInt(id)},
                data: {
                    nome, email, telefone, senha, confirmarSenha
                }
            })
            return response.status(200).json({Usuario})
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar usuário: ' + error.message})
        }
    }
}
