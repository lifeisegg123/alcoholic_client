export const currencyFormatter = (
  value: string | number,
  suffix: string = "₩"
) => {
  const reg = /(\d)(?=(\d{3})+(?!\d))/g;
  return `${String(value).replace(reg, "$1,")} ${suffix}`;
};
