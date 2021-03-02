# Versions

This warning can occure for a few different reasons. 

First, it may indicate, that the used npm version is older than the npm version that node comes with. Have a look at [https://nodejs.org/en/download/releases](https://nodejs.org/en/download/releases) to see, which npm version comes with which Node version.

Then check your installed versions using the following commands.

- `npm --version`
- `node -version`

If your npm version is too old, you can update it with `npm install -g npm@latest`.

Second, if you have a `.node-version` file in your project, the warning may indicate that your installed node version does not match the one defined in your `.node-version` file.

And lastly, if you have provided some arguments to the `--version` flag it means, that those version requirements are not met.

For example `--versions 'react=17.0.0'` needs a React Version that starts with 17.
