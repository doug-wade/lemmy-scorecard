import { build, emptyDir } from "https://deno.land/x/dnt@0.38.1/mod.ts";

const version = Deno.args[0].startsWith("v")
  ? Deno.args[0].replace("v", "")
  : Deno.args[0];

await emptyDir("./npm");

await build({
  entryPoints: [{
    kind: "bin",
    name: "lemmyscorecard",
    path: "./mod.ts",
  }],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "lemmyscorecard",
    version,
    description: "Gets the total post and comment karma for a Lemmy user.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/doug-wade/lemmy-scorecard.git",
    },
    bugs: {
      url: "https://github.com/doug-wade/lemmy-scorecard/issues",
    },
  },
  mappings: {
    "npm:/lemmy-js-client/": {
      name: "lemmy-js-client",
      version: "^0.18.0",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});