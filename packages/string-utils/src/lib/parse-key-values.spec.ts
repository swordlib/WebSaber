import { parseKeyValues } from './parse-key-values';

const { stringOnly } = parseKeyValues;

describe('any-qs', () => {
  describe('parse url', () => {
    test('should parse all param in url', () => {
      const url = 'https://www.baidu.com/?cid=id_34&product=%E5%A4%9A%E5%A4%9A%E6%96%87%E5%AD%97#?value=32&key=key110&system=多多测试';
      const params = parseKeyValues(url);
      
      expect(params).toEqual({
        cid: 'id_34',
        product: '多多文字',
        value: 32,
        key: 'key110',
        system: '多多测试'
      });
    });

    test('should replace + with one space', () => {
      const url = 'https://www.google.co.jp/?gfe_rd=cr&ei=2DVeWYrjGo3XqAH_24qQCA#newwindow=1&q=just+a+test+suit';
      const params = parseKeyValues(url);

      expect(params).toEqual({
        gfe_rd: 'cr',
        ei: '2DVeWYrjGo3XqAH_24qQCA',
        newwindow: 1,
        q: 'just a test suit'
      });
    });

    test('should return empty object when match nothing', () => {
      const url = 'http://www.baidu.com';
      const params = parseKeyValues(url);

      expect(Object.keys(params)).toHaveLength(0);
    });

    test('should convert string to number', () => {
      const url = 'http://www.baidu.com?name=bill&born=1994&age=@24&height=174.5';
      const params = parseKeyValues(url) as {
        born: number;
      };
      expect(typeof params.born).toBe('number');
    });
  });
  
  describe('parse anything look like key=value', () => {
    const rawStr = 'nick=bill,email=test@email.com; url=http://github.com&value=a%20%2C%20%E4%B8%AD%E6%96%87';
    /**
     * @type {string} string encoded with encodedURI
     */
    const encodedStr = 'nick=bill,email=test@email.com; url=http://github.com&value=a%20%2C%20%E4%B8%AD%E6%96%87';
    const result = {
      nick: 'bill',
      email: 'test@email.com',
      url: 'http:',
      value: 'a , 中文'
    };

    test('should parse raw string', () => {
      const params = parseKeyValues(rawStr);
      expect(params).toEqual(result);
    });

    test('should parse encoded string', () => {
      const params = parseKeyValues(encodedStr);
      expect(params).toEqual(result);
    });
  });

  describe('alternative version(stringOnly) that only parse string', () => {
    test('should convert number to string', () => {
      const url = 'http://www.baidu.com?name=bill&born=1994&age=@24&height=174.5';
      const params = stringOnly(url) as {
        born: string;
      };
      expect(typeof params.born).toBe('string');
    });
  });
  describe('do not parse /', () => {
    test('should not parse /', () => {
      const url = 'http://www.baidu.com?name=bill&born=1994&age=@24&height=174.5/';
      const params = stringOnly(url);
      expect(params).toEqual({
        name: 'bill', born: '1994', age: '@24', height: '174.5'
      });
    });
  });
});