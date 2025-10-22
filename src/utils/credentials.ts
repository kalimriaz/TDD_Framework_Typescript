import fs from 'fs';
import path from 'path';

type Cred = { username: string; password: string; label?: string };

export function loadCredentials(csvName = 'credentials.csv'): Cred[] {
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
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = cols[i]));
    return { username: obj.username, password: obj.password, label: obj.label } as Cred;
  });
}
