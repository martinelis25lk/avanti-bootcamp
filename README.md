# 🔍 Sistema Comunitário de Achados e Perdidos

Objetos perdidos em locais públicos — como escolas, parques e centros comunitários — frequentemente não são recuperados por falta de um sistema que facilite o contato entre quem perdeu e quem encontrou. Com isso em mente, este projeto apresenta uma solução acessível: uma aplicação simples que permite registrar e procurar itens perdidos ou encontrados, promovendo a colaboração entre os usuários.

## 💻 Funcionalidades

### 📌 Login:
- E-mail e senha;
- Autenticação via JWT;
- Geração de token para acesso a rotas protegidas.

### 📌 CRUD de Usuários:
- Nome;
- Email;
- Telefone;
- Senha (criptografada com bcrypt).

### 📌 Categorias:
- Nome;
- Prioridade.

### 📌 CRUD de Itens:
- Nome;
- Foto do item;
- Categoria;
- Data do ocorrido (quando o item foi perdido ou encontrado);
- Local do ocorrido (estado, cidade, bairro, logradouro e número);
- Data da entrega (quando o item foi entregue ao seu proprietário);
- Contato (e-mail ou telefone);
- Status (se foi um item perdido ou encontrado);

### 📌 Buscas e Consultas:
- Consulta de todos os itens registrados;
- Consulta de itens registrados pelo usuário autenticado;
- Busca de itens por palavras-chave.

## 🌐 Tecnologias Utilizadas

### 📌 Backend:
- **Node.js + Express**: estrutura para criação da API;
- **Prisma ORM**: acesso e manipulação dos dados no banco;
- **PostgreSQL**: banco de dados relacional;
- **Swagger**: documentação da API. Para visualizar a documentação das rotas basta acessar **http://localhost:3000/api-docs/**.

## ⚙️ Configuração e Execução do Back-end

Aqui são apresentadas as configurações do arquivo `.env` a ser criado, a configuração do banco de dados, além da instalação e execução do projeto.

### 📌 .env:

Este arquivo descreve as variáveis de ambiente que precisam ser configuradas no arquivo para a correta execução da aplicação. Após criar o arquivo `.env` na raiz do projeto, configurar:

- **DATABASE_URL**: Endereço completo para conexão com o banco de dados PostgreSQL. Inclui informações como protocolo, usuário, senha, host, porta e nome do banco de dados:
  -  **usuario**: usuário do banco de dados;
  -  **senha**: senha do banco de dados;
  -  **host**: endereço do banco de dados;
  -  **porta**: porta do banco de dados;
  -  **banco**: nome do banco de dados.
- **PRIVATE_KEY**: chave secreta usada para assinar tokens JWT. Deve ser mantida em sigilo para garantir a segurança da aplicação. Pode ser alterada para maior segurança;
- **EXPIRES_IN**: tempo de expiração dos tokens de autenticação. Neste caso, o valor `"5h"` indica que os tokens terão uma validade de 5 horas.
- **APP_URL**: url onde a aplicação será executada. Neste caso, o valor `"http://localhost:3000"` indica que ela será executada localmente na porta 3000.

```env
  DATABASE_URL="postgres://usuario:senha@host:porta/banco"
  
  PRIVATE_KEY="secret"
  EXPIRES_IN="5h"

  APP_URL="http://localhost:3000"
```

### 📌 Instalar dependências:

Executar o comando abaixo.

```sh
npm install
```

### 📌 Configurar o banco de dados:

Executar os comandos abaixo, um por um.

```sh
npx prisma migrate dev
npx prisma db seed
```

### 📌 Rodar a aplicação:

Executar o comando abaixo:

```sh
npm run dev
```

## 🤝 SQUAD

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
