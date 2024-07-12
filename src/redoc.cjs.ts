import { Redoc } from "./redoc";

module.exports = Redoc;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Redoc = Redoc;

// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = Redoc;