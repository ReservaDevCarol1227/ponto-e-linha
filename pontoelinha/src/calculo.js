const agulhas = {
    "3.0": { co: 2, pbx: 2, pb: 4, pma: 5.5, pa: 7.5, pda: 10.5 },
    "3.5": { co: 2.5, pbx: 2.5, pb: 4.5, pma: 6, pa: 8, pda: 11 },
    "4.0": { co: 3, pbx: 3, pb: 5, pma: 6.5, pa: 8.5, pda: 11.5 },
    "4.5": { co: 3.5, pbx: 3.5, pb: 5.5, pma: 7, pa: 9, pda: 12 },
    "5.0": { co: 8, pbx: 8, pb: 10, pma: 11.5, pa: 13.5, pda: 16.5 },
    "5.5": { co: 8.5, pbx: 8.5, pb: 10.5, pma: 12, pa: 14, pda: 17 },
    "6.0": { co: 9, pbx: 9, pb: 11, pma: 12.5, pa: 14.5, pda: 17.5 },
    "6.5": { co: 9.5, pbx: 9.5, pb: 11.5, pma: 13, pa: 15, pda: 18 }
  };

const tempos = {
  co: 2, pbx: 3, pb: 5, pma: 7, pa: 9, pda: 11
};

function calcularTempoTotal(data) {
  return Object.keys(tempos).reduce((total, tipo) => total + (data[tipo] * tempos[tipo]), 0);
}

function calcularCentimetros(data, agulhaData) {
  if (!agulhaData) return 0;
  return Object.keys(agulhaData).reduce((total, tipo) => total + (data[tipo] * agulhaData[tipo]), 0);
}

function converterParaMetros(cm) {
  return cm / 100;
}

function calcularGramas(metros) {
  return parseFloat((metros * 4.2).toFixed(1));
}

function calcularUso(metros) {
  return parseFloat((metros * 4.0).toFixed(1));
}

function calcular(data) {
  const tempoTotal = calcularTempoTotal(data);
  const agulhaData = agulhas[data.agulha];
  const cm = calcularCentimetros(data, agulhaData);
  const metros = converterParaMetros(cm);
  return {
    tempoTotal,
    metros,
    gramas: calcularGramas(metros),
    uso: calcularUso(metros)
  };
}

module.exports = {
  calcular,
  calcularTempoTotal,
  calcularCentimetros,
  converterParaMetros,
  calcularGramas,
  calcularUso
};
