"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const os_1 = require("os");
const path_1 = require("path");
const vscode = __importStar(require("vscode"));
const fs_1 = require("fs");
/**
 * Config class which handles the .pseudoconfig file in the home directory
 */
class Config {
    /** Stores the config file in JSON format */
    _config;
    /** Read-only access to the config file in JSON format */
    get config() {
        return this._config;
    }
    /**
     * Constructor for {@link Config}
     *
     * @param callback - The callback for whatever instantiated {@link Config} to continue in after the config file has been loaded
     */
    constructor(callback) {
        this._config = {};
        this.findConfigFile(callback);
    }
    /**
     * Finds the config file with the highest priority (currently only supports config file in home directory)
     *
     * @param callback - The callback for whatever instantiated {@link Config} to continue in after the config file has been loaded
     */
    findConfigFile(callback) {
        var homeDirectory = (0, os_1.homedir)();
        console.log(homeDirectory);
        var homeDirFile = (0, path_1.join)(homeDirectory, ".pseudoconfig");
        console.log("Home Dir File", homeDirFile);
        console.log(vscode.workspace.workspaceFolders);
        fs_1.promises.readFile(homeDirFile)
            .then(data => {
            this._config = JSON.parse(data.toString());
            callback();
        })
            .catch(() => {
            console.log("Pseudocode: Error loading .pseudoconfig file");
        });
    }
}
exports.Config = Config;
