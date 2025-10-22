const fs = require('fs');
const path = require('path');

function loadCredentials(csvName = 'credentials.csv') {
  const csvPath = path.resolve(process.cwd(), 'data', csvName);
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const [header, ...rows] = lines;
  const headers = header.split(',').map((h) => h.trim());

  return rows.map((r) => {
    const cols = r.split(',').map((c) => c.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cols[i]));
    return { username: obj.username, password: obj.password, label: obj.label };
  });
}

module.exports = { loadCredentials };
