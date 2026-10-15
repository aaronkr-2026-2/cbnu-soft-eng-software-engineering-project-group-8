import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const local = join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const python = existsSync(local) ? local : process.platform === 'win32' ? 'python' : 'python3';
const child = spawn(python, process.argv.slice(2), { cwd: root, stdio: 'inherit' });
child.on('error', error => { console.error(`Python could not start: ${error.message}`); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
