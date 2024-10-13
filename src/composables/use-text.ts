/**
 * ルビをふる
 */
export const convert = (
  text: string
) => text
.replace(/｜([一-龠]+)（(.+?)）/g, '<ruby>$1<rt>$2</rt></ruby>')
.replace(/([一-龠]+)（(.+?)）/g, '<ruby>$1<rt>$2</rt></ruby>')
.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')

/**
 * ケバブケースに変換
 */
export const toKebabCase = (
  text: string
) => text.toLowerCase().replace(/\s/g, '-')
