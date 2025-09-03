document.getElementById("askBtn").addEventListener("click", async () => {
  const apiKey = document.getElementById("apiKey").value.trim();
  const model = document.getElementById("model").value;
  const question = document.getElementById("question").value.trim();
  const answerDiv = document.getElementById("answer");
  const errorDiv = document.getElementById("error");
  const loadingDiv = document.getElementById("loading");

  answerDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  if (!apiKey) {
    errorDiv.textContent = "Por favor, insira sua API Key.";
    errorDiv.classList.remove("hidden");
    return;
  }

  if (!question) {
    errorDiv.textContent = "Digite uma pergunta antes de enviar.";
    errorDiv.classList.remove("hidden");
    return;
  }

  loadingDiv.classList.remove("hidden");
  document.getElementById("askBtn").disabled = true;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        input: question
      })
    });

    if (!response.ok) {
      throw new Error("Erro na conexão com a API");
    }

    const data = await response.json();
    const output = data.output[0].content[0].text;

    answerDiv.textContent = output;
    answerDiv.classList.remove("hidden");

  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.classList.remove("hidden");
  } finally {
    loadingDiv.classList.add("hidden");
    document.getElementById("askBtn").disabled = false;
  }
});
