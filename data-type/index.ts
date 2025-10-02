let str1: string; // TS 官方推荐写法
str1 = "hello"; // 没问题
// str1 = new String("hello");
// Type 'String' is not assignable to type 'string'.
// 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.ts(2322)
// 建议用 基元 string 而

let str2: String;
str2 = new String("big string"); // 这个可以写
// str2 = "hello"; // 可以也可以写

console.log(typeof str1); // string
console.log(typeof str2); // object

// JS 自动装箱
let myStr = "hello";

// 当访问 str.length 是, JS 引擎做了以下工作
let size = (function () {
  // 1. 自动装箱: 创建一个临时的 String 对象 包装原始字符串
  let tempStringObject = new String(myStr);

  // 2. 访问 String 对象的 length 属性
  let lengthValue = tempStringObject.length;

  // 3. 销毁临时对象, 返回长度值
  // (JS 引擎自动处理对象销毁, 开发者无感知)
  return lengthValue;
})();

// 上面 ^^^ 这个函数是 IIFE 立即执行函数表达式 immediately invoked function expression
// 结尾的 () 就是让函数 马上执行的关键
// 基本语法
// (function() {
//   函数体
// })();
// function() {...} 定义了一个匿名函数
// 外层的 (...) 把函数变成了一个表达式, 防止 JS 把它当做函数声明
// 末尾的() 立即调用这个函数
// 把函数的返回值赋给了 size
console.log(size);

// ==========================
// #####   type1: any   #####
// ==========================
// 明确的表示 a 的类型是 any --- 显式的 any
let a: any;
// 以下对 a 的赋值, 均无警告
a = 100; // 不会推断, 因为明确的表示了 any
a = "你好";
a = false;

// 没有明确的表示 b 的类型是 any, 但 TS 主动推断出来 b 是 any --- 隐式的 any
let b;
// 以下对 b 的赋值, 均无警告
b = 100;
b = "你好";
b = false;

// *** 注意点, any 类型的变量, 可以赋值给 任意类型的变量
let x: string;
x = a; // 这里 a 现在是 false, 类型是 any, x 要求 string, 但是不警告
console.log("x is: " + x + ". x's type is: " + typeof x); // x is: false. x's type is: boolean
// 但是原本 x 是 string
// x = "abc";  // 不过后面这里不警告
// x = true;  // 这里警告

// ==========================
// ##### type2: unknown #####
// ==========================

let a2: unknown;

// 以下对 a 的赋值, 均正常
a2 = 100;
a2 = false;
a2 = "你好";

// 设置 x2 的数据类型为 string
let x2: string;
// x2 = a2; // 警告: 不能把类型"unknown"分配给类型"string"
// ^^^ Type 'unknown' is not assignable to type 'string'.ts(2322)

let x3: unknown;
x3 = a2; // 不警告, unknown 可以分配给 unknown

// 手动类型检查之后, 可以赋值给其他的类型
// 手段 1
// if (typeof a2 === "number") {
//   x2 = a2;  // 警告: x2 是 string, Type 'number' is not assignable to type 'string'.ts(2322)
// }
if (typeof a2 === "string") {
  x2 = a2; // 可以正常赋值
}

// 手段 2 (断言)
x2 = a2 as string;

// 手段 3 (断言的另一种写法)
x2 = <string>a2;

// 由此可以说, unknown 是一个 类型安全 的 any

//
let ss1: string;
ss1 = "hello";
ss1.toUpperCase(); // 无警告

let ss2: any;
ss2 = "hello";
ss2.toUpperCase(); // 无警告

let ss3: unknown;
ss3 = "hello";
// ss3.toUpperCase() // 警告: ss3 的类型未知
// Property 'toUpperCase' does not exist on type 'unknown'.ts(2339)

// 但是可以加断言 或者 强制判断
(ss3 as string).toUpperCase();
(<string>ss3).toUpperCase();
if (typeof ss3 === "string") {
  ss3.toUpperCase();
}

// ==========================
// #####  type3: never  #####
// ==========================
// 指定 a3 的类型为 never, 那就意味着 a3 以后不能存任何的数据了
let a3: never;

// 以下对 a3 的所有赋值都会有警告
// a3 = 1;
// a3 = true;
// a3 = undefined;
// a3 = null;

// function demo3():number{  // A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
// }

function demo3(): number {
  return 100;
}

function demo32(): never {
  // A function returning 'never' cannot have a reachable end point.
  // 返回 never 的函数不能具有可访问的终结点, 因为函数顺利调用结束, 必然会返回一个 undefined, 如果自己不写的话
  // 死循环的话不会飘红
  // demo32() // 这样不飘红, 但是没意义啊
  throw new Error("程序运行异常"); // 函数会抛出异常 并 立刻结束对函数的调用, 没有返回值, 所以这也不飘红
}

// 所以会这么用
function throwError(str: string): never {
  throw new Error("程序异常退出:" + str);
}

// 或者是 TS 主动推断的
let b3: string;
let c3: any;

b3 = "hello";
c3 = 9;
b3 = c3;

if (typeof b3 === "string") {
  console.log(b3.toUpperCase());
} else {
  console.log(b3); // 这里 TS 会推断出这里的 b3 是 never, 因为没有任何一个值符合这里逻辑
}
// 好抽象, 把 any 赋给 b3, 如果 any 现在不是 string, 就会走到这个 else 了...

// ==========================
// #####  type4: void   #####
// ==========================
function logMessage(msg: string): void {
  console.log(msg);
}
logMessage("你好, type4: void");

// 没有用 return 指定函数的返回值, 所以这个函数没有 显式返回值, 但是有一个 隐式返回值, 是 undefined
// 也就是说 虽然返回类型是 void, 但是可以接受 undefined, undefined 是 void 可以接受的一种 "空"

// 但是 void 还有一个层面的意思是, 不可以依赖函数的返回值做操作
let result = logMessage("result");
console.log("result 变量是: " + result + " 它的类型是: " + typeof result);
// result 变量是: undefined 它的类型是: undefined
// 但是下面会飘红, 因为依赖返回类型为 void 的函数的返回值做操作了
// if (result) {
//   // An expression of type 'void' cannot be tested for truthiness.
// }

// 但是可以用 undefined 来应对这个情况
