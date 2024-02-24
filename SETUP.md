# How vite_vue3_boilerplate Repo Environment was Set Up

## Setting up Vite Vue3 Project

```
[09:42 PM | vite_vue3_boilerplate] $ npm create vite@latest
Need to install the following packages:
create-vite@5.2.1
Ok to proceed? (y) y
✔ Project name: … vite_vue3_boilerplate
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript

Scaffolding project in /home/csherman2828/projects/vite_vue3_boilerplate/vite_vue3_boilerplate...

Done. Now run:

  cd vite_vue3_boilerplate
  npm install
  npm run dev
```

## Moving Things Around

I was already in a directory called `vite_vue3_boilerplate`, but the process
made a nested directory called `vite_vue3_boilerplate` as well. So I just used
`mv` to remove the extra nested directory.

```
[09:42 PM | vite_vue3_boilerplate] $ ls
vite_vue3_boilerplate
[09:43 PM | vite_vue3_boilerplate] $ mv vite_vue3_boilerplate/* ./
[09:43 PM | vite_vue3_boilerplate] $ ls
README.md  index.html  package.json  public  vite_vue3_boilerplate  src  vite.config.js
[09:43 PM | vite_vue3_boilerplate] $ cd vite_vue3_boilerplate/
[09:43 PM | vite_vue3_boilerplate] $ ls
[09:43 PM | vite_vue3_boilerplate] $ cd ..
[09:43 PM | vite_vue3_boilerplate] $ rm -fr vite_vue3_boilerplate/
[09:43 PM | vite_vue3_boilerplate] $ ls
README.md  index.html  package.json  public  src  vite.config.js
```

## Setting Up Git

```
[09:43 PM | vite_vue3_boilerplate] $ git init
Initialized empty Git repository in /home/csherman2828/projects/vite_vue3_boilerplate/.git/
[09:43 PM | vite_vue3_boilerplate] $ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
        index.html
        node_modules/
        package-lock.json
        package.json
        public/
        src/
        vite.config.js

nothing added to commit but untracked files present (use "git add" to track)
[09:43 PM | vite_vue3_boilerplate] $ code .
[09:43 PM | vite_vue3_boilerplate] $ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md
        index.html
        package-lock.json
        package.json
        public/
        src/
        vite.config.js

nothing added to commit but untracked files present (use "git add" to track)
[09:44 PM | vite_vue3_boilerplate] $ git add .
[09:44 PM | vite_vue3_boilerplate] $ git commit -m "init vite vue3 project"
[main (root-commit) 6337ba5] init vite vue3 project
 12 files changed, 1131 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 index.html
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 public/vite.svg
 create mode 100644 src/App.vue
 create mode 100644 src/assets/vue.svg
 create mode 100644 src/components/HelloWorld.vue
 create mode 100644 src/main.js
 create mode 100644 src/style.css
 create mode 100644 vite.config.js
```

## Setting Up Formatter - Prettier

A formatter enforces format rules, mostly having to do with whitespace and
container characters ("()", "[]", etc.). It keeps code style consistent and has
nothing to say about the semantics of a program (see ESLint setup for more).

```
[09:50 PM | vite_vue3_boilerplate] $ npm i -D prettier

added 1 package, and audited 30 packages in 496ms

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Then I added two files - `.prettierignore` and `.prettierrc.json`.

I also added a script to the `package.json` for convenience.

```
{
  "scripts": {
    "other:script": "some command",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Setting Up Linter - ESLint

A linter catches semantic mistakes in programming automatically. It does not
enforce format. A linter and a formatter have distinct jobs. See more here:

[Prettier vs. Linters](https://prettier.io/docs/en/comparison)

First, I ran this convenient script to set up ESLint:

```
[09:57 PM | vite_vue3_boilerplate] $ npm init @eslint/config
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest eslint@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
Installing eslint-plugin-vue@latest, eslint@latest

added 111 packages, and audited 141 packages in 3s

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.cjs file in /home/csherman2828/projects/vite_vue3_boilerplate
```

To make ESLint and Prettier play nice, it is
[recommended](https://prettier.io/docs/en/install.html#eslint-and-other-linters)
to include `eslint-config-prettier` and add `prettier` to the `extends` property
of the `.eslintrc.cjs` file. So I did that.

Finally, for more convenience, I added linting scripts to `package.json`.

```
{
  "scripts": {
    "other:script": "some command",
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  }
}
```

## Adding Pre-Commit Hooks

```
[10:18 PM | vite_vue3_boilerplate] $ npm install -D husky lint-staged

added 55 packages, and audited 197 packages in 1s

60 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[10:19 PM | vite_vue3_boilerplate] $ npx husky init
```

I added a `lint-staged` script to `package.json`:

```
{
  "scripts": {
    "other:script": "some command",
    "lint-staged": "lint-staged"
  }
}
```

I added a `.lintstagedrc.cjs` for `lint-staged` configuration.

```
module.exports = {
  '**/*.{js,cjs}': ['eslint --fix', 'prettier --write --ignore-unknown'],
  '**.*': 'prettier --write --ignore-unknown',
};
```

This will lint all JavaScript files with ESLint **FIRST** then format JavaScript
file with Prettier **SECOND** per Prettier
[recommendations](https://prettier.io/docs/en/install.html#git-hooks).

For all other files that Prettier knows how to format, it will format those.

Finally, I added `npm run lint-staged` to the `.husky/pre-commit` file. Now,
whenever I commit, this happens:

```
[10:27 PM | vite_vue3_boilerplate] $ git commit -m "add formatter scripts to package.json"

> vite_vue3_boilerplate@0.0.0 lint-staged
> lint-staged

✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
[main 6dc650b] add formatter scripts to package.json
 1 file changed, 2 insertions(+)
```
