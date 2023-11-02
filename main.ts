import { assert } from "testing/asserts.ts";
import { parse } from "flags/mod.ts";
import { LemmyHttp } from "lemmy-js-client/";
import cliui from "cliui/deno.ts";

import type { PersonView } from "lemmy-js-client/";

(async () => {
  const ui = cliui({ width: 120 });

  const getOptions = () => {
    const args = parse(Deno.args);
    return {
      username: args["username"] || args["u"],
      instance: args["instance"] || args["i"],
      help: args["help"] || args["h"],
      version: args["version"] || args["v"],
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

  if (import.meta.main) {
    const options = getOptions();

    if (options.help) {
      console.log(
        "usage: deno run lemmy-scorecard --username <my username> --instance <my instance url>"
      );
      Deno.exit(0);
    }

    if (options.version) {
      console.log("lemmy-scorecard v0.0.1");
      Deno.exit(0);
    }

    assert(!!options.username, "username is required");
    assert(!!options.instance, "instance is required");

    const scorecard = await fetchDataForUser(options);

    logScorecard(scorecard);
  }
})();