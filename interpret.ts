import { parse } from "./bf.ts";
import { createIO, Lib } from "./io.ts";

const BUFFER_SIZE = 65536; // 32 * 64 KiB

interface Node {
  type: string;
  data: number | Node[];
}

class Interpreter {
  public lib: ReturnType<typeof createIO>;
  public buffer: Uint32Array;
  public pointer: number;
  constructor(lib: ReturnType<typeof createIO>) {
    this.lib = lib;

    this.buffer = new Uint32Array(BUFFER_SIZE);
    this.pointer = 0;
  }

  increaseBufferSize = () => {
    const buffer = new Uint32Array(this.buffer.byteLength + BUFFER_SIZE);
    buffer.set(this.buffer);
    this.buffer = buffer;
  };

  public run = (node: Node) => {
    if (Array.isArray(node.data)) {
      if (node.type === "Program") {
        return this.Program(node.data);
      } else if (node.type === "Loop") {
        return this.Loop(node.data);
      }
      return;
    }
    switch (node.type) {
      case "Pointer":
        return this.Pointer(node.data);
      case "Value":
        return this.Value(node.data);
      case "Zero":
        return this.Zero();
      case "GetChar":
        return this.GetChar();
      case "PutChar":
        return this.PutChar();
      default:
        console.log(node);
    }
  };

  Program = (nodes: Node[]) => {
    nodes.forEach(this.run);
  };

  Pointer = (diff: number) => {
    this.pointer += diff;

    while (this.pointer >= this.buffer.byteLength) {
      this.increaseBufferSize();
    }

    if (this.pointer < 0) {
      const n = this.pointer;
      const m = this.buffer.byteLength;
      this.pointer = ((n % m) + m) % m; // => Positive modulo
    }
  };

  Value = (diff: number) => {
    this.buffer[this.pointer] += diff;
  };

  Zero = () => {
    this.buffer[this.pointer] = 0;
  };

  Mul = (
    { pointerDiff, valueDiff }: { pointerDiff: number; valueDiff: number },
  ) => {
    this.buffer[this.pointer + pointerDiff] += this.buffer[this.pointer] *
      valueDiff;
  };

  GetChar = () => {
    this.buffer[this.pointer] = this.lib.getChar();
  };

  PutChar = () => {
    this.lib.putChar(this.buffer[this.pointer]);
  };

  Loop = (nodes: Node[]) => {
    if (!this.buffer[this.pointer]) return;

    let idx = 0;
    while (idx < nodes.length) {
      this.run(nodes[idx]);

      if (idx === nodes.length - 1 && this.buffer[this.pointer]) {
        idx = 0;
      } else {
        idx++;
      }
    }
  };
}

export function interpret(code: string, lib: Lib) {
  const program = parse(code);
  const io = createIO(lib);
  const interpreter = new Interpreter(io);
  interpreter.run(program);
}
