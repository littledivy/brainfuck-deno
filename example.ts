import { interpret } from "./interpret.ts";
import { createIO } from "./io.ts";

const hello_code = `
>++++++++[-<+++++++++>]<.>>+>-[+]++
>++>+++[>[->+++<<+++>]<<]>-----.>->
+++..+++.>-.<<+[>[+>+]>>]<---------
-----.>>.+++.------.--------.>+.>+.
`
interpret(hello_code, createIO({ input:null }) )
