# Save Exact

This warning means, that you don't have a `.npmrc` file or it does not contain `save-exact=true`.

By default, `npm install` adds dependencies with a caret `^` before the version number.

```bash
"dependencies": {
    "react": "^17.0.1"
}
```

By using a `.npmrc` file with `save-exact=true`, npm adds dependencies with a fixed version to you `package.json`.

```bash
"dependencies": {
    "react": "17.0.1"
}
```

save-exact can be set in the `.npmrc` file on a project level or in your user directory (or both, project level takes precedence). It makes sense to add this file in the root project folder to ensure everybody working on a project uses exact versions.

To set save-exact globally (i.e. for all your projects) you can add it to your `.npmrc` in your user directory. You can do this by running `npm config set save-exact true`.
