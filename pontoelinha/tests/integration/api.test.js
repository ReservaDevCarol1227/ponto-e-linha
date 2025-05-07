const request = require('supertest');
const log = require('../helpers/logger');

describe('Testes de integração - API PHP', () => {
  it('CT-002 - Login com credenciais válidas', async () => {
    log.start('CT-002 - Testando login');

    const credentials = { email: 'usuario@teste.com', senha: '1234' };
    log.data('Enviando credenciais:', credentials);

    const response = await request('http://localhost/pontoelinha/config')
      .post('/autenticar.php')
      .type('form')
      .send(credentials);

    log.success(`Resposta recebida: ${response.statusCode}`);
    expect(response.statusCode).toBe(200);
  });
});
