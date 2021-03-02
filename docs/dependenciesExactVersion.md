# DependenciesExactVersion

This warning means, that in your `package.json` you have at least one dependency without a fixed version. Have a look at the `dependencies` and `devDependencies` in your `package.json`.

```bash
"dependencies": {
    "axios": "^0.18.0"
}, 
"devDependencies": {
    "chalk": "~2.4.2"
}
```

The versions should just be numbers i.e. `0.18.0`  and not `^0.18.0` to make sure, that this exact version will be installed. When a version starts with a `^` or `~` it is not fixed to that exact version.

For example `^2.3.4` means, that the newest version between 2.3.4 and <3.0.0. will be used. And `~1.2.3` will use releases between 1.2.3 and <1.3.0.
