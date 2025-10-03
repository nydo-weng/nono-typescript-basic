// 接口定义不写等号
// 接口定义类
interface PersonInterface {
  name: string;
  age: number;
  speak(n: number): void;
}

class Person implements PersonInterface {
  constructor(public name: string, public age: number) {}
  speak(n: number): void {
    for (let index = 0; index < n; index++) {
      console.log(`我叫: ${this.name}, 今年${this.age}岁了`);
    }
  }
}

const p = new Person("tom", 18);
p.speak(3);

// 接口定义对象结构
interface UserInterface {
  name: string;
  readonly gender: string; // 只读属性
  age?: number; // 可选属性
  run: (n: number) => void;
}

// 和类的区别, 类要用 implements, 然后去实现
// ts 里的接口完全可以当类型去用
const user: UserInterface = {
  name: "jack",
  gender: "male",
  age: 18,
  run(n) {
    console.log(`runs ${n} meters already`);
  },
};

user.run(3);

// 接口定义函数结构
interface CountInterface {
  // 这是个函数的类型声明, 并且没有赋给一个 variable, 索引这是一个函数结构的定义接口
  (a: number, b: number): number;
}

const count: CountInterface = (x, y) => {
  return x + y;
};

// 接口之间的继承
interface FatherInterface {
  name: string;
  age: number;
}

interface SonInterface extends FatherInterface {
  grade: string;
}

const son: SonInterface = {
  name: "this is son",
  age: 3,
  grade: "大一",
};

console.log(son.name);
console.log(son.age);
console.log(son.grade);

// 接口自动合并
interface MergeInterface {
  name: string;
  age: number;
}

interface MergeInterface {
  gender: string;
  // name: number;  这样有冲突就不行
  name: string; // 再写一遍就没关系
}
// ^^^ 不报错, 可以重复定义, 但是这不叫重复定义, 叫做接口的可合并性
const merge: MergeInterface = {
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
