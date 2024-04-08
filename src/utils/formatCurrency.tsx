export function formatCurrency(price: string) {
  const number = Number(price);
  if (isNaN(number)) {
    return "유효하지 않은 값입니다.";
  }

  return number.toLocaleString("ko-KR");
}
