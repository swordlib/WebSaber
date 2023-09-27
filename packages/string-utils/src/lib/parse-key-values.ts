export interface IParseKeyValuesOptions {
  parseNumber?: boolean;
}
const defaultOptions: IParseKeyValuesOptions = {
  parseNumber: true
};
/**
 * return an object contains all query parameters or empty object
 * @param {string} url
 * @return {object}
 */
export function parseKeyValues(url: string, options: Partial<IParseKeyValuesOptions> = {}) {
  const postOptions = {
    ...defaultOptions,
    ...options,
  };

  const params: Record<string, string | number> = {},

    tempArr = decodeURIComponent(url)
                  .replace(/\+/g, ' ')
                  .match(/\w+=[^&#?\\/,;]+/g);
  if (!tempArr) {
    return {};
  }
  tempArr.forEach(function (item) {
    const ps = item.split('=');
    if (postOptions.parseNumber) {
      params[ps[0]] = /^\d+(\.\d+)?$/.test(ps[1]) ? parseFloat(ps[1]) : ps[1];
    } else {
      params[ps[0]] = ps[1];
    }
  });

  return params;
}

/**
 * Alternative version that don't parse number
 */
parseKeyValues.stringOnly = function(url: string) {
  return parseKeyValues(url, { parseNumber: false });
}