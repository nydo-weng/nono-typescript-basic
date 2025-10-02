class Package {
    // 构造方法
    constructor(weight) {
        this.weight = weight;
    }
    // 具体方法
    printPackage() {
        console.log(`包裹重量为: ${this.weight}kg, 运费为: ${this.calculate()}元`);
    }
}
class StandardPackage extends Package {
    // weight 可以不写修饰符, 因为父类给了,
    // 但是 unitPrice 如果要用简写形式, 一定要加修饰符
    constructor(weight, unitPrice) {
        super(weight);
        this.unitPrice = unitPrice;
    }
    // 抽象方法的具体实现
    calculate() {
        return this.weight * this.unitPrice;
    }
}
const s1 = new StandardPackage(10, 5);
s1.printPackage();
// const  p1 = new Package()  // 报错, 抽象类不可以实例化
