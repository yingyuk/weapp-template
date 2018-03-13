// wepy 变量替换 __NODE_ENV__ 为当前环境变量
export const NODE_ENV = '__NODE_ENV__'; // [ 'production', 'development' ]

// wepy 变量替换 __NAME__ 为当前项目名称 [package.json].name
export const NAME = '__NAME__'; // 'weapp-template'

// wepy 变量替换 __VERSION__ 为当前项目名称 [package.json].version
export const VERSION = '__VERSION__'; // '0.0.1'

export const isProd = NODE_ENV === 'production';

export const isDev = NODE_ENV === 'development';

export const isTest = NODE_ENV === 'test';

const prodDomain = 'https://licheng.halobear.com';

const devDomain = 'https://licheng.weddingee.com';

const testDomain = 'https://licheng.weddingee.com';

let domain;

if (isProd) {
  domain = prodDomain;
} else if (isDev) {
  domain = devDomain;
} else if (isTest) {
  domain = testDomain;
}

export const DOMAIN = domain;
