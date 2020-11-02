export function createIO({ input }) {
    let i = 0;
    return {
      getChar() {
        const char = input[i];
        if (char) {
          i++;
          return char.charCodeAt(0);
        } else {
          return 0;
        }
      },
      putChar(char) {
        console.log(String.fromCharCode(char));
      }
    };
  }