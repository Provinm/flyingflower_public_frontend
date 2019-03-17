const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatSearch(lst) {
  let newLst = [];
  for (var i in lst){
    let item = lst[i];
    // var from_university = item.from_university;
    item.from_university = item.from_university[0].name;
    item.apply_major = item.apply_major[0].name;
    item.from_major = item.from_major[0].name;
    item.apply_university = item.apply_university[0].name;
    newLst.push(item)
  }
  return newLst
}

module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  formatSearch: formatSearch
}
