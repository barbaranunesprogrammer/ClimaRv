import { BASE_URL } from "../uteis/url.js";

export default async function carregarLua() {
  const container = document.querySelector(".lua-hoje");

  if (!container) {
    console.error("Container da Lua não encontrado!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/rioverde/moon`);
    if (!response.ok) throw new Error("Erro ao buscar os dados da Lua");

    const data = await response.json();

    // Mapeamento direto das fases da API (em PT-BR) para imagens
  const imagensLua = {
  "Lua Nova": "src/assets/fases_lua/new.png",
  "Lua Cheia": "src/assets/fases_lua/full.png",
  "Quarto Crescente": "src/assets/fases_lua/first_quarter.png",
  "Quarto Minguante": "src/assets/fases_lua/last_quarter.png",
  "Lua Crescente": "src/assets/fases_lua/waxing_crescent.png",
  "Lua Minguante": "src/assets/fases_lua/waning_crescent.png",
  "Gibosa Crescente": "src/assets/fases_lua/waxing_gibbous.png",
  "Gibosa Minguante": "src/assets/fases_lua/waning_gibbous.png",
  "Crescente": "src/assets/fases_lua/waxing_crescent.png",
};

    const fase = data.fase_da_lua; // Exemplo: "Lua Nova"
    const imagem = imagensLua[fase] || "src/assets/fases_lua/default.png";

    container.innerHTML = `
      <h2>Lua Hoje</h2>
      <p>Fase da Lua para hoje em Rio Verde - GO</p>
      <strong>Data:</strong> ${data.data}<br>
      <strong>Fase da Lua:</strong> <span class="fase">${fase}</span><br>
      <strong>Iluminação:</strong> ${data.iluminacao}<br>
      <img src="${imagem}" alt="${fase}" width="120">
    `;
  } catch (error) {
    console.error("Erro lua:", error);
    container.innerText = "Erro ao carregar dados da Lua";
  }
}
