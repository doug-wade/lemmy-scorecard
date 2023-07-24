import { assertEquals, assertMatch } from "testing/asserts.ts";

const runWithArgs = async (args: string[]) => {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["run", "--allow-read", "main.ts", ...args],
  });

  const { code, stdout, stderr } = await command.output();

  const textDecoder = new TextDecoder();
  return {
    code,
    stderr: textDecoder.decode(stderr),
    stdout: textDecoder.decode(stdout),
  };
};

Deno.test(async function version() {
  const { code, stdout, stderr } = await runWithArgs(["-v"]);

  console.log(stdout, stderr);

  assertEquals(code, 0);
  assertMatch(stdout, /v\d+\.\d+\.\d+/);
  assertEquals(stderr, "");
});

Deno.test(async function help() {
  const { code, stdout, stderr } = await runWithArgs(["-h"]);

  assertEquals(code, 0);
  assertMatch(stdout, /usage/);
  assertEquals(stderr, "");
});

Deno.test(async function noArgs() {
  const { code, stdout, stderr } = await runWithArgs([]);

  assertEquals(code, 1);
  assertMatch(stderr, /error/);
  assertEquals(stdout, "");
});
