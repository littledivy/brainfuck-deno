# `brainf**k-deno`

The brainf**k parser & interpreter in Deno.

## Usage

```typescript
import { interpret } from "https://deno.land/x/brainfuck/interpret.ts";

// Brainf**k code to print a Christmas tree.
const xmas_tree = `
>>>--------<,[<[>++++++++++<-]>>[<------>>-<+],]++>>++<--[<++[+>]>+<<+++<]<
        <[>>+[[>>+<<-]<<]>>>>[[<<+>.>-]>>]<.<<<+<<-]>>[<.>--]>.>>.
`;

// Seed it with an input
interpret(xmas_tree, { input: "15" });
//           *
//          ***
//         *****
//        *******
//       *********
//      ***********
//     *************
//    ***************
//   *****************
//  *******************
//           *

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)