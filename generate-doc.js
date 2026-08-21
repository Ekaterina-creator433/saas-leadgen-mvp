const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} = require("docx");

const SCREENSHOT = "C:\\ucheba\\saas-leadgen-mvp\\screenshot-landing.png";

const h1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, bold: true, size: 32 })],
  });

const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26 })],
  });

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 120, line: 300 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, size: 22 })],
  });

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80, line: 290 },
    children: [new TextRun({ text, size: 22 })],
  });

const cell = (text, bold = false) =>
  new TableCell({
    width: { size: 50, type: WidthType.PERCENTAGE },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4 },
      left: { style: BorderStyle.SINGLE, size: 4 },
      right: { style: BorderStyle.SINGLE, size: 4 },
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold, size: 21 })],
      }),
    ],
  });

function planTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: ["Неделя", "Задачи", "Результат"].map((t) => cell(t, true)),
      }),
      ...rows.map(
        (r) =>
          new TableRow({
            children: [cell(r[0], true), cell(r[1]), cell(r[2])],
          })
      ),
    ],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22 },
      },
    },
  },
  sections: [
    {
      children: [
        p("Онлайн-курс «Обучение ИИ» · Итоговый урок «Монетизация навыка, финальный проект»", {
          center: true,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: "Личный план развития на 30 дней",
              bold: true,
              size: 40,
            }),
          ],
        }),
        p("Собственный продукт / SaaS", { center: true }),

        h1("1. Выбранный вектор развития"),
        p(
          "Вектор: собственный продукт / SaaS. Продукт строится через итерационный цикл: MVP → обратная связь → доработка → снова аудитория."
        ),

        h2("Идея продукта"),
        p(
          "«Конструктор мини-лендингов с заявками в Telegram» — SaaS-сервис для малого бизнеса (швейные предприятия, ателье, частные мастера), у которого нет сайта. Клиент за 1 день получает готовый лендинг с формой заявки, а каждая заявка мгновенно приходит ему в Telegram. Бизнес решает главную боль — теряет заявки, потому что его не могут найти и связаться."
        ),

        h2("Описание на языке пользы (формула кейса)"),
        p(
          "«Я делаю сервис, который помогает малому бизнесу [без сайта] решить проблему [клиенты не могут найти и оставить заявку]. Владелец делает [публикует страницу и настраивает бота в Telegram за 30 минут], на выходе получает [лендинг + заявки прямо в мессенджер]. Это полезно, потому что [не теряются клиенты и не нужны дорогие подрядчики]. Дальше продукт можно развивать через [шаблоны ниш, рассылки, подписку]»."
        ),

        h1("2. Конкретный проект на месяц"),
        bullet("Название: LeadGO — конструктор мини-лендингов с заявками в Telegram."),
        bullet("Для кого: малый бизнес и частные специалисты без собственного сайта — швейные производства, ателье, мастера."),
        bullet(
          "Сценарий: владелец регистрируется, выбирает шаблон, вводит услуги и контакты, подключает своего Telegram-бота. Получает ссылку на лендинг. Каждая заявка с формы приходит в его Telegram. Владелец видит и принимает заявку, не открывая сайт."
        ),
        bullet(
          "Как проверяю результат: лендинг грузится быстро, форма отправляет заявку, в Telegram приходит уведомление с данными клиента (имя, телефон, услуга, время)."
        ),
        bullet(
          "Как презентую: для клиента — как «страницу, куда можно приводить клиентов и получать заявки», с демо; для портфолио — как рабочий кейс по формуле «проблема → решение → результат»."
        ),

        h1("3. Маршрут на 30 дней"),
        planTable([
          [
            "Неделя 1",
            "Собрать MVP: демо-лендинг (швейное предприятие «Крой») с формой заявки и уведомлением в Telegram. Подготовить код и инструкцию по деплою.",
            "Рабочий MVP: лендинг + форма + Telegram ✅ выполнено",
          ],
          [
            "Неделя 2",
            "Найти 1 пилотного клиента (личный контакт или местный бизнес), развернуть ему лендинг, собрать обратную связь, исправить слабые места.",
            "Пилотный запуск + список улучшений от клиента",
          ],
          [
            "Неделя 3",
            "Упаковать продукт: страница-презентация, 3–5 шаблонов под разные ниши, простой тариф (разовая настройка + поддержка).",
            "Страница продукта и тарифная страница",
          ],
          [
            "Неделя 4",
            "Запуск: предложить продукт 10–20 локальным бизнесам, собрать 2–3 платящих клиента, зафиксировать метрики (заявки, время настройки, повторные заказы).",
            "2–3 клиента + отчёт с метриками",
          ],
        ]),

        h1("4. Первое действие по плану — выполнено"),
        p(
          "Первый шаг сделан сразу после составления плана: собран рабочий MVP-лендинг «Швейное предприятие „Крой“» с формой заявки и уведомлением в Telegram."
        ),
        bullet("Стек: HTML, CSS, JavaScript + Node.js (Express) + Telegram Bot API."),
        bullet("Форма собирает имя, телефон, услугу и комментарий и отправляет данные на сервер."),
        bullet("Сервер уведомляет владельца в Telegram и логирует заявку."),
        bullet("Проект проверен локально: лендинг открывается, форма отправляет заявку (получен ответ { ok: true })."),
        bullet("Подготовлен README с инструкцией по запуску и деплою на Railway."),

        new Paragraph({
          spacing: { before: 160, after: 120 },
          children: [
            new TextRun({
              text: "Подтверждение: скриншот работающего MVP-лендинга",
              bold: true,
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: fs.readFileSync(SCREENSHOT),
              transformation: { width: 620, height: 1160 },
            }),
          ],
        }),

        h1("5. Как проверю результат через 30 дней"),
        bullet("У продукта есть рабочий MVP и хотя бы 1 пилотный клиент."),
        bullet("Лендинг грузится за пару секунд, заявки приходят в Telegram без потерь."),
        bullet("Получена обратная связь от 1–3 клиентов и внесены улучшения."),
        bullet("Составлено портфолио-кейс по формуле «проблема → решение → результат»."),
        bullet("Собран первый доход или подтверждённый интерес (заявки на продукт)."),

        new Paragraph({
          spacing: { before: 320, after: 80 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: "План составлен и первое действие выполнено.",
              italics: true,
              size: 22,
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  const out = "C:\\ucheba\\План_развития_30_дней.docx";
  fs.writeFileSync(out, buf);
  console.log("OK: " + out);
});