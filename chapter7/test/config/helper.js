module.exports = {
    lengthOfList : (list = []) => list.length, // list의 길이 반환
    eq : (val1, val2) => val1 === val2, // 값이 같은지 비교
    dateString : (isoString) => new Date(isoString).toLocaleDateString() // ISO 문자열을 날짜 문자열로 변환
}
