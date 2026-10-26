// Upstash Redis REST 공통 모듈 (외부 패키지 없이 fetch 사용)
// Vercel Marketplace의 Upstash 연동 시 KV_REST_API_URL / KV_REST_API_TOKEN 이 자동 생성됩니다.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  if (!URL_ || !TOKEN) {
    const err = new Error('저장소(Upstash Redis)가 연결되지 않았습니다. 배포 가이드를 확인해 주세요.');
    err.code = 'NO_STORE';
    throw err;
  }
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

function sessionKey(s) {
  const clean = String(s || 'default').toLowerCase().replace(/[^a-z0-9가-힣_-]/g, '').slice(0, 40) || 'default';
  return `oc:responses:${clean}`;
}

function send(res, status, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send(JSON.stringify(body));
}

module.exports = { redis, sessionKey, send };
