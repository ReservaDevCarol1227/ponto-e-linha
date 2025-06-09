const {
  calcularTempoTotal,
  calcularCentimetros,
  converterParaMetros,
  calcularGramas,
  calcularUso
} = require('../../src/calculo');

const log = require('../helpers/logger');

describe('CT-002 - Testar funções auxiliares da calculadora', () => {
  const agulha3 = { co: 2, pbx: 2, pb: 4, pma: 5.5, pa: 7.5, pda: 10.5 };
  const data = { co: 0, pbx: 0, pb: 100, pma: 0, pa: 0, pda: 0 };

  test('calcularTempoTotal deve retornar 500', () => {
    log.start('CT-002.1 - calcularTempoTotal com 100 pb');
    log.data('Entrada:', data);
    const tempo = calcularTempoTotal(data);
    log.data('Resultado:', tempo);
    log.success('Tempo calculado corretamente.');
    expect(tempo).toBe(500);
  });

  test('calcularCentimetros deve retornar 400', () => {
    log.start('CT-002.2 - calcularCentimetros com agulha 3.0');
    log.data('Entrada:', data);
    const cm = calcularCentimetros(data, agulha3);
    log.data('Resultado:', cm);
    log.success('Centímetros calculados corretamente.');
    expect(cm).toBe(400);
  });

  test('converterParaMetros deve retornar 4', () => {
    log.start('CT-002.3 - converterParaMetros com 400cm');
    const metros = converterParaMetros(400);
    log.data('Resultado:', metros);
    log.success('Conversão para metros feita corretamente.');
    expect(metros).toBe(4);
  });

  test('calcularGramas deve retornar 16.8', () => {
    log.start('CT-002.4 - calcularGramas com 4 metros');
    const gramas = calcularGramas(4);
    log.data('Resultado:', gramas);
    log.success('Gramas calculadas corretamente.');
    expect(gramas).toBe(16.8);
  });

  test('calcularUso deve retornar 16', () => {
    log.start('CT-002.5 - calcularUso com 4 metros');
    const uso = calcularUso(4);
    log.data('Resultado:', uso);
    log.success('Uso calculado corretamente.');
    expect(uso).toBe(16);
  });
});
