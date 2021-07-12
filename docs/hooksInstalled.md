# Hooks Installed

This warning means, that Git Hooks are not installed.

Note: When updating from husky 4 to husky 7 you should no longer check for `--hooksInstalled` aka `-h` in the `postinstall` script in your `package.json` since husky has changed the way hooks are installed. For more information, consider this article on [why husky does not autoinstall anymore](https://blog.typicode.com/husky-git-hooks-javascript-config/).

## Husky 4
In your `.git` folder there is a folder called `hooks`.
Make sure that the following two files are in there:

- `commit-msg`
- `pre-commit`

## Husky 7
Hooks are stored in the `.husky` folder. Only the hooks that are installed will be added to this folder. env-linter will check if the `.husky` folder is present.

Check this article on [how to install hooks in husky 7](https://typicode.github.io/husky/#/?id=usage).
