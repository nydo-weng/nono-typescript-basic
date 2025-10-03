// 泛型函数
function logData<T>(data: T) {
  console.log(data);
}

logData<number>(100);
logData<string>("hello");

// 泛型函数
function logData2<T, U>(data1: T, data2: U): T | U {
  1 % 2 ? console.log(data1) : console.log(data2);
  return 1 % 2 ? data1 : data2;
}

logData2<number, boolean>(100, true);
logData2<string, number>("hello", 3);

// 泛型接口
interface PersonInterface<T> {
  name: string;
  age: number;
  extraInfo: T;
}

let p: PersonInterface<250> = {
  name: "tom",
  age: 18,
  extraInfo: 250,
};

type JobInfo = {
  title: string;
  company: string;
};

let p2: PersonInterface<JobInfo> = {
  name: "jack",
  age: 21,
  extraInfo: {
    title: "ceo",
    company: "apple",
  },
};
