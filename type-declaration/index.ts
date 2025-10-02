let a: string;
let b: number;
let c: boolean;

// a = 9;  Type 'number' is not assignable to type 'string'.ts(2322)
a = "hello";
b = -99;
c = true;

console.log(a, b, c);

function count(x: number, y: number): number {
  // return x + y + "hello";  Type 'string' is not assignable to type 'number'.ts(2322)
  return x + y;
}

let result = count(1, 2);
console.log(result);

// count(1);  Expected 2 arguments, but got 1.ts(2554)
// index.ts(13, 27): An argument for 'y' was not provided.

// count(1,2,3);  Expected 2 arguments, but got 3.ts(2554)

let hello: "hello";
// hello = "hi";  Type '"hi"' is not assignable to type '"hello"'.ts(2322)
// : "hello" -> 字面量类型, 这样之后 hello 只能装 "hello"
