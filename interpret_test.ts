import { interpret } from "./interpret.ts";
import Fixtures from "./fixtures.ts";

for (const test of Fixtures) {
  Deno.test({
    name: test.name,
    fn: () => {
      interpret(test.code, test.lib);
    },
  });
}
