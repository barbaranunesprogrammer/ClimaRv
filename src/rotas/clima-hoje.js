import { BASE_URL } from "../uteis/url.js";

export default async function carregarClima() {
  try {
    const response = await fetch(`${BASE_URL}/tempo/rioverde`);
    const data = await response.json();

    document.querySelector(".previsao-tempo-atual").innerHTML = `
      <strong>Temperatura:</strong> ${data.temperatura_c}°C (Sensação: ${data.sensacao_termica_c}°C)<br>
        <strong>Condição:</strong> ${data.condicao}<br>

      <strong>Umidade:</strong> ${data.umidade}%<br>
      <strong>Vento:</strong> ${data.vento_kph} km/h (${data.direcao_vento})<br>
      <strong>Pressão:</strong> ${data.pressao_mb} mb<br>
      <strong>Nebulosidade:</strong> ${data.nebulosidade}%<br>
      <strong>Índice UV:</strong> ${data.indice_uv}<br>
      <strong> Condição Climatica :</strong>${data.condicao}

    `;
  } catch (error) {
    console.error("Erro clima:", error);
    document.querySelector(".previsao-tempo-atual").innerText = "Erro ao carregar clima";
  }
}
