import { Stack } from "./stack.ts";

export function node(type: string, pos: number[], data?: any) {
  return { type, data, pos: [...pos] };
}

export function parse(code: any) {
  const stack = new Stack();

  stack.push([]); // top-level sequence

  const pos = [1, 1];

  for (const c of code) {
    if (c === ">" || c === "<") {
      stack.top.push(node("Pointer", pos, c === ">" ? 1 : -1));
    } else if (c === "+" || c === "-") {
      stack.top.push(node("Value", pos, c === "+" ? 1 : -1));
    } else if (c === ".") {
      stack.top.push(node("PutChar", pos));
    } else if (c === ",") {
      stack.top.push(node("GetChar", pos));
    } else if (c === "[") {
      stack.push([]);
    } else if (c === "]") {
      const data = stack.pop();
      stack.top.push(node("Loop", pos, data));
    } else {
      // TODO(littledivy): optionally, preserve comments in AST?
    }

    if (c === "\n") {
      pos[0]++;
      pos[1] = 1;
    } else {
      pos[1]++;
    }
  }

  return node("Program", [1, 1], stack.top);
}
