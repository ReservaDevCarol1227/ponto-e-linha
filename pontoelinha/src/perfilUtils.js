function mostrarFormularioEditar(id) {
  const el = document.getElementById(`formulario-editar-${id}`);
  if (el) el.style.display = 'block';
}

function toggleProjeto(id, projetos) {
  const detalhes = document.getElementById(`detalhes-${id}`);
  const botao = detalhes?.previousElementSibling;

  if (!detalhes || !botao) return;

  const aberto = detalhes.style.display === 'block';
  detalhes.style.display = aberto ? 'none' : 'block';

  botao.innerHTML = aberto
    ? `<strong>${projetos[id].nome}</strong><br><span><strong>Tempo:</strong> ${projetos[id].tempo_estimado}</span><br><span><strong>Uso:</strong> ${projetos[id].uso_estimado}</span>`
    : `<strong>${projetos[id].nome}</strong>`;
}

module.exports = { mostrarFormularioEditar, toggleProjeto };
