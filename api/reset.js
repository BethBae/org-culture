const { redis, sessionKey, send } = require('./_store');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { ok: false, message: 'POST만 허용됩니다.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const pin = process.env.ADMIN_PIN || '0000';
    if (String(body.pin || '') !== pin) return send(res, 401, { ok: false, message: '관리자 PIN이 올바르지 않습니다.' });
    await redis(['DEL', sessionKey(body.session)]);
    return send(res, 200, { ok: true });
  } catch (e) {
    return send(res, e.code === 'NO_STORE' ? 503 : 500, { ok: false, message: e.message });
  }
};
