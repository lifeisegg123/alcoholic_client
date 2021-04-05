export const currencyFormatter = (
  value: string | number,
  prefix: string = "₩"
) => {
  const reg = /(\d)(?=(\d{3})+(?!\d))/g;
  return `${prefix} ${String(value).replace(reg, "$1,")}`;
};
