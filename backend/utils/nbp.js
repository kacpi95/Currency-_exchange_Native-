const axios = require('axios');

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60;

async function fetchNBP(table = 'A', code = 'EUR') {
  const key = `${table}|${code}`;

  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const res = await axios.get(
    `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/?format=json`
  );

  const rate = res.data.rates[0];

  const data = {
    code: code.toUpperCase(),
    table,
    effectiveDate: rate.effectiveDate,
    mid: rate.mid ?? null,
    bid: rate.bid ?? null,
    ask: rate.ask ?? null,
  };

  cache.set(key, { data, ts: Date.now() });

  return data;
}

module.exports = { fetchNBP };
