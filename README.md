# Desafio da Adireto Brasil

Aplicação desenvolvida para fazer sorteios de amigo secreto, para o desenvolvimento foi utilizado NodeJS + JavaScript + Express no back-end, e para o front-end utilisou-se de React.js.

# Executando em ambiente de desenvolvimento

### Depedencias

- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) (ou NPM)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

## Clone o repositório

```shell
$ git clone https://github.com/rodgeraraujo/ad-2019
```

## Acesse o diretório do projeto

```shell
$ cd ad-2019/
```

## Executando os projetos

### Executando o back-end

- 1 - Abrir pasta do projeto back-end

```shell
  $ cd ./backend
```

2. Rode o yarn para instalar todas as dependências necessárias

```shell
  yarn install #ou npm install
```

3. crie ou copie o arquivo .env

```shell
  cp .env.example .env
```

4. A estrutura do arquivo é a seguite:

   - `MONGODB_URI`: uri de conexão com o mongo no ambiente de produção.
   - `MONGODB_URI_DEV`: uri de conexão com o mongo no ambiente de desenvolvimento.
   - `SENDGRID_API_KEY`: chave de api do sendgrid para enviar emails.
   - `EMAIL_SENDER`: email 'from' para envio dos email com o sendgrid.
   - `PORT`: porta a qual o sistema rodará. O padrão é a 3000.

OBS: Após preencher todas as váriveis no arquivo .env, rode a aplicação

5. Executando a aplicação

```shell
  $ yarn dev #ou npm run dev
```

O serviço estará rodando em `http://localhost:$PORT`.

### Executando o front-end

- 1 - Abrir pasta do projeto front-end

```shell
  $ cd ./frontend
```

2. Rode o yarn para instalar todas as dependências necessárias

```shell
  $ yarn install #ou npm install
```

5. Executando a aplicação

```shell
  $ yarn start #ou npm start
```

O serviço estará rodando em `http://localhost:3000`.

Obs.: Caso tenha outra aplicação sendo executada na porta `3000`, o mesmo inciará na porta seguiten `3001`.

#### Acesso online dos projetos

Os projetos estão disponíveis no heroku e netlify. Os links de acesso são:

- [backend](https://backend-ad2019.herokuapp.com/v1/status 'backend')
- [frontend](https://ad-2019-front.netlify.app/ 'frontend')
