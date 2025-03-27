const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

const numberFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'decimal',
});

export const currencyFormat = (number: number) => currencyFormatter.format(number);

export const numberFormat = (number?: number) => (number ? numberFormatter.format(number) : 0);
