node-certification
==================

SCND Strongloop Certification Exam work out

# Working with npm and node Modules

[Npm](http://en.wikipedia.org/wiki/Npm_(software)) is the official package manager for Node written in JavaScript. npm runs through the command line and manages dependencies for an application with package.json. 
It also allows users to install Node modules that are available on the npm registry. The exam will test your understanding of npm.

* [package.json](https://docs.npmjs.com/files/package.json)
* [How to find, install, update and publish packages](https://docs.npmjs.com/misc/developers)

## Content

* ./module_1/index.js & ./module_2/index.js

## Instructions

Specific guide for this section.

### Linking

Open a terminal and type as follows:

```bash
$ cd module_1
$ npm link
$ cd ../module_2
$ npm link module_1
```

or

```bash
$ cd module_2
$ npm link ../module_1
```

**module_1 will** be linked into your global node_modules (e.g.: */usr/local/lib/node_modules*) and then installed as
a local dependency into **module_2/node_modules/module_1**

### Running

```bash
$ cd module_2
$ node index
```

### Packing

Making a package (tarball) with **npm pack**:

```bash
$ cd module_1 // or module_2
$ npm pack
```

A new **module_1.tar.gz** will be added into module_1 folder, containing your package

## License
[Read the LICENSE file (MIT, anyway)](../../LICENSE)

## Reference
[http://strongloop.com/node-js/certification/scnd-study-guide/](http://strongloop.com/node-js/certification/scnd-study-guide/)
