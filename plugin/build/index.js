"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const withAndroidPlugin_1 = __importDefault(require("./withAndroidPlugin"));
const withIosPlugin_1 = __importDefault(require("./withIosPlugin"));
const withPlugin = config => {
    config = (0, withAndroidPlugin_1.default)(config);
    return (0, withIosPlugin_1.default)(config);
};
exports.default = withPlugin;
