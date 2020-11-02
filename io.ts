export interface Lib {
  input?: string;
}

export function createIO({ input }: Lib) {
    let i = 0;
    return {
      getChar() {
        const char = input ? input[i] : null;
        if (char) {
          i++;
          return char.charCodeAt(0);
        } else {
          return 0;
        }
      },
      putChar(char: number) {
        // @ts-ignore
        Deno.core.print(String.fromCharCode(char));
      }
    };
  }