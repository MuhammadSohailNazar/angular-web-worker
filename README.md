# AngularWebWorker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Generate web-worker 

Run this command `ng generate web-worker app`
Note: You can now create your own worker files as well if need but remember all worker file names should be suffixed with .worker.ts

## what is not available inside webwork

1. window object
2. document objec

## what is available inside webwork

1. navigator object
2. location object (read-only)
3. XMLHttpRequest
4. setTimeout(), clearTimeout(), setInterval(), clearInterval()
5. The atob() and btoa() functions
Web Workers can also access
6. Cache object


## Article Link
https://blog.logrocket.com/how-to-execute-a-function-with-a-web-worker-on-a-different-thread-in-angular/