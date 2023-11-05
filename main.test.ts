import main from "./main.ts";
import { assertEquals } from "https://deno.land/std@0.205.0/assert/mod.ts";
import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.205.0/testing/mock.ts";
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.205.0/testing/bdd.ts";

import type { Spy } from "https://deno.land/std@0.205.0/testing/mock.ts";

let logSpy: Spy;
describe("main", () => {
  beforeEach(() => {
    logSpy = spy(console, "log");
  });

  afterEach(() => {
    logSpy.restore();
  });

  it("outputs the version", async () => {
    await main(["-v"]);

    assertSpyCall(logSpy, 0, {
      args: ["lemmy-scorecard v0.0.4"],
      returned: undefined,
    });
  });

  it("outputs a help message", async () => {
    await main(["-h"]);

    assertSpyCall(logSpy, 0, {
      args: [
        "usage: deno run lemmy-scorecard --username <my username> --instance <my instance url>",
      ],
      returned: undefined,
    });
  });

  it("outputs an error message when called with no args", async () => {
    let error;
    try {
      await main([]);
    } catch (e) {
      error = e;
    }

    assertEquals(error.message, "username is required");
  });
});
