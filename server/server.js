const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Ініціалізація data.json якщо не існує
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
    users: [],
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
}

// ── helpers ────────────────────────────────────────────────
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
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(raw);
  if (!data.users) data.users = []; // міграція старого файлу
  return data;
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

// ── server ─────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  cors(res);
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── GET /api/name ──────────────────────────────────────
  if (method === 'GET' && url === '/api/name') {
    try {
      json(res, 200, { success: true, data: readData().name });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування' });
    }
    return;
  }

  // ── GET /api/expertise ─────────────────────────────────
  if (method === 'GET' && url === '/api/expertise') {
    try {
      json(res, 200, { success: true, data: readData().expertise });
    } catch {
      json(res, 500, { success: false, message: 'Помилка зчитування' });
    }
    return;
  }

  // ── POST /api/register ─────────────────────────────────
  if (method === 'POST' && url === '/api/register') {
    try {
      const body = await parseBody(req);
      const { firstName, lastName, email, country, password } = body;

      if (!firstName || !lastName || !email || !password) {
        json(res, 400, { success: false, message: "Усі поля обов'язкові" });
        return;
      }

      const data = readData();

      // Перевірка чи email вже існує
      if (data.users.find((u) => u.email === email)) {
        json(res, 409, { success: false, message: 'Користувач з таким email вже існує' });
        return;
      }

      // Зберігаємо нового користувача
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        country: country || '',
        password, // у реальному проєкті — хешувати!
        createdAt: new Date().toISOString(),
      };

      data.users.push(newUser);

      // Оновлюємо також name (для CV)
      data.name = {
        firstName,
        lastName,
        title: data.name.title || 'Graphic & Web Designer',
        email,
        country: country || '',
      };

      writeData(data);

      const { password: _p, ...safeUser } = newUser;
      json(res, 201, { success: true, message: 'Реєстрацію завершено!', data: safeUser });
    } catch (e) {
      json(res, 500, { success: false, message: 'Помилка запису даних' });
    }
    return;
  }

  // ── POST /api/login ────────────────────────────────────
  if (method === 'POST' && url === '/api/login') {
    try {
      const body = await parseBody(req);
      const { email, password } = body;

      if (!email || !password) {
        json(res, 400, { success: false, message: "Email та пароль обов'язкові" });
        return;
      }

      const data = readData();
      const user = data.users.find((u) => u.email === email && u.password === password);

      if (!user) {
        json(res, 401, { success: false, message: 'Невірний email або пароль' });
        return;
      }

      const { password: _p, ...safeUser } = user;
      json(res, 200, { success: true, message: 'Вхід успішний!', data: safeUser });
    } catch {
      json(res, 500, { success: false, message: 'Помилка сервера' });
    }
    return;
  }

  // ── POST /api/name ─────────────────────────────────────
  if (method === 'POST' && url === '/api/name') {
    try {
      const { firstName, lastName, title } = await parseBody(req);
      if (!firstName || !lastName || !title) {
        json(res, 400, { success: false, message: "Усі поля обов'язкові" });
        return;
      }
      const data = readData();
      data.name = { firstName, lastName, title };
      writeData(data);
      json(res, 200, { success: true, data: data.name });
    } catch {
      json(res, 500, { success: false, message: 'Помилка запису даних' });
    }
    return;
  }

  json(res, 404, { success: false, message: 'Маршрут не знайдено' });
});

server.listen(PORT, () => {
  console.log(`\nСервер → http://localhost:${PORT}`);
  console.log('  GET  /api/name');
  console.log('  GET  /api/expertise');
  console.log('  POST /api/register  — реєстрація нового юзера');
  console.log('  POST /api/login     — вхід');
  console.log("  POST /api/name      — оновити ім'я та посаду");
});
