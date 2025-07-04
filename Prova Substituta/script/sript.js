const precos = {
  Banho: { Pequeno: 40, Médio: 60, Grande: 80 },
  Tosa: { Pequeno: 50, Médio: 70, Grande: 90 }
};

function calcular() {
  const tutor = document.getElementById('tutor').value;
  const pet = document.getElementById('pet').value;
  const porte = document.getElementById('porte').value;
  const servico = document.getElementById('servico').value;
  const hidratacao = document.getElementById('hidratacao').checked;

  let total = 0;

  if (servico === 'Banho') {
    total = precos.Banho[porte];
  } else if (servico === 'Tosa') {
    total = precos.Tosa[porte];
  } else if (servico === 'Banho e Tosa') {
    total = precos.Banho[porte] + precos.Tosa[porte];
  }

  if (hidratacao) {
    total += 25;
  }

  const resultado = `
Orçamento gerado:
Tutor: ${tutor}
Pet: ${pet}
Porte: ${porte}
Serviço: ${servico}
Hidratação adicional: ${hidratacao ? 'Sim' : 'Não'}
Valor estimado: R$${total},00
  `;
  document.getElementById('resultado').textContent = resultado.trim();
}