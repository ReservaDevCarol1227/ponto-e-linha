const { calcular } = require('../../src/calculo');
const log = require('../helpers/logger');

describe('CT-001 - Estimar tempo e material com agulha 3.0mm e ponto baixo', () => {
  it('deve calcular tempo e fio corretamente', () => {
    log.start('Iniciando CT-001 - Cálculo com 100 pb e agulha 3.0mm');

    const data = {
      co: 0,
      pbx: 0,
      pb: 100,
      pma: 0,
      pa: 0,
      pda: 0,
      agulha: "3.0"
    };

    log.data('Dados de entrada:', data);

    const resultado = calcular(data);

    log.success('Resultado obtido com sucesso:');
    log.data('Saída:', resultado);

    expect(resultado.tempoTotal).toBe(500);
    expect(resultado.metros).toBeCloseTo(4.0, 1);
    expect(resultado.gramas).toBeCloseTo(16.8, 1);
    expect(resultado.uso).toBeCloseTo(16.0, 1);
  });
});
