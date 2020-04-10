const refs = {
  false: '![]',
  true: '!![]',
  undefined: '[][[]]',
  NaN: '+{}',
  Infinity: '+!![]/+[]',
  obj: '{}',
  emptyStr: '[]+[]',
  zero: '+[]',
  one: '+!+[]',
  fn: '()=>{}',
};

const stringify = (str: string): string => `(${str})+[]`;

const fromNumber = (length: number): string =>
  length === 0 ? refs.zero : Array.from({ length }, () => refs.one).join(' + ');

const map: Record<string, string> = {};

const fromString = (str: string): string =>
  str
    .split('')
    .map((char) => {
      if (char in map) return map[char];
      const code = char.charCodeAt(0);
      return `([]+[])[${fromString('constructor')}][${fromString(
        'fromCharCode'
      )}](${fromNumber(code)})`;
    })
    .join('+');

// prepare letters for `constructor`
map.c = `(${stringify(refs.obj)})[${fromNumber(5)}]`;
map.o = `(${stringify(refs.obj)})[${fromNumber(1)}]`;
map.n = `(${stringify(refs.Infinity)})[${fromNumber(1)}]`;
map.s = `(${stringify(refs.false)})[${fromNumber(3)}]`;
map.t = `(${stringify(refs.obj)})[${fromNumber(6)}]`;
map.r = `(${stringify(refs.true)})[${fromNumber(1)}]`;
map.u = `(${stringify(refs.true)})[${fromNumber(2)}]`;

const stringConstructor = `(${refs.emptyStr})[${fromString('constructor')}]`;
const numberConstructor = `(${refs.one})[${fromString('constructor')}]`;
const functionConstructor = `(${refs.fn})[${fromString('constructor')}]`;
const regExpConstructor = `(/ /)[${fromString('constructor')}]`;

// prepare letters for `toString`
map.S = `(${stringify(stringConstructor)})[${fromNumber(9)}]`;
map.g = `(${stringify(stringConstructor)})[${fromNumber(14)}]`;
map.i = `(${stringify(refs.Infinity)})[${fromNumber(3)}]`;

// prepare letters for `return escape`
map.a = `(${stringify(refs.NaN)})[${fromNumber(1)}]`;
map.e = `(${stringify(refs.obj)})[${fromNumber(4)}]`;
map.p = `(${stringify(regExpConstructor)})[${fromNumber(14)}]`;
map[' '] = `(${stringify(refs.obj)})[${fromNumber(7)}]`;
map['\\'] = `(${stringify('/\\\\/')})[${fromNumber(1)}]`;

// prepare letters for String.fromCharCode
map.f = `(${stringify(refs.false)})[${fromNumber(0)}]`;
map.m = `(${stringify(numberConstructor)})[${fromNumber(11)}]`;
map.C = `(${functionConstructor}(${fromString('return escape')})()(${
  map['\\']
}))[${fromNumber(2)}]`;
map.h = `(${fromNumber(17)})[${fromString('toString')}](${fromNumber(18)})`;
map.d = `(${stringify(refs.undefined)})[${fromNumber(2)}]`;

export const encode = (code: string): string =>
  `${functionConstructor}(${fromString(code)})()`;
