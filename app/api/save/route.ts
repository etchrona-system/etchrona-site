import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const data = await req.json();

  const newRecord = {
    source: data.source || 'etchrona-system',
    type: data.type || 'image/unknown',
    filename: data.filename || 'unnamed.png',
    hash: data.hash,
    translated_log: data.translated_log || 'Semantic node recorded.',
    timestamp: new Date().toISOString(),
    version: 'v0.3.0'
  };

  const logPath = path.join(process.cwd(), 'public', 'log', 'verify.json');
  let logs = [];

  try {
    const file = fs.readFileSync(logPath, 'utf8');
    logs = JSON.parse(file);
  } catch (err) {
    logs = [];
  }

  logs.push(newRecord);

  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2), 'utf8');

  return NextResponse.json({ status: 'ok', inserted: newRecord });
}
