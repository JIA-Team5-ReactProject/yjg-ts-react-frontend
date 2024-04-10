export function formatPhoneNumber(phoneNum: string) {
  // 일반 휴대전화 번호
  if (phoneNum.length === 11) {
    return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 7)}-${phoneNum.slice(
      7
    )}`;
  } else if (phoneNum.length === 10) {
    // 지역번호가 2자리 또는 휴대폰이 011, 016 등인 경우
    // 지역번호가 2자리인 경우 (02XXXXYYYY)
    if (phoneNum.startsWith("02")) {
      return `${phoneNum.slice(0, 2)}-${phoneNum.slice(2, 6)}-${phoneNum.slice(
        6
      )}`;
    } else {
      return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 6)}-${phoneNum.slice(
        6
      )}`;
    }
  } else if (phoneNum.length === 9) {
    return `${phoneNum.slice(0, 2)}-${phoneNum.slice(2, 5)}-${phoneNum.slice(
      5
    )}`;
  } else {
    return "지원하지 않는 형식의 번호입니다.";
  }
}
