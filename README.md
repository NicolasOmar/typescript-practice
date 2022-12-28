# Typescript Practice
Repository created to record my practice learning React with exercises based on the [Udemy Course](https://www.udemy.com/course/understanding-typescript) of [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/).

## Requirements
 - [Node](https://nodejs.org/en/download/) v16.13.2 or above

 ## Setup
After cloning the repo, go to the created folder and install the node packages.
```sh
git clone https://github.com/NicolasOmar/typescript-practice.git
cd typescript-practice
npm run setup-all
```
`setup-all` is the command to install all the projects, but if you want to do it one by one, you can change that last line for one of the following:
| App Setup | Command |
| ------ | ------ |
| All | `npm run setup-all` |
| Basics | `npm run setup-basics` |
| Configs | `npm run setup-configs` |
| Classes, Interfaces & Types | `npm run setup-classes` |
| Generics & Decorators | `npm run setup-generics` |
| Practice Demo #1 | `npm run setup-drag-and-drop` |
| Practice Demo #2 | `npm run setup-select-and-share` |
| React & Node | `npm run setup-react-and-node` |

## How to run it
To run any specific exercise, execute the following command in the project´s folder:
```sh
npm start
```

## Repo Structure & what i learned in each exercise
 - Basics (`1-basics` folder)
   - Create, code and compile a `.ts` file into javascript
   - Understanding of `Core Types` like `number`, `string`, `boolean`, `array` and `object`
   - Understanding of `Tuples`, `Enums`, `Union` and `Literal/Custom` Types
   - Understanding of `void`, `undefined`, `unknown` and `never` Types
 - Configs (`2-configs` folder)
   - Adding `watch mode` to mantain updated changes and check possible errors before hand
   - Create a typescript configuration file with `tsc --init` and tweak for a custom config
   - Understand how Typescript compiles ES6+ code (like `let/const`, `arrow functions`, `default function parameters`, `spread operator` and `destructuring`)
 - Classes, Interfaces & Types (`3-classes-interfaces-types` folder)
   - Basic understanding of `Classes` creation with its properties and methods
   - Know difference between a `public`, `private` and `protected` properties
   - Basic understanding of `class inheritance`
   - How to use `getters` and `setters`
   - How to use `static methods`
   - Basic understanding of `Interfaces` and its implementation on `Classes` and other `Interfaces`
   - Understanding and implementation of `Intersection Types`, `Type Guards`, `Discriminated Unions`, `Type Casting` and `Function Overloads`
 - Generics & Decorators (`4-generics-decorators` folder)
   - Basic understanding og `Generic Types`
   - How to use multiple generic types in a function
   - Understanding and implementation of `extends` and `keyof`
   - Understanding and implementation of utitlies like `Partial` and `Readonly`
   - Basic understanding of `Decorators`
   - How to implement an template creation and setting by using a `Decorator Factory`
   - Ways of implement decorators such as `Properties`, `Set`, `Methods` and `Parameters`
 - Practice Demo #1 (`5-drag-and-drop` folder)
   - Review of all concepts mentioned above
   - Understanding and implementation a Drag and Drop event (from one point to the other)
   - How to split code using `namespaces` and solve its possible problems with `ES6 modules`
   - Basic understanding and implementation of `Webpack` (configuration for development and production environments)
 - Practice Demo #2 (`6-select-and-share` folder)
   - Use Google [GeoCoding API](https://developers.google.com/maps/documentation/geocoding/overview) to get information from places
   - Use [Axios](https://www.npmjs.com/package/axios) to make API calls
   - How to use Javascript-based libraries in Typescript by using `@types/[LIBRARY_NAME]` (in this case, using [googlemaps types](https://www.npmjs.com/package/@types/google.maps))
 - React & Node (`7-react-and-node` folder)
   - How to create a React project with Typescript installed using [create-react-app](https://create-react-app.dev/docs/adding-typescript)
   - How to use React features such as `useState`, `functional components` and `props` with TS

## Version (currently ![Typescript practice version](https://img.shields.io/github/package-json/v/nicolasomar/typescript-practice?color=success&label=%20&style=flat-square))
| Number | Meaning |
| ------ | ------ |
| `X.0.0` | Course hasn't been completed |
| `0.X.0` | How many assignments/examples I have completed |

## Other Practice Repos
| Node | Angular | GraphQL | React |
| :---: | :---: | :---: | :---: |
| [<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" title="Node Practice Repo" alt="Node Practice Repo" width="48px">](https://github.com/NicolasOmar/node-practice) | [<img src="https://cdn.svgporn.com/logos/angular-icon.svg" title="Angular Practice Repo" alt="Angular Practice Repo" width="48px">](https://github.com/NicolasOmar/angular-practice) | [<img src="https://cdn.svgporn.com/logos/graphql.svg" title="GraphQL Practice Repo" alt="GraphQL Practice Repo" width="48px">](https://github.com/NicolasOmar/graphql-practice) | [<img src="https://cdn.svgporn.com/logos/react.svg" title="React Practice Repo" alt="React Practice Repo" width="48px">](https://github.com/NicolasOmar/react-practice)