const { mostrarFormularioEditar, toggleProjeto } = require('../../src/perfilUtils');
const { JSDOM } = require('jsdom');
const log = require('../helpers/logger');

describe('CT-003 - Funcionalidades da tela de perfil do usuário', () => {
  beforeEach(() => {
    const dom = new JSDOM(`
      <body>
        <button id="btn-toggle"></button>
        <div id="detalhes-0" style="display: none;"></div>
        <div id="formulario-editar-0" style="display: none;"></div>
      </body>
    `);
    global.document = dom.window.document;
  });

  test('mostrarFormularioEditar deve exibir o campo de edição', () => {
    log.start('CT-003.1 - Exibir campo de edição');
    mostrarFormularioEditar(0);
    const visivel = document.getElementById('formulario-editar-0').style.display;
    log.data('Display após função:', visivel);
    log.success('Campo de edição exibido com sucesso.');
    expect(visivel).toBe('block');
  });

  test('toggleProjeto deve alternar visibilidade dos detalhes', () => {
    log.start('CT-003.2 - Alternar visibilidade de detalhes');
    const detalhes = document.getElementById('detalhes-0');
    detalhes.previousElementSibling = document.getElementById('btn-toggle');

    const projetos = [{ nome: 'Projeto A', tempo_estimado: '5h', uso_estimado: '10g' }];

    toggleProjeto(0, projetos);
    log.data('Display após abrir:', detalhes.style.display);
    expect(detalhes.style.display).toBe('block');

    toggleProjeto(0, projetos);
    log.data('Display após fechar:', detalhes.style.display);
    log.success('Alternância realizada com sucesso.');
    expect(detalhes.style.display).toBe('none');
  });
});
