import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

async function execute() {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; //ignore invalid/self-signed cert
  const res = await fetch('https://localhost:7187/swagger/v1/swagger.json');
  let swaggerJson = await res.json();
  writeFileSync('../../src/app/reference/swagger.json', JSON.stringify(swaggerJson, undefined, '  '));
}

execute().catch(err => {
  console.log(err);
});
