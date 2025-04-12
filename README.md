# 🔍 Sistema Comunitário de Achados e Perdidos

Objetos perdidos em locais públicos — como escolas, parques e centros comunitários — frequentemente não são recuperados por falta de um sistema que facilite o contato entre quem perdeu e quem encontrou. Com isso em mente, este projeto apresenta uma solução acessível: uma aplicação web simples que permite registrar e procurar itens perdidos ou encontrados, promovendo a colaboração entre os usuários.

## Funcionalidades

### 📌 Cadastro de Usuário
- Nome
- Email
- Telefone
- Senha (criptografada com bcrypt)

### 📌 Login
- Autenticação via JWT
- Geração de token para acesso a rotas protegidas

### 📌 Cadastro de Itens
- **Descrição do objeto**: Uma identificação rápida (ex: "Carteira preta com zíper").
- **Categoria**: Tipo do item (documentos, roupas, eletrônicos, etc.).
- **Data**: Quando o item foi perdido ou encontrado.
- **Local**: Onde foi visto ou deixado pela última vez.
- **Contato**: Informações de quem está cadastrando (e-mail ou telefone).
- **Foto (opcional)**: Imagem para facilitar o reconhecimento.
- **Status**: Define se o item está como *perdido* ou *encontrado*.

### 🔍 Pesquisa e Consulta
- Lista de todos os objetos registrados.
- Filtros por categoria, localização e status.
- Campo de busca por palavras-chave.

## 💻 Tecnologias Utilizadas

### Backend:
- **Node.js + Express**: Estrutura para criação da API.
- **Prisma ORM**: Acesso e manipulação dos dados no banco.
- **PostgreSQL**: Banco de dados relacional.
- **CRUD completo**: Operações para registrar, consultar, editar e excluir itens.

# Configuração do Arquivo `.env`

Este documento descreve as variáveis de ambiente que precisam ser configuradas no arquivo `.env` para a correta execução da aplicação.

## 🗄️ No arquivo `.env`, configurar:

<div align="center" >
<img src="https://github.com/user-attachments/assets/7ba07b32-49a2-46a6-a538-8eb27a32a2d8" width="700px"/>
</div>


### 📌 Banco de dados:

- **Define a URL base da aplicação.**
- **Por padrão, a aplicação roda localmente na porta 3000.**

- `DATABASE_URL`**: Endereço completo para conexão com o banco de dados PostgreSQL. Inclui informações como protocolo, usuário, senha, host, porta e nome do banco de dados. Use `localhost` caso o banco de dados esteja rodando localmente.
    - **Exemplo:** `postgres://postgres:mysecretpassword@localhost:5432/bootcamp_trabalho`
    - **Componentes (extraídos do exemplo):**
        - `DB_HOST`**: `localhost`
        - `DB_USER`**: `postgres`
        - `DB_PASSWORD`**: `mysecretpassword` (Substitua pela sua senha correta)
        - `DB_DATABASE`**: `bootcamp_trabalho`
        - `DB_PORT`**: `5432` (O padrão para PostgreSQL é 5432)

### 📌 Autenticação:

- **`PRIVATE_KEY`**: Chave secreta usada para assinar tokens de autenticação (como JWT). Deve ser mantida em sigilo para garantir a segurança da aplicação.
    - **Exemplo:** `keymuitograndeblablablabla` (Esta é apenas uma amostra, a sua chave será diferente)
- **`EXPIRES_IN`**: Tempo de expiração dos tokens de autenticação. O valor `"5h"` indica que os tokens terão uma validade de 5 horas.
    - **Exemplo:** `5h`


## 📌 Observações:

- Certifique-se de criar um arquivo chamado `.env` na raiz do seu projeto.
- Copie o conteúdo acima para o seu arquivo `.env` e substitua os valores de exemplo pelas suas configurações reais.

## SQUAD

  <table>
  <tr>
	<td align="center"><a href="https://www.linkedin.com/in/dmpms?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/6b4729a1-c7fd-4294-83c6-e10abb3d0788.jpeg?updatedAt=1744378005443" width="100px;" alt="Davi"/><br /><sub><b>Davi Monteiro</b></sub></a><br /><a href="https://github.com/DMPMS" title="Davi Monteiro"></a></td> 
    <td align="center"><a href="https://www.linkedin.com/in/guilherme-martinelis?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/88461583.jpeg?updatedAt=1744378476560" width="100px;" alt="Guilherme"/><br /><sub><b>Guilherme Martinelis</b></sub></a><br /><a href="https://github.com/martinelis25lk" title="Guilherme Martinelis"></a></td> 
    <td align="center"><a href="https://www.linkedin.com/in/sandy-machado-/"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/e0f1c3cd-39ae-4691-a4f5-19d18c378575.jpeg?updatedAt=1736183718654" width="100px;" alt="Sandy"/><br /><sub><b>Sandy Machado</b></sub></a><br /><a href="https://github.com/sandymachadoo" title="Sandy Machado"></a></td> 
    <td align="center"><a href="https://www.linkedin.com/in/wilghaner-silva-bb4491220/"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/83884818.jpeg?updatedAt=1744383361003" width="100px;" alt="Wilghaner"/><br /><sub><b>Wilghaner Silva</b></sub></a><br /><a href="https://github.com/WilghanerSilva" title="Wilghaner Silva"></a></td>
<td align="center"><a href="https://www.linkedin.com/in/patriciaferreirash/"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/100604597.png?updatedAt=1744384206299" width="100px;" alt="Patricia"/><br /><sub><b>Patricia Ester</b></sub></a><br /><a href="https://github.com/patriciaferreirash" title="Patricia Ester"></a></td> 
<td align="center"><a href="https://www.linkedin.com/in/carloseduardovs?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/1692196693079.jpeg?updatedAt=1744474830522" width="100px;" alt="Carlos Eduardo"/><br /><sub><b>Carlos Eduardo</b></sub></a><br /></td> 
<td align="center"><a href="https://br.linkedin.com/in/rayanne-alvila-8232491b4"><img style="border-radius: 50%;" src="https://ik.imagekit.io/hcmpwxpo7/195511743.png?updatedAt=1744474022918" width="100px;" alt="Rayanne"/><br /><sub><b>Rayanne Alvila</b></sub></a><br /><a href="https://github.com/allvila" title="Rayanne Alvila"></a></td> 


</tr>
</table>
