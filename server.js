require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/lead", async (req, res) => {
  const { name = "", phone = "", service = "", comment = "" } = req.body || {};

  if (!phone && !name) {
    return res.status(400).json({ ok: false, error: "Укажите имя или телефон" });
  }

  const message = [
    "Новая заявка с лендинга",
    `Имя: ${name || "не указано"}`,
    `Телефон: ${phone || "не указан"}`,
    `Услуга: ${service || "не выбрана"}`,
    `Комментарий: ${comment || "—"}`,
    `Время: ${new Date().toLocaleString("ru-RU")}`,
  ].join("\n");

  try {
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "your_bot_token_here") {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );
    }
  } catch (err) {
    console.error("Telegram send error:", err.message);
  }

  console.log(message);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`MVP запущен: http://localhost:${PORT}`);
});