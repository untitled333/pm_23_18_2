const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');


//перевіряє чи існує data.json, якщо ні, то вставляє сам значення по дефолту:
if (!fs.existsSync(DATA_FILE)) {
  const initial = {
    name: { firstName: 'Mathew', lastName: 'Smith', title: 'Graphic & Web Designer' },
    expertise: [
      { skill: 'Photoshop', level: 50 },
      { skill: 'Illustrator', level: 50 },
      { skill: 'Indesign', level: 50 },
      { skill: 'Word', level: 50 },
      { skill: 'Power Point', level: 50 },
    ],
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
}

//додає заголовки
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

//встановлює статус і перетворює об'єкт у формат json і відправляє клієнту
function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

//функції для зчитування та запису даних у файл data.json
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

//ствоерння сервера і обробка запитів
const server = http.createServer((req, res) => {
  cors(res);
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /api/name
  if (method === 'GET' && url === '/api/name') {
    try {
      json(res, 200, { success: true, data: readData().name });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування' });
    }
    return;
  }

  // GET /api/expertise
  if (method === 'GET' && url === '/api/expertise') {
    try {
      json(res, 200, { success: true, data: readData().expertise });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування' });
    }
    return;
  }

  // POST /api/register
  if (method === 'POST' && url === '/api/register') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { firstName, lastName, email, country } = JSON.parse(body);

        if (!firstName || !lastName || !email) {
          json(res, 400, { success: false, message: "firstName, lastName та email обов'язкові" });
          return;
        }

        const data = readData();
        data.name = {
          firstName,
          lastName,
          title: data.name.title || 'Graphic & Web Designer',
          email,
          country: country || '',
        };
        writeData(data);

        json(res, 200, { success: true, message: 'Реєстрацію завершено!', data: data.name });
      } catch (e) {
        json(res, 500, { success: false, message: 'Помилка запису даних' });
      }
    });
    return;
  }

  //відповідєа за обробку вхідних даних і збереження їх у файл
  if (method === 'POST' && url === '/api/name') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { firstName, lastName, title } = JSON.parse(body);

        if (!firstName || !lastName || !title) {
          json(res, 400, { success: false, message: 'Усі поля обовязкові' });
          return;
        }

        const data = readData();
        data.name = { firstName, lastName, title };
        writeData(data);

        json(res, 200, { success: true, data: data.name });
      } catch {
        json(res, 500, { success: false, message: 'Помилка запису даних' });
      }
    });
    return;
  }

  json(res, 404, { success: false, message: 'Маршрут не знайдено' });
});


//запуск сервера і виведення інформації в консоль 
server.listen(PORT, () => {
  console.log(`\nСервер → http://localhost:${PORT}`);
  console.log('  GET  /api/name');
  console.log('  GET  /api/expertise');
  console.log('  POST /api/register');
  console.log("  POST /api/name - оновити ім'я та посаду");
});
