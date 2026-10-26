const { redis, sessionKey, send } = require('./_store');

module.exports = async (req, res) => {
  try {
    const key = sessionKey(req.query.session);
    const list = (await redis(['LRANGE', key, 0, -1])) || [];
    const responses = list.map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);
    return send(res, 200, { ok: true, responses });
  } catch (e) {
    return send(res, e.code === 'NO_STORE' ? 503 : 500, { ok: false, message: e.message });
  }
};
