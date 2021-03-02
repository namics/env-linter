# Save Exact

This warning means, that you don't have a `.npmrc` or it does not contain `save-exact=true`.

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
