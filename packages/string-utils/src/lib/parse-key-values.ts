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

    tempArr = url.replace(/\+/g, ' ')
                  .match(/\w+=[^&#?\\/,;]+/g);
  if (!tempArr) {
    return {};
  }
  tempArr.forEach(function (item) {
    const ps = item.split('=');
    const key = ps[0];
    const value = decodeURIComponent(ps[1]);
    if (postOptions.parseNumber) {
      params[key] = /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
    } else {
      params[key] = value;
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