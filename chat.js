const apiKey = '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';

async function enviarMensagem() {
  const input = document.getElementById('mensagem');
  const conversa = document.getElementById('conversa');
  const textoUsuario = input.value.trim();
  if (!textoUsuario) return;

  conversa.innerHTML += `<div class="mensagem usuario">Você: ${textoUsuario}</div>`;
  input.value = '';

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: textoUsuario }]
      })
    });

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} - ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    const textoIA = dados.choices?.[0]?.message?.content || 'Desculpe, não entendi.';
    conversa.innerHTML += `<div class="mensagem assistente">IA: ${textoIA}</div>`;
  } catch (erro) {
    console.error(erro);
    conversa.innerHTML += `<div class="mensagem assistente">Erro ao conectar com a IA: ${erro.message}</div>`;
  }
}
