import { assert } from "testing/asserts.ts";
import { parse } from "flags/mod.ts";

import { LemmyHttp } from "lemmy-js-client/";
import cliui from "cliui/deno.ts";

import type { PersonView } from "lemmy-js-client/";

export default async (args: string[]) => {
    const parsed = parse(args);
    const ui = cliui({ width: 120 });
  
    const getOptions = () => {
      return {
        username: parsed["username"] || parsed["u"],
        instance: parsed["instance"] || parsed["i"],
        help: parsed["help"] || parsed["h"],
        version: parsed["version"] || parsed["v"],
      };
    };
  
    const fetchDataForUser = async ({
      instance,
      username,
    }: {
      instance: string;
      username: string;
    }) => {
      const lemmy: LemmyHttp = new LemmyHttp(`https://${instance}`);
      const personDetails = await lemmy.getPersonDetails({ username: username });
  
      return { username: username, personView: personDetails.person_view };
    };
  
    const logScorecard = ({
      personView,
      username,
    }: {
      personView: PersonView;
      username: string;
    }) => {
      const { post_count, post_score, comment_count, comment_score } =
        personView.counts;
      ui.div(`Counts for ${username}`);
      ui.div(
        `\t count \t score \n` +
          `\t post \t ${post_count} \t ${post_score} \n` +
          `\t comment \t ${comment_count} \t ${comment_score} \n`
      );
  
      console.log(ui.toString());
    };
  
    const options = getOptions();
  
    if (options.help) {
      console.log(
        "usage: deno run lemmy-scorecard --username <my username> --instance <my instance url>"
      );
      return;
    }
  
    if (options.version) {
      console.log("lemmy-scorecard v0.0.4");
      return;
    }
  
    assert(!!options.username, "username is required");
    assert(!!options.instance, "instance is required");
  
    const scorecard = await fetchDataForUser(options);
  
    logScorecard(scorecard);
  }