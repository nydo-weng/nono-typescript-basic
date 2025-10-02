// 类
// class Person {
//   constructor(name: string, age: number) {
//     this.name = name; // 警告: Property 'name' does not exist on type 'Person'.
//     this.age = age;
//   }
// }
class Person {
    constructor(name, age) {
        this.name = name; // 警告: Property 'name' does not exist on type 'Person'.
        this.age = age;
    }
    speak() {
        console.log(`我叫: ${this.name}, 今年${this.age}岁了`);
    }
}
const p1 = new Person("张三", 18);
console.log(p1);
p1.speak();
// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    study() {
        console.log(`${this.name} 正在努力学习中...`);
    }
    // 复写, 真想复写, 标准应该写 override, 这种情况如果打错了, 就会提示
    // override 是 TS 给的关键字, 显式标记子类方法是覆盖父类方法
    speak() {
        console.log(`我是学生, 我叫: ${this.name}, 今年${this.age}岁了`);
    }
}
const s1 = new Student("李同学", 20, "大一");
console.log(s1);
s1.study();
s1.speak();
// ===================================
// =======      属性修饰符      =======
// ===================================
// public, 公开的, 可以被 类内部, 子类, 类外部 访问
// 不给显式加修饰符, 默认加 public
class Person2 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        // 在当前类内部访问 public 修饰的属性
        console.log("public 修饰符, 在父类" + this.name + this.age);
    }
}
class Student2 extends Person2 {
    study() {
        // 在子类内部访问 public 修饰的属性
        console.log("public 修饰符, 在子类" + this.name + this.age);
    }
}
const p2 = new Person2("public person", 11);
p2.speak();
const s2 = new Student2("public student", 12);
s2.speak();
// 在类外部访问
console.log(p2.name + "类外访问");
// --------- 属性简写 ---------------
class Person3 {
    // name: string;
    // age: number;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        // this.name = name; // 警告: Property 'name' does not exist on type 'Person'.
        // this.age = age;
    }
    speak() {
        console.log(`我叫: ${this.name}, 今年${this.age}岁了`);
    }
}
const p3 = new Person3("属性简写", 11);
p3.speak();
// protected, 受保护的, 可以被 类内部, 子类 访问
class Person4 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `我叫${this.name}, 年龄是: ${this.age}`;
    }
    introduce() {
        console.log(this.getDetails());
    }
}
const p4 = new Person4("tom", 18);
// p4.name;  // 这三行都报错, 因为受保护, 类外无法访问
// p4.age;
// p4.getDetails();
p4.introduce();
class Student4 extends Person4 {
    study() {
        console.log(this.getDetails()); // 子类访问 protected
        console.log(`${this.name} 正在努力学习`); // 子类访问 protected
    }
}
const s4 = new Student4("jack", 14);
s4.study();
// private, 私有的, 可以被 类内部访问
class Person5 {
    // 这种构造器的简写也是 TS 独有的 参数属性 语法
    constructor(name, age, id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }
    getPrivateInfo() {
        return `身份证号码为: ${this.id}`;
    }
    getInfo() {
        return `我叫${this.name}, 年龄是: ${this.age}`;
    }
    getFullInfo() {
        return this.getInfo() + ", " + this.getPrivateInfo();
    }
}
const p5 = new Person5("tprivate test", 99, "1231312312312312");
p5.name;
p5.age;
// p5.id;  // Property 'id' is private and only accessible within class 'Person5'.
// p5.getPrivateInfo();  // Property 'getPrivateInfo' is private and only accessible within class 'Person5'.
console.log(p5.getInfo());
console.log(p5.getFullInfo());
// readonly, 只读属性, 属性无法修改
class Person6 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const p6 = new Person6("july", 23);
// p6.age = 24  // 报错: Cannot assign to 'age' because it is a read-only property
