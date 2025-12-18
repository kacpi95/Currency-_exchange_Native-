import { fetchNBP } from '../utils/nbp';

exports.getCurrentCurrency = async (req, res) => {
  const currencies = ['USD', 'PLN', 'EUR', 'CHF'];
  const result = [];

  for (const cur of currencies) {
    const rate = await fetchNBP('A', cur);
    if (rate)
      result.push({ code: cur, mid: rate.mid, date: rate.effectiveDate });
  }
  res.json(result);
};
