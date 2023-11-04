import main from './main.ts';
import { assertEquals } from "testing/asserts.ts";
import { assertSpyCall, spy } from 'testing/mock.ts';
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "testing/bdd.ts";

import type { Spy } from 'testing/mock.ts';

let logSpy: Spy;
describe('main', () => {
  beforeEach(() => {
    logSpy = spy(console, "log");
  });

  afterEach(() => {
    logSpy.restore();
  });

  it('outputs the version', async () => {
    await main(['-v']);

    assertSpyCall(logSpy, 0, { 
      args: ["lemmy-scorecard v0.0.4"],
      returned: undefined,
    });
  });

  it('outputs a help message', async () => {
    await main(['-h']);

    assertSpyCall(logSpy, 0, { 
      args: ["usage: deno run lemmy-scorecard --username <my username> --instance <my instance url>"],
      returned: undefined,
    });
  });

  it('outputs an error message when called with no args', async () => {
    let error;
    try {
      await main([]);
    } catch (e) {
      error = e;
    }
  
    assertEquals(error.message, 'username is required');
  })
});
