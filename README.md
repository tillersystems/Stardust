<h1 align="center">
  <img height="200" src="./logo.png" />
  <p align="center">Stardust</p>
</h1>

<p align="center">
  <a href="https://circleci.com/gh/tillersystems/Stardust/tree/master">
    <img src="https://circleci.com/gh/tillersystems/Stardust/tree/master.svg?style=shield&circle-token=b0f5e2b1a128b053d85347edb4e13cbb412bff13" alt="CircleCI Build Status" />
  </a>
  <a href="https://www.npmjs.com/@@tillersystems/stardust">
    <img src="https://badge.fury.io/js/%40tillersystems%2Fstardust.svg" alt="npm package" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

**This Repo contains all sources used to build a TILLER design system library.**

### Install

You can install Stardust using either of the methods below.

For YARN users:

```
  $ yarn add @tillersystems/stardust
```

For NPM users:

```
  $ npm install @tillersystems/stardust
```

### Explore

We have a few examples on Storybook, you can see them by running:

```
  $ yarn storybook

  // or

  $ npm run storybook
```

## Contribute

### Getting started

To install the project, you should follow the [Installation guide](https://github.com/tillersystems/Stardust/wiki/Installation-Guide).

After that, you should be able to start the application with:

```bash
yarn start
```

### Directory Structure

**TODO**

### Coding Style

#### ESLINT

To run [ESLint](http://eslint.org/) you could run

- `yarn lint`
- Use atom with this plugin : https://github.com/AtomLinter/linter-eslint. In settings make sure "Use global ESLint installation is **unchecked** to be sure that you are using project eslint configuration. Plus, don't hesitate to check fix errors on save !
- You can override airbnb rules, add plugins or settings by editting `.eslintrc` file.
- Discuss with team to improve/remove rules

Don't prefix your css rules (-webkit, -moz, ...). It will be done automatically.

### Testing

#### Unit Tests

The project uses [Jest](https://facebook.github.io/jest/) to run unit tests.

To run the tests in the project, just simply run:
```bash
yarn test
```

### Dependencies
Each dependency should be installed with `yarn add {dependency-name}` command.
Each dev dependency should be installed with `yarn add {dependency-name} -D` command.

---

Thanks
