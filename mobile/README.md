## 🚀 Como executar

**Para que esse projeto funcione corretamente, é preciso estar com o servidor rodando.**

- Instale os pacotes com `npm install`.
- Criar o app no google para poder ter acesso ao OAuth (<https://docs.expo.dev/guides/authentication/#google>)
- Faça uma copia do arquivo `.env.example` para `.env` e preencha corretamente.

- Emulando ambiente Android:
  No arquivo server.ts do backend: `/server/src/server.ts`
  Deixar o fastify.listen como:
  `await fastify.listen({ port: 3333, host: '0.0.0.0' });`

  Utilizar a baseUrl da api na pasta mobile com o IP da máquina:
  `Exemplo: 'http://192.168.1.11:3333'`,
  `baseURL: 'http://${ipDaMaquina}:3333'`

- Emulando ambiente IOS:
  No arquivo server.ts do backend: `/server/src/server.ts`
  Deixar o fastify.listen como:
  `await fastify.listen({ port: 3333 });`

  Utilizar a baseUrl da api na pasta mobile como:
  `baseURL: 'http://localhost:3333',`

- Execute `npx expo start` para iniciar o servidor do Expo.
