# Angular Tests With Jest
![check-code-coverage](https://img.shields.io/badge/code--coverage-100%25-blue)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Authors
[Rodrigo da Silva Luz](https://github.com/rodrigodasilvaluz)

## Contact

<div>
  <a href="https://www.linkedin.com/in/rodrigo-da-silva-luz-b2a88555" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
</div>

## Project description

This project was created as an example of tests with jest

## Jest framework setings

*Step 1:* Uninstall all karma jasmine packages
```bash
npm uninstall karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-coverage
```

*Step 2:* Update test object from angular.json
```json
        "test": {
          "builder": "@angular-builders/jest:run",
          "configurations": {
            "ci": {
              "watch": false,
              "ci": true,
              "coverage": true,
              "silent": true
            }
          }
        },
```

*Step 3:* Delete karma.conf.js file and test.js file

*Step 4:* Install jest and angular testing in dev dependencies
```bash
npm install jest jest-preset-angular @types/jest @angular-builders/jest ts-jest @testing-library/angular --save-dev
```

*Step 5:* Create setup.jest.ts file
```ts
import 'jest-preset-angular';

const storageMock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: any) => {
      return '';
    },
  }),
});

Object.defineProperty(window, 'matchMedia', {
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null as any,
    addListener: () => {},
    removeListener: () => {},
  }),
});
```

*Step 6:* Create jest.config.js file
```ts
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  coverageDirectory: 'reports',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: {
        ignoreCodes: ['TS151001'],
      }
    },
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
};

```

*Step 7:* Update tsconfig.spec.json file
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "allowJs": true,
    "types": [
      "jest", // <--
      "node"
    ]
  },
  "files": [
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.mock.ts",
    "src/**/*.d.ts"
  ]
}
```

*Step 8:* Add scripts in package.json to run JEST
```json
  "scripts": {
    "ng": "ng",
    "build": "ng build",
    "start": "ng serve",
    "test": "ng test",
    "test:watch": "ng test --watch",
    "test:coverage": "ng test --coverage",
    ...
  },
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

Run `npm run test:watch` to run unit tests in real time.

Run `npm run test:coverage` to run the tests and view the coverage percentage

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
