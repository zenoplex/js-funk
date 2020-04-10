import { encode } from '../index';

describe('index.js', () => {
  describe('encode', () => {
    it('should equal string / numbers', () => {
      expect(eval(encode('return "abcde";'))).toBe('abcde');
      expect(eval(encode('return 123456;'))).toBe(123456);
    });

    it('should equal standard values', () => {
      const cases = [NaN, Infinity, true, false, null, undefined];

      expect(eval(encode("return 'test'"))).toBe('test');

      cases.forEach((elem) => {
        const encoded = encode(`return ${elem}`);
        expect(eval(encoded)).toBe(elem);
      });
    });

    it('should encode functions', () => {
      expect(eval(encode("return (() => { return 'abc'; })()"))).toBe('abc');
      expect(eval(encode("return (function() { return 'abc'; })()"))).toBe(
        'abc'
      );
      expect(
        eval(encode("const fn = () => { return 'abc'}; return fn();"))
      ).toBe('abc');
      expect(
        eval(
          encode(`
        class Cls {
          static fn = () => { return 'abc'; }
        }

        return Cls.fn();
        `)
        )
      ).toBe('abc');
      expect(
        eval(
          encode(`
        class Cls {
          fn = () => { return 'abc'; }
        }
        const ins = new Cls();
        return ins.fn();
        `)
        )
      ).toBe('abc');
    });
  });
});
