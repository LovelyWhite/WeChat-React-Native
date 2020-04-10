import axios, {Method } from "axios";
import { Alert } from "react-native";
export const backgroundColor = "#e9e9f1";
export const textBoxBackground="#EBEEF5";
export const secondaryTextColor="#bebebe";
export const thirdTextColor = "#b0b2bf"
export const primaryColor = "#00c164";
export const disabledBackgroundColor = "#e1e1e1"
export const disabledTextColor = "#afb1b5"
export const loadingBackground = "#68696b77"
export const loadingTextBackground = "#68696bAA"
export const topBarBackground = "#ededed"
export const primaryFontSize = 15;
export const secondaryFontSize = 12;
export const requestURL="http://42.51.195.178:5054";
export const socketURL="http://42.51.195.178:9093";

export const marginTopIOS=40;
export const marginTopAndroid=40;
// 返回一个字符串显示发送日期
//返回 昨天 前天 和日期
export function getTimeString(timestamp: number): string {
  let now = new Date(Date.now());
  let msg = new Date(timestamp);

  let nowDate = now.getDate();
  let msgDate = msg.getDate();
  let nowYear = now.getFullYear();
  let msgYear = msg.getFullYear();
  let nowMouth = now.getMonth() + 1;
  let msgMouth = msg.getMonth() + 1;
  let nowHours = now.getHours();
  let msgHours = msg.getHours();
  let nowMinutes = now.getMinutes();
  let msgMinutes = msg.getMinutes();

  if (nowYear - msgYear === 0) {
    if (nowDate - msgDate === 0) {
      //今天
      return msgHours + ":" + msgMinutes;
    } else if (nowDate - msgDate === 1) {
      return "昨天 " + msgHours + ":" + msgMinutes;
      //昨天
    } else if (nowDate - msgDate === 2) {
      //前天
      return "前天 " + msgHours + ":" + msgMinutes;
    } else {
      return msgMouth + "-" + msgDate + " " + msgHours + ":" + msgMinutes;
    }
  } else {
    return (
      msgYear +
      "-" +
      msgMouth +
      "-" +
      msgDate +
      " " +
      msgHours +
      ":" +
      msgMinutes
    );
  }
}
//网络请求
export async function fetchData(url:string,method:Method,params?:any)
{
  try{
    let rs = await axios({
      headers:{
        "Content-Type":"application/json"
      },
      method:method,
      data:params,
      baseURL:url
    })
    if(rs.status===200){
      return Promise.resolve(rs)
    }
    else
    {
      Alert.alert("提示",""+rs);
    }
  }
  catch(e)
  {
    return Promise.reject(e);
  }
  return 
}