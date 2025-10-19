import { BASE_URL } from "../uteis/url.js";

export default async function carregarProximosDias() {
  const container = document.querySelector(".previsao-proximos-3-dias");

  if (!container) {
    console.error("Container de previsão não encontrado!");
    return; // sai da função se não existir o container
  }

  try {
    const hoje = new Date();
    let html = "";

    for (let i = 1; i <= 3; i++) {
      const dataFutura = new Date(hoje);
      dataFutura.setDate(hoje.getDate() + i);
      const dataFormatada = dataFutura.toISOString().split("T")[0];

      const response = await fetch(`${BASE_URL}/previsao/rioverde/${dataFormatada}`);
      if (!response.ok) throw new Error(`Erro ao buscar a previsão para ${dataFormatada}`);
      

      const data = await response.json();

html += `
  <div class="dia">
    <strong>${data.data}</strong><br>
    Temp Max: ${data.max_temp_c}°C<br>
    Temp Min: ${data.min_temp_c}°C<br>
    Condição: ${data.condicao}<br>
    Umidade: ${data.umidade}%<br>
    Iluminação da Lua: ${data.iluminacao_lua}<br>
    <img src="https:${data.icone}" alt="Ícone do tempo" width="64" height="64">
  </div>
`;


    container.innerHTML = html;
  } catch (error) {
    console.error("Erro previsão:", error);
    container.innerText = "Erro ao carregar previsão";
  }
}

// Garantindo que a função só rode depois do DOM estar carregado
document.addEventListener("DOMContentLoaded", () => {
  carregarProximosDias();
});
