// 错误解析
export function errorParse(error) {
  let errMsg;
  if (typeof error === 'string') {
    errMsg = error;
  } else if (typeof error === 'object') {
    errMsg = error.message;
  }
  errMsg = errMsg || 'unknown error';
  return errMsg;
}

// wepy 变量替换 __NODE_ENV__
export const NODE_ENV = '__NODE_ENV__';
