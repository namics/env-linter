# Contributing

You want to contribute something to the env-linter? That's awesome! 😍

There are just a few things you should know before you get cracking. 🤓
First of all, try to keep the documentary (README.md, CONTRIBUTE.md) up to date and use emojis extensively. 🤘 BTW: We should consider switching to [emoji-log](https://github.com/ahmadawais/Emoji-Log). 😜

## Commits

TLDR: use `npm run cz` to commit and you should be fine.

If you are working on a new feature or a bugfix use a branch `feat/new-feature` / `fix/broken-stuff` to develop.

We are using [commitlint](https://github.com/conventional-changelog/commitlint) to automatically generate the changelog and [standard-version](https://www.npmjs.com/package/standard-version) to release. Therefore it is important that you choose the right type for your commits (e.g. a `fix` commit will only increase the patch version number whereas a commit with type `feat` increases to the next minor version).

## Release

-   Before you start, make sure you are on the develop branch and you have the latest changes.
-   Run `npm run lint` to make sure there are no linting issues.
-   Run `npm run test` to make sure all tests pass and the coverage is fine. ✅
-   Run `npm run build` to create a build for a smoke-test 💨 (check out the next section for more detail)
-   Run `npm run release` and wait ⏰ for the magic 🎩 to happen.
    -   The version will automatically be bumped and the CHANGELOG.md should automatically be generated.
    -   I believe to remember that it automatically creates a release commit but without the updates in the CHANGELOG.md. I think I usually added that with an additional commit or you can git reset the local commit and add the changelog to the release commit. Feel free to check if this process can be optimized and then go ahead and delete this section.
    -   Maybe quickly read through the CHANGELOG.md to make sure it is somewhat understandable.

**NOTE**: I have a hunch that as long as env-linter is not on a stable version (aka 1.0.0), we need to manually decide on the version bump. You can do this by running `npm run release -- --release-as patch` or `npm run release -- --release-as minor`. For me, it sometimes picked the wrong version otherwise.

## Smoke test 💨 with demo project

It is a good practice to do a quick smoke test of the compiled env-linter before releasing.
We have a very small [env-linter-demo](https://github.com/merkle-open/env-linter-demo) project which uses the locally built env-linter.
A short smoke-test could look like this:

1. Run `npm run build` in your env-linter project
2. Run `npm start` in your env-linter-demo project to see if the checks pass
3. Change something in the env-linter-demo project (e.g. use a approximate version for a dependency) and see if the checks fail

If you have an idea on how to automate this process, feel free to bring in your ideas!

## Updates & Misc

We are using a couple of dependencies and it makes sense to keep those up to date.

-   Run `npm run update-dependencies` to update all of them in one go. Make sure to run the tests and a smoke-test afterwards.
-   Keep the node-version up to date as well (in `.node-version`, `.nvmrc` and in `.travis.yml` for the CI environment)
-   Do not try to use env-linter within the env-linter, it does not work ❌😅. I once released a version of the env-linter trying that, it didn't end well. It is probably possible somehow but if you try it, do me favor and create a beta-release and test it first (not like I did it 🤦‍♂️).
