/**
 * Format number according to its currency, locale and number of digits
 *
 * @param {string} locale - locale to format the currency in the correct way (symbol position, thousands separators, etc)
 * @param {number} number - number to be formatted
 * @param {string} currency - currency to display next to the value (optional)
 *
 * @return {string} formatted number
 */
export const formatCompactedNumber = (locale, number, currency) => {
  const value = ['USD', 'EUR'].includes(currency) ? number / 100 : number;

  const compactedNumber =
    value >= 1000000
      ? `${Math.round((value / 1000000) * 100) / 100}m`
      : value >= 1000
      ? `${Math.round((value / 1000) * 100) / 100}k`
      : value;

  // TODO: Waiting for a proposal from tc39 to unify the API for number formatting,
  // meanwhile if we want a compact version of big numbers we have separate parts
  // that we concatenate. This is not perfect as for now it only handles if this is
  // an english locale or not, thus we put the currency symbol before, otherwise we put it after
  // with a space
  // see https://github.com/tc39/ecma402/issues/215
  if (currency) {
    const currencySymbol = formatNumber({ currency, locale, number: 0 })
      .replace(/\d/g, '')
      .trim();

    return locale === 'en'
      ? `${currencySymbol}${compactedNumber}`
      : `${compactedNumber}\xa0${currencySymbol}`;
  } else {
    return compactedNumber.toString();
  }
};

/**
 * Format number depending on the locale and if it is a currency or not
 *
 * @param {string} object.currency - currency to display next to the value
 * @param {string} object.locale - locale to format the currency in the correct way (symbol position, thousands separators, etc)
 * @param {number} object.number - number to be formatted
 * @param {boolean} object.percent - if the number should be percent formatted
 * @param {number} [object.digits=2]  - _optional_ set the number of digits
 *
 * We avoid displaying trailing zeros (by default the percent style do not display decimals)
 * Otherwise, we display two decimal digits
 *
 * @return {string} number formatted with spaces and currency/percent symbol if required
 */
export const formatNumber = ({ currency, locale, number, percent, digits = 2 }) => {
  const value = ['USD', 'EUR'].includes(currency) ? number / 100 : number;

  return new Intl.NumberFormat(locale, {
    ...(currency ? { style: 'currency', currency } : percent ? { style: 'percent' } : {}),
    ...(percent
      ? !Number.isInteger(Math.round(value * 10000) / 100) && {
          minimumFractionDigits: digits,
        }
      : Number.isInteger(value)
      ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      : { minimumFractionDigits: digits, maximumFractionDigits: digits }),
  }).format(value);
};
