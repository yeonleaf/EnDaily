
function KoreanExistValidator(data) {
    let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(data)) {
        return true;
    } else {
        return false;
    }
}

export default KoreanExistValidator;