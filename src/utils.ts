import axios, { Method } from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
export const backgroundColor = "#e9e9f1";
export const textBoxBackground = "#EBEEF5";
export const secondaryTextColor = "#bebebe";
export const thirdTextColor = "#b0b2bf";
export const primaryColor = "#00c164";
export const disabledBackgroundColor = "#e1e1e1";
export const disabledTextColor = "#afb1b5";
export const loadingBackground = "#68696b77";
export const loadingTextBackground = "#68696bAA";
export const topBarBackground = "#ededed";
export const primaryFontSize = 15;
export const secondaryFontSize = 12;
export const requestURL = "http://42.51.195.178:5054";
export const socketURL = "http://42.51.195.178:9093";

export const marginTopIOS = 40;
export const marginTopAndroid = 40;

export interface Chat {
  isGroup: boolean;
  lastMessage: string;
  lastTime: number;
  name: string;
  headerPhoto: string;
}
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
  let nowSeconds = now.getSeconds();
  let msgSeconds = msg.getSeconds();

  let h_s = msgHours < 10 ? "0" + msgHours : "" + msgHours;
  let m_s = msgMinutes < 10 ? "0" + msgMinutes : "" + msgMinutes;
  let s_s = msgSeconds < 10 ? "0" + msgSeconds : "" + msgSeconds;
  if (nowYear - msgYear === 0) {
    if (nowDate - msgDate === 0) {
      //今天

      return h_s + ":" + m_s + ":" + s_s;
    } else if (nowDate - msgDate === 1) {
      return "昨天 " + h_s + ":" + m_s;
      //昨天
    } else if (nowDate - msgDate === 2) {
      //前天
      return "前天 " + h_s + ":" + m_s;
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
export async function fetchData(url: string, method: Method, params?: any) {
  try {
    let rs = await axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      data: params,
      baseURL: url,
    });
    if (rs.status === 200) {
      return Promise.resolve(rs.data);
    } else {
      Alert.alert("提示", "网络错误:" + rs.status);
    }
  } catch (e) {
    console.log(e);
    Alert.alert("错误", "" + e);
  }
}

export async function putData(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
    return Promise.reject("Error");
  }
}
export async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return Promise.resolve(JSON.parse(value));
    } else {
      return Promise.reject("Null");
    }
  } catch (e) {
    console.log(e);
    return Promise.reject("Error");
  }
}
