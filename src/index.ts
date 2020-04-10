// Basics
const basics = {
  false: '![]+[]',
  true: '!![]+[]',
  undefined: '([][[]]+[])',
  NaN: '(+{}+[])',
  Infinity: '((+!![]/+[])+[])',
};

// Numbers
const zero = '+[]';
const one = '+!+[]';

const fromNumber = (length: number): string =>
  length === 0 ? zero : Array.from({ length }, () => one).join(' + ');

// acdefghimnoprstuCS[space][backslash]

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
    .join(' + ');

// constructor のために用意
map.c = `({}+[])[${fromNumber(5)}]`; // [object Object];
map.o = `({}+[])[${fromNumber(1)}]`; // [object Object]
map.n = `(${basics.Infinity})[${fromNumber(1)}]`;
map.s = `(${basics.false})[${fromNumber(3)}]`; // false;
map.t = `({}+[])[${fromNumber(6)}]`; // [object Object]
map.r = `(${basics.true})[${fromNumber(1)}]`; // true;
map.u = `(${basics.true})[${fromNumber(2)}]`; // true;

// toString のために用意
map.S = `([]+([]+[])[${fromString('constructor')}])[${fromNumber(9)}]`; // function String;
map.g = `([]+([]+[])[${fromString('constructor')}])[${fromNumber(14)}]`; //function String
map.i = `(${basics.Infinity})[${fromNumber(3)}]`;

// return escape のために用意
map.a = `(${basics.NaN})[${fromNumber(1)}]`;
map.e = `({}+[])[${fromNumber(4)}]`; // [object Object]
map.p = `([]+(/ /)[${fromString('constructor')}])[${fromNumber(14)}]`; // function RegExp
map[' '] = `({}+[])[${fromNumber(7)}]`; // [object Object]
map['\\'] = `(/\\\\/+[])[${fromNumber(1)}]`;

//fromCharCode
map.f = `(${basics.false})[${fromNumber(0)}]`; // false;
map.m = `([]+(${one})[${fromString('constructor')}])[${fromNumber(11)}]`; // function Number
map.C = `((() => {})[${fromString('constructor')}](${fromString(
  'return escape'
)})()(${map['\\']}))[${fromNumber(2)}]`; // escape('\\')
map.h = `(${fromNumber(17)})[${fromString('toString')}](${fromNumber(18)})`; // 18進数の最後の文字
map.d = `(${basics.undefined})[${fromNumber(2)}]`;

const encode = (code: string): string =>
  `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;

console.log(encode('console.log("do me well")'));

// Object.keys(map).map(key => console.log(key, eval(map[key])));