// This function keeps the casing unchanged for str, then perform the conversion
export default function toNonAccentVietnamese(str) {
  // str = str.replaceAll(/A|Á|À|Ã|Ả|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  // str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  // str = str.replaceAll(/E|É|È|Ẽ|Ẻ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  // str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  // str = str.replaceAll(/I|Í|Ì|Ĩ|Ỉ|Ị/g, "I");
  // str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, "i");
  // str = str.replaceAll(/O|Ó|Ò|Õ|Ỏ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  // str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  // str = str.replaceAll(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  // str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  // str = str.replaceAll(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  // str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  // str = str.replaceAll(/Đ/g, "D");
  // str = str.replaceAll(/đ/g, "d");
  // // Some system encode vietnamese combining accent as individual utf-8 characters
  // str = str.replaceAll(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  // str = str.replaceAll(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  // remove accents
  if(str==='' || str===null) {
      return str=""
  }
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
}
