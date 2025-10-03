class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak(n) {
        for (let index = 0; index < n; index++) {
            console.log(`我叫: ${this.name}, 今年${this.age}岁了`);
        }
    }
}
const p = new Person("tom", 18);
p.speak(3);
// 和类的区别, 类要用 implements, 然后去实现
// ts 里的接口完全可以当类型去用
const user = {
    name: "jack",
    gender: "male",
    age: 18,
    run(n) {
        console.log(`runs ${n} meters already`);
    },
};
user.run(3);
const count = (x, y) => {
    return x + y;
};
const son = {
    name: "this is son",
    age: 3,
    grade: "大一",
};
console.log(son.name);
console.log(son.age);
console.log(son.grade);
// ^^^ 不报错, 可以重复定义, 但是这不叫重复定义, 叫做接口的可合并性
const merge = {
    name: "merge obj",
    age: 18,
    gender: "female",
};
console.log(merge.age);
console.log(merge.name);
console.log(merge.gender);
// ======================= interface 和 type 都可以用于定义 对象结构, 两者在许多场景中是可以互换的 =======================
// 不同点:
// 1. interface: 更专注于 对象 和 类 的结构, 支持继承, 合并
// 2. type: 可以定义 类型别名, 联合类型, 交叉类型, 但不支持继承和自动合并
// ====================== interface 和 抽象类 的区别  =========================================
// 相同点: 都用于定义一个类的格式(应该遵循的契约)
// 不相同:
// 1. 接口: 只能描述结构, 不能有任何实现代码, 一个类可以实现多个接口
// 2. 抽象类: 既可以包含抽象方法, 也可以包含具体方法, 一个类只能继承一个抽象类
