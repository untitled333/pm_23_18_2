// server/server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

if (!fs.existsSync(DATA_FILE)) {
  const initial = {
    name: {
      firstName: 'Mathew',
      lastName: 'Smith',
      title: 'Graphic & Web Designer',
    },
    expertise: [
      { skill: 'Photoshop', level: 50 },
      { skill: 'Illustrator', level: 50 },
      { skill: 'Indesign', level: 50 },
      { skill: 'Word', level: 50 },
      { skill: 'Power Point', level: 50 },
    ]
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
  console.log('data.json створено з початковими даними');
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

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
      const data = readData();
      json(res, 200, { success: true, data: data.name });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування даних' });
    }
    return;
  }

  // GET /api/expertise
  if (method === 'GET' && url === '/api/expertise') {
    try {
      const data = readData();
      json(res, 200, { success: true, data: data.expertise });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування даних' });
    }
    return;
  }

  // POST /api/name
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

server.listen(PORT, () => {
  console.log(`\nСервер запущено → http://localhost:${PORT}`);
  console.log('Маршрути:');
  console.log("  GET  /api/name       - ім'я та посада");
  console.log('  GET  /api/expertise  - навички');
  console.log("  POST /api/name       - оновити ім'я та посаду");
});
