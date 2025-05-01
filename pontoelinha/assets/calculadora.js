const form = document.getElementById('form-proj');
const resultadoDiv = document.getElementById('resultado');

const agulhas = {
    "3.0": { co: 2, pbx: 2, pb: 4, pma: 5.5, pa: 7.5, pda: 10.5 },
    "3.5": { co: 2.5, pbx: 2.5, pb: 4.5, pma: 6, pa: 8, pda: 11 },
    "4.0": { co: 3, pbx: 3, pb: 5, pma: 6.5, pa: 8.5, pda: 11.5 },
    "4.5": { co: 3.5, pbx: 3.5, pb: 5.5, pma: 7, pa: 9, pda: 12 },
    "5.0": { co: 8, pbx: 8, pb: 10, pma: 11.5, pa: 13.5, pda: 16.5 },
    "5.5": { co: 8.5, pbx: 8.5, pb: 10.5, pma: 12, pa: 14, pda: 17 },
    "6.0": { co: 9, pbx: 9, pb: 11, pma: 12.5, pa: 14.5, pda: 17.5 },
    "6.5": { co: 9.5, pbx: 9.5, pb: 11.5, pma: 13, pa: 15, pda: 18 },
};

const tempos = {
    co: 2,
    pbx: 3,
    pb: 5,
    pma: 7,
    pa: 9,
    pda: 11,
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        co: parseInt(document.getElementById('co').value) || 0,
        pbx: parseInt(document.getElementById('pbx').value) || 0,
        pb: parseInt(document.getElementById('pb').value) || 0,
        pma: parseInt(document.getElementById('pma').value) || 0,
        pa: parseInt(document.getElementById('pa').value) || 0,
        pda: parseInt(document.getElementById('pda').value) || 0,
        agulha: document.getElementById('agulha_proj').value
    };

    const tempoTotal = 
        (data.co * tempos.co) +
        (data.pbx * tempos.pbx) +
        (data.pb * tempos.pb) +
        (data.pma * tempos.pma) +
        (data.pa * tempos.pa) +
        (data.pda * tempos.pda);

    const horas = Math.floor(tempoTotal / 3600);
    const minutos = Math.floor((tempoTotal % 3600) / 60);
    const segundos = Math.floor(tempoTotal % 60);

    const agulhaData = agulhas[data.agulha];
    let centimetros = 0;
    if (agulhaData) {
        centimetros = 
            (data.co * agulhaData.co) +
            (data.pbx * agulhaData.pbx) +
            (data.pb * agulhaData.pb) +
            (data.pma * agulhaData.pma) +
            (data.pa * agulhaData.pa) +
            (data.pda * agulhaData.pda);

            var metros = centimetros / 100;
    } else {
        resultadoDiv.innerHTML = "<p style='color: red;'>Agulha inválida.</p>";
        return;
    }


    resultadoDiv.innerHTML = `
        <h3>Resultado:</h3>
        <p><strong>Tempo estimado:</strong> ${horas}h ${minutos}min ${segundos}s</p>
        <p><strong>Comprimento estimado de linha usada:</strong> ${metros.toFixed(2)} metros</p>
    `;
});
