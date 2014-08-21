NPM Modules
===

## Linking

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

## Running

```bash
$ cd module_2
$ node index
```

## Packing

Making a package (tarball) with **npm pack**:

```bash
$ cd module_1 // or module_2
$ npm pack
```

A new **module_1.tar.gz** will be added into module_1 folder, containing your package