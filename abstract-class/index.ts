abstract class Package {
  // 构造方法
  constructor(public weight: number) {}

  // 抽象方法
  // abstract calculate(x: number, y: string): number; // 不可以加 {}, 但是表明参数和返回值
  abstract calculate(): number; // 不可以加 {}, 但是表明参数和返回值

  // 具体方法
  printPackage() {
    console.log(`包裹重量为: ${this.weight}kg, 运费为: ${this.calculate()}元`);
  }
}

class StandardPackage extends Package {
  // weight 可以不写修饰符, 因为父类给了,
  // 但是 unitPrice 如果要用简写形式, 一定要加修饰符
  constructor(weight: number, public unitPrice: number) {
    super(weight);
  }
  // 抽象方法的具体实现
  calculate(): number {
    return this.weight * this.unitPrice;
  }
}

const s1 = new StandardPackage(10, 5);
s1.printPackage();

// const  p1 = new Package()  // 报错, 抽象类不可以实例化
