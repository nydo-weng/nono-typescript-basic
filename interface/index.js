let str1; // TS 官方推荐写法
str1 = "hello"; // 没问题
// str1 = new String("hello");
// Type 'String' is not assignable to type 'string'.
// 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.ts(2322)
// 建议用 基元 string 而
let str2;
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
let a;
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
let x;
x = a; // 这里 a 现在是 false, 类型是 any, x 要求 string, 但是不警告
console.log("x is: " + x + ". x's type is: " + typeof x); // x is: false. x's type is: boolean
// 但是原本 x 是 string
// x = "abc";  // 不过后面这里不警告
// x = true;  // 这里警告
// ==========================
// ##### type2: unknown #####
// ==========================
let a2;
// 以下对 a 的赋值, 均正常
a2 = 100;
a2 = false;
a2 = "你好";
// 设置 x2 的数据类型为 string
let x2;
// x2 = a2; // 警告: 不能把类型"unknown"分配给类型"string"
// ^^^ Type 'unknown' is not assignable to type 'string'.ts(2322)
let x3;
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
x2 = a2;
// 手段 3 (断言的另一种写法)
x2 = a2;
// 由此可以说, unknown 是一个 类型安全 的 any
//
let ss1;
ss1 = "hello";
ss1.toUpperCase(); // 无警告
let ss2;
ss2 = "hello";
ss2.toUpperCase(); // 无警告
let ss3;
ss3 = "hello";
// ss3.toUpperCase() // 警告: ss3 的类型未知
// Property 'toUpperCase' does not exist on type 'unknown'.ts(2339)
// 但是可以加断言 或者 强制判断
ss3.toUpperCase();
ss3.toUpperCase();
if (typeof ss3 === "string") {
    ss3.toUpperCase();
}
// ==========================
// #####  type3: never  #####
// ==========================
// 指定 a3 的类型为 never, 那就意味着 a3 以后不能存任何的数据了
let a3;
// 以下对 a3 的所有赋值都会有警告
// a3 = 1;
// a3 = true;
// a3 = undefined;
// a3 = null;
// function demo3():number{  // A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
// }
function demo3() {
    return 100;
}
function demo32() {
    // A function returning 'never' cannot have a reachable end point.
    // 返回 never 的函数不能具有可访问的终结点, 因为函数顺利调用结束, 必然会返回一个 undefined, 如果自己不写的话
    // 死循环的话不会飘红
    // demo32() // 这样不飘红, 但是没意义啊
    throw new Error("程序运行异常"); // 函数会抛出异常 并 立刻结束对函数的调用, 没有返回值, 所以这也不飘红
}
// 所以会这么用
function throwError(str) {
    throw new Error("程序异常退出:" + str);
}
// 或者是 TS 主动推断的
let b3;
let c3;
b3 = "hello";
c3 = 9;
b3 = c3;
if (typeof b3 === "string") {
    console.log(b3.toUpperCase());
}
else {
    console.log(b3); // 这里 TS 会推断出这里的 b3 是 never, 因为没有任何一个值符合这里逻辑
}
// 好抽象, 把 any 赋给 b3, 如果 any 现在不是 string, 就会走到这个 else 了...
// ==========================
// #####  type4: void   #####
// ==========================
function logMessage(msg) {
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
// ==========================
// #####  type5: object #####
// ==========================
let a5; // a5 的值可以是任何 [非原始类型], 包括: 对象, 函数, 数组等
// 以下代码, 是将非原始类型 赋值给a5, 所以都符合要求
a5 = {};
a5 = { name: "jack" };
a5 = [1, 2, 3, 4, 5];
a5 = function () { };
a5 = new String("123");
class Person {
}
a5 = new Person();
// 以下代码, 都是把 原始类型 赋值给 a5, 都飘红
// a5 = 1;
// a5 = true;
// a5 = "hi";
// a5 = null; // 严格模式下 会报错, -> "strictNullChecks": true
// a5 = undefined; // 严格模式下 会报错, -> "strictNullChecks": true
let b5; // b5 能存储的类型是 可以调用到 Object 方法的类型
// 除了 null 和 undefined, 都可以存, 但是范围太大了, 实际开发不用
// 能顺着原型链找到 Object
b5 = {};
b5 = { name: "jack" };
b5 = [1, 2, 3, 4, 5];
b5 = function () { };
b5 = new String("123");
class Person2 {
}
b5 = new Person2();
// 这些不会报错, 大 Object 比 object 更加宽泛
// 会自动装箱, 顺着原型链找到 Object
b5 = 1;
b5 = true;
b5 = "hi";
// 顺着原型链 也找不到 Object, 所以报错
// b5 = null; // 严格模式下 会报错, -> "strictNullChecks": true
// b5 = undefined; // 严格模式下 会报错, -> "strictNullChecks": true
// *** 声明对象类型
// [key: string]: any, 索引签名
let person;
person = { name: "jack", age: 19 };
person = { name: "tom" };
// [key: string]: any 因为有 索引签名, 所以可以追加 gender, 可以无限追加,
// 允许定义对象可以具有 任意数量的属性
let p3 = { name: "vincent", age: 20, gender: "男" };
// *** 声明函数类型
let count;
// count 这个变量, 以后只能赋值为一个函数, 接受两个 number 返回一个 number
// count = function (a:number, b:number): number {
//   return a + b
// }
//  ^^^ 可以不用这么麻烦
count = function (x, y) {
    return x + y;
};
// *** 声明数组类型
let arr;
arr = ["a", "b"];
let arr2; // 泛型
arr2 = [1, 2, 34];
// ==========================
// #####  type6: tuple  #####
// ==========================
// 第一个元素必须是 string 类型, 第二个元素必须是 number 类型
let arr61;
arr61 = ["hello", 2];
// arr61 = ["hello", 2, false]
// 第一个元素必须是 number 类型, 第二个元素是可选的, 如果存在, 必须是 boolean 类型
let arr62;
arr62 = [1, false];
arr62 = [1];
// arr62 = [1, 2];
// 第一个元素必须是 number 类型, 后面的元素可以是任意数量的 string 类型
let arr63;
arr63 = [100, "hello"];
arr63 = [100, "hello", "world"];
arr63 = [100];
// ==========================
// #####  type7: enum   #####
// ==========================
// 根据 调用 walk 时传入的不同参数, 执行不同的逻辑
// 存在的问题是 调用 walk 时, 传参时没有任何提示功能, 编码的时候容易写错字符串内容
// 而且用于判断逻辑的 up down left right 是连续且相关的一组值, 所以这种时候就很适合用 枚举 enum
function walk(str) {
    if (str === "up") {
        console.log("向[上]走");
    }
    else if (str === "down") {
        console.log("向[下]走");
    }
    else if (str === "left") {
        console.log("向[左]走");
    }
    else if (str === "right") {
        console.log("向[右]走");
    }
    else {
        console.log("未知方向");
    }
}
walk("up");
walk("down");
walk("left");
walk("right");
walk("test"); // 这个也不报错, 因为只要求 string
// 这非常不好
// 1. 数字枚举, 枚举首字母 通常用大写
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction);
// {0: 'Up', 1: 'Down', 2: 'Left', 3: 'Right', Up: 0, Down: 1, Left: 2, Right: 3}
// 反向映射
console.log(Direction.Up);
console.log(Direction[0]);
function walk2(str) {
    if (str === Direction.Up) {
        console.log("向[上]走");
    }
    else if (str === Direction.Down) {
        console.log("向[下]走");
    }
    else if (str === Direction.Left) {
        console.log("向[左]走");
    }
    else if (str === Direction.Right) {
        console.log("向[右]走");
    }
    else {
        console.log("未知方向");
    }
    // console.log(str);
}
// walk2("up"); // Argument of type '"up"' is not assignable to parameter of type 'Direction'.
// walk2("Up"); // Argument of type '"Up"' is not assignable to parameter of type 'Direction'.
walk2(Direction.Up);
// Direction.Up = 99;  常量不能修改
// 2. 字符串枚举
// 区别就是把原来的递增, 改成字符串值, 但是会丢失反向映射
var DirectionStr;
(function (DirectionStr) {
    DirectionStr["Up"] = "up";
    DirectionStr["Down"] = "down";
    DirectionStr["Left"] = "left";
    DirectionStr["Right"] = "right";
})(DirectionStr || (DirectionStr = {}));
console.log(DirectionStr);
console.log("down" /* DirectionConst.Down */);
let a8;
a8 = 100;
function printStatus(data) {
    console.log(data);
}
printStatus(404);
printStatus("404");
function printGender(input) {
    console.log(input);
}
// printGender("a");  // 报错 Argument of type '"a"' is not assignable to parameter of type 'Gender'.
printGender("男");
const house = {
    height: 100,
    width: 100,
    num: 3,
    cell: 4,
    room: "700",
};
// 特殊情况
// 代码 1, 正常代码
function demo8() {
    // 返回 undefined 合法
    return undefined;
    // 以下返回均不合法
    // return 100;
    // return false;
    // return null;
    // return [];
}
demo8();
// let LogFunc: () => void; 和上面一样
// LogFunc = function() {} 这个报错, 因为 LogFunc 用的 type, 不是 let, 不是变量, 是一个类型
const f81 = function () {
    // return undefined;  // 合法
    return 999; // 这里虽然不是 void, 但它不报错, 不管是啥都可以 void 在这不起作用
}; // 这里是把 type 先定义, 然后赋给函数, 不起作用
const f2 = () => 666;
const f3 = function () { };
// function LogFunc2(): void {
//   return 999;
// }  这里会飘红, 这里是在函数定义时就写了限制, 起作用了
let x8 = f2();
console.log(x8); // 666
// if(x8) {
//   // 这里飘红, 因为 x8 是 f2 函数的执行结果, f2 的类型是 LogFunc
//   // LogFunc 的返回值应该是 void, 不应该依赖 void 做任何操作
//   // An expression of type 'void' cannot be tested for truthiness.ts(1345)
// }
// 以上的目的是 为了以下代码城里
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));
// 写成箭头函数, 返回值没有{} 只有一行时, 默认返回那一行的值, push 返回一个数字, 但是 forEach 方法期望 回调的返回类型是 void,
// 为了让这个可以运行, 所以有了这个宽松的特殊情况
