const { redis, sessionKey, send } = require('./_store');

const LIKERT_KEYS = [
  'a1n', 'a1w', 'a2n', 'a2w', 'a3n', 'a3w', 'a4n', 'a4w',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7',
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6'
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { ok: false, message: 'POST만 허용됩니다.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const answers = body.answers || {};
    const clean = {};
    for (const k of LIKERT_KEYS) {
      const v = Number(answers[k]);
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        return send(res, 400, { ok: false, message: '모든 문항에 응답해 주세요.' });
      }
      clean[k] = v;
    }
    clean.d1 = String(answers.d1 || '').trim().slice(0, 200);
    clean.d2 = String(answers.d2 || '').trim().slice(0, 200);
    clean.d3 = String(answers.d3 || '').trim().slice(0, 200);
    // 익명성: 이름·IP·시각 등 식별 정보는 저장하지 않음
    const key = sessionKey(body.session);
    await redis(['RPUSH', key, JSON.stringify(clean)]);
    await redis(['EXPIRE', key, 60 * 60 * 24 * 30]); // 30일 후 자동 삭제
    const count = await redis(['LLEN', key]);
    return send(res, 200, { ok: true, count });
  } catch (e) {
    return send(res, e.code === 'NO_STORE' ? 503 : 500, { ok: false, message: e.message });
  }
};
