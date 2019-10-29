# Simple Firestore Admin

Simple Firestore Admin Console.
This is a simple management console that can be used on a local PC.

Since this use Firebase Admin SDK, you can use it just by preparing a private key file.
You can use it without changing any special security rules.

![DEMO](https://github.com/memory-lovers/simple-firestore-admin/blob/master/_img/demo_simple_firebase_admin.gif)

## Feature

1. select collection: `collection().where().orderBy()`
2. update document: `doc().update()`
3. delete document: `doc().delete()`

## How To Use

### Install

```sh
$ git clone git@github.com:memory-lovers/simple-firestore-admin.git
```

### Setup

1. create `.env` file

```sh
$ cd simple-firestore-admin

$ cp env_sample .evn
```

2. place your private key

please place your private key; ex `./credential.json`, same location as `.evn`

if you don't have private key, you can generate form Firebase Console.
Plese see [Firebase Official Document](https://firebase.google.com/docs/admin/setup#initialize_the_sdk).

3. setting path of your private key into `.env`

```diff
  # Copy this file with file name '.env'

  ## ex. CREDENTIAL_PATH=./credential.json
- CREDENTIAL_PATH=YOUR_CREDENTIAL_PATH
+ CREDENTIAL_PATH=./credential.json
```

### Lanch

install package and build, lanch server

```shell
$ npm install

$ npm run build

$ npm run start
```

you can access `http://localhost:3000`.

## Licence

[MIT](https://github.com/memory-lovers/simple-firestore-admin/blob/master/LICENCE)

## Author

Memory Lovers ([GitHub](https://github.com/memory-lovers) / [WebSite](https://memory-lovers.com/) / [Twitter](https://twitter.com/MemoryLoverz))
kira_puka ([Twitter](https://twitter.com/kira_puka))
