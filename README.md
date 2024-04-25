# CRUD API FILMES
Crud de filmes básico com autenticação JWT

## Tecnologias

`Node.js`,`TypeScript`, `Express`, `Jsonwebtoken`, `PostgreSQL`, `Sequelize`, `Zod`, `redis`

## Rota de autenticação (JWT)
- GET `admin/login`

Ao logar o seu token fica salvo no cache do redis fazendo assim não ser necessário passar no header das rotas privadas o token

### Regra do login

No corpo da requisição de login deve acompanhar a senha de login que é a data atual, assim gerando um token JWT para usar nas requisições da API

## Rotas privadas (FILMES)

#### Todas as rotas são privadas (Autenticação JWT)

### Pegar filmes

- GET `/admin/filmes` ( Retorna todos os filmes )
- GET `/admin/filmes/:id` ( Retorna o filme pelo ID )

### Adicionar e Atualizar um filme

- POST `/admin/filmes` ( Adiciona um filme )
- PUT `/admin/filmes/:id` ( Atualiza um filme pelo ID )

No corpo da requisição deve conter o nome do filme e a descrição do mesmo, sendo obrigatótio o nome do filme ter entre 5 a 60 caracteres e a descrição com no máximo 255 caracteres.

### Deletar filme

- DELETE `/admin/filmes/:id` ( Deleta um filme pelo ID )


### .ENV
- DEFAULT_TOKEN `Token padrão pra regra de login`
- PORT `Porta que vai rodar o express`
- SECRET_KEY `Secret key para gerar o token JWT`

- PG_DB `Nome do banco de dados`
- PG_USER `User do banco de dados`
- PG_PASSWORD `Password do banco de dados`
- PG_PORT `Porta do banco de dados`

- REDIS_URL `Url do Redis`
- REDIS_PASSWORD `Senha do Redis`
- DATABASE_URL `url doo banco de dados`