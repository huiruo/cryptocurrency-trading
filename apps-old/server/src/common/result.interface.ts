// 定义通用的API接口返回数据类型
export interface Result {
  code: number;
  message: string;
  data?: any;
}

export interface Res<T> {
  code: number;
  message: string;
  data: T;
}