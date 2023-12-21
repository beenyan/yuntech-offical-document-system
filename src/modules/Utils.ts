const NUMBER_LOWER: string[] = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
]; // 〇
const NUMBER_UPPER: string[] = [
  '零',
  '壹',
  '貳',
  '參',
  '肆',
  '伍',
  '陸',
  '柒',
  '捌',
  '玖',
];
const UNIT_LOWER: string[] = ['', '十', '百', '千'];
const UNIT_UPPER: string[] = ['', '拾', '佰', '仟'];
const UNIT_GROUP_LOWER: string[] = ['', '萬', '億', '兆'];
const UNIT_GROUP_UPPER: string[] = ['', '萬', '億', '兆'];

export function numToChinese(number: number, upper: boolean): string {
  const NUMBER: string[] = upper ? NUMBER_UPPER : NUMBER_LOWER;
  const UNIT: string[] = upper ? UNIT_UPPER : UNIT_LOWER;
  const GROUP: string[] = upper ? UNIT_GROUP_UPPER : UNIT_GROUP_LOWER;
  const TEMP: Array<Array<string>> = [];
  const RESULT: Array<string> | Array<Array<string>> = [];

  // 1234567890 => [ 0 9 8 7 6 5 4 3 2 1 ]
  const str: string[] = Math.abs(number).toString().split('').reverse();
  for (let i = 0, part: number; i < str.length; i++) {
    part = Math.floor(i / 4); // 0 9 8 7, 6 5 4 3, 2 1
    TEMP[part] = TEMP[part] || [];

    TEMP[part].push(
      NUMBER[parseInt(str[i])] + // 0 => 零
        (str[i] !== '0' ? UNIT[i % 4] : ''), // + 十 百 千
    );
  }

  for (let j = 0; j < TEMP.length; j++) {
    RESULT[j] = TEMP[j].reverse().join('') + GROUP[j]; // + 万 亿 兆
  }

  return (
    (number < 0 ? '負' : '') +
    RESULT.reverse()
      .join('')
      .replace(/([〇零])[〇零]+/g, '$1')
      .replace(/^[一壹](十|拾)/g, '$1')
      .replace(/([十拾])[〇零]+/g, '$1')
      .replace(/[〇零]+$/g, '')
      .replace(/[〇零]([万亿兆萬億兆])/g, '$1')
      .replace(/([兆兆])[亿億]/g, '$1')
      .replace(/([亿億])[万萬]/g, '$1')
      .replace(/([兆兆])[万萬]/g, '$1')
  );
}

const ReplaceText = ['本臺', '本會', '本署', '本公司', '本處', '本校'];

export const TextHandle = (text: string, sender: string) => {
  let temp = text.trim().replace(/[\n\s]/g, '');
  for (let replaceText in ReplaceText) {
    temp.replace(replaceText, sender);
  }

  return temp;
};

export const SwapElements = (arr: Array<any>, x: number, y: number) => {
  [arr[x], arr[y]] = [arr[y], arr[x]];

  return arr;
};

export const IndexToStr = (index: number, level: number) => {
  const ID = index + 1;
  if (level == 0) return `${numToChinese(ID, false)}、`;
  else if (level == 1) return `（${numToChinese(ID, false)}）`;
  else if (level % 2) return `（${ID}）`;
  else return `${ID}、`;
};
