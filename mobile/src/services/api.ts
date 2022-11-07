import axios from 'axios';

export const api = axios.create({
  /**
   * se estiver no android usar o ip da rede
   * e também adicionar no server.ts do backend o host: '0.0.0.0' no fastify.listen
   */
  /**
   * se estiver no ios, usar localhost e nao usar o host: 0.0.0.0 no backend
   */
  baseURL: 'http://localhost:3333',
});
