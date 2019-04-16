
var split_sentence = function (sentence, pivot) {
  var s = sentence.split("。")
  s = s.filter(function (i) {
    return Boolean(i)
  })
  var target = ""
  var i
  for (i = 0; i < s.length; i++) {
    var item = s[i]
    if (item.includes(pivot)) {
      target = item
      break
    }
  }
  return [target, s]
}

var handle_title = function(title) {
  if (Boolean(title)) {
    return title
  } else {
    return "无题"
  }
}

var handle_author = function(author) {
  if (Boolean(author)) {
    return author
  } else {
    return "轶名"
  }
}

var beautify_poetry = function(sentences, pivot) {
  var result = split_sentence(sentences, pivot)
  var target = result[0]
  var splited_se = result[1]
  var array_se = []
  if (splited_se.length < 3) {
    return [target, splited_se]
  }
  // 如果是诗句不做任何处理直接返回即可
  if (isEqualLength(splited_se)) {
    return [target, splited_se]
  } else {
    array_se.push(sentences)
    return [target, array_se]
  }
}

var isEqualLength = function(s){
  var length = 0
  var i = 0
  for (i; i<s.length; i++){
    if (length == 0){
      length = s[i].length
    } else {
      if (length != s[i].length) {
        return false
      }
    }
  }
  return true
}

module.exports = {
  handle_title: handle_title,
  handle_author: handle_author,
  beautify_poetry: beautify_poetry
}