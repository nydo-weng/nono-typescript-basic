// 类的装饰器

// 这是一个装饰器
// 这个装饰函数会在 类 定义时 执行
function Demo(target: Function) {
  console.log(target); // 这个类打印了
}

// 这是一个类
@Demo // 等价于 调用了 Demo(Person)
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
