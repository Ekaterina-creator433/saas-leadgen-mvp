const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  statusEl.textContent = "Отправляем...";
  statusEl.className = "form__status";

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok && json.ok) {
      statusEl.textContent = "Заявка отправлена! Перезвоним в течение 10 минут.";
      statusEl.className = "form__status ok";
      form.reset();
    } else {
      throw new Error(json.error || "Ошибка");
    }
  } catch (err) {
    statusEl.textContent = "Не получилось отправить. Попробуйте ещё раз или позвоните нам.";
    statusEl.className = "form__status err";
  }
});