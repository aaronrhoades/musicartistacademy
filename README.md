# MaaPublic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# MAA Notes

This is an education portal for students to log in and view courses. The website will be hosted on [www.musicartistacademy.com](https://www.musicartistacademy.com).

## Development Setup
Setup Instructions. The goal is to run `npm start` from home directory using nodemon to run both FE and BE at once. But first:

- From root directory and run `npm install`. This will take care of api `node_modules` as well.
- For JWT generate RSA key here: [Git Gist - Generate RSA Key](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9). Place keys in `api/config/keys`
- Edit a copy of `api/config/config-example.json` as `config.json`
- Now run `npm start` from app root directory