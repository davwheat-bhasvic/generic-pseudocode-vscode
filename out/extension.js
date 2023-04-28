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
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const Config_1 = require("./Config");
const DocumentSemanticTokensProvider_1 = require("./DocumentSemanticTokensProvider");
const tokenTypes_1 = require("./tokenTypes");
/** Entry point for the extension which runs when a file with the language
 * type "pseudocode" is opened
 */
function activate(context) {
    const legend = new vscode.SemanticTokensLegend(tokenTypes_1.tokenTypesLegend, tokenTypes_1.tokenModifiersLegend);
    var DocSemTokProv = new DocumentSemanticTokensProvider_1.DocumentSemanticTokensProvider();
    var conf = new Config_1.Config(() => {
        if (conf.config.custom !== undefined)
            DocSemTokProv.index = conf.config.custom;
        context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: "pseudocode" }, DocSemTokProv, legend));
    });
}
exports.activate = activate;
