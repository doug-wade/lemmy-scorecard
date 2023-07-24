Deno.bench(async function basicExample() {
  await new Deno.Command(Deno.execPath(), {
    args: ["task", "example", "-v"],
  }).output();
});

Deno.bench(async function help() {
  await new Deno.Command(Deno.execPath(), {
    args: ["task", "example", "-h"],
  }).output();
});

Deno.bench(async function version() {
  await new Deno.Command(Deno.execPath(), {
    args: ["task", "example", "-u", "CombatWombatEsq", "-i", "lemmy.world"],
  }).output();
});
