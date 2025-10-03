// 如果三方库用的 JS 写的, 这里在 demo.js 模拟, 导出了 add(), mul()

import { add, mul } from "./demo.js";
// Could not find a declaration file for module './demo.js'. '/Users/nydo/Desktop/github/nono-typescript-basic/.d.ts-demo/demo.js' implicitly has an 'any' type.ts(7016)

// 这里写了 import, 要改 html,
// <script type="text/javascript" src="./index.js"></script>
//            ^^^
// type 要改成 module

console.log(add(1, 5));
console.log(mul(2, 3));
