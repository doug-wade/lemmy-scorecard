import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

const decoder = new TextDecoder()

const execBuildCommand = async (cmd: string, args: string[] = []) => {
  const command = new Deno.Command(cmd, { args });
  
  const { code, stdout, stderr } = await command.output();
  
  if (code === 0) {
    console.log(decoder.decode(stdout));
  } else {
    console.error(decoder.decode(stderr));
  }
}

await emptyDir("./npm");

await build({
  entryPoints: [{
    kind: "bin",
    name: "lemmyscorecard",
    path: "./main.ts",
  }],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "lemmyscorecard",
    version: Deno.args[0],
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
  importMap: "deno.jsonc",
  mappings: {
    "npm:/lemmy-js-client/": {
      name: "lemmy-js-client",
      version: "^0.18.0",
    },
  },
  test: false,
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});

Deno.chdir("./npm");
await execBuildCommand('npm', ['publish', Deno.args[1]]);
