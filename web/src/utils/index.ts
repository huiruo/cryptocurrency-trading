
/**
 * 格式化日期选项
 */
class DateFormatOption {
  "M+": number;//月
  "d+": number;//日
  "h+": number;//小时
  "m+": number;//分
  "s+": number;//秒
  "q+": number;//季度
  "S+": number;//毫秒
}
export function formatUnixTime(val:number, fmt="yyyy-MM-dd hh:mm:ss") {
  const date = new Date(val);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  const options = new DateFormatOption();
  options["M+"] = date.getMonth() + 1;
  options["d+"] = date.getDate();
  options["h+"] = date.getHours();
  options["m+"] = date.getMinutes();
  options["s+"] = date.getSeconds();
  options["q+"] = Math.floor((date.getMonth() + 3) / 3);
  options["S+"] = date.getMilliseconds();
  for (let k in options) {
    const key = k as keyof DateFormatOption;//转换key格式
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = options[key] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00'+ str).substr(str.length) 
      );
    }
  }
  return fmt;
}