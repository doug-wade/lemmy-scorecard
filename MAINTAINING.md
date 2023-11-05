# Maintaining

Thanks for helping out!

## Releasing a new version

You invoke the `npm-publish` task as follows

```script
deno task npm-publish <semver version> --otp=<one time password>
```

Then, go to github and create a new release. The new tag created as part of
creating a new release will publish to deno.land/x (docs:
https://docs.deno.com/runtime/manual/advanced/publishing/).
