// 泛型函数
function logData(data) {
    console.log(data);
}
logData(100);
logData("hello");
// 泛型函数
function logData2(data1, data2) {
    1 % 2 ? console.log(data1) : console.log(data2);
    return 1 % 2 ? data1 : data2;
}
logData2(100, true);
logData2("hello", 3);
let p = {
    name: "tom",
    age: 18,
    extraInfo: 250,
};
let p2 = {
    name: "jack",
    age: 21,
    extraInfo: {
        title: "ceo",
        company: "apple",
    },
};
