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
exports.CopyButton = CopyButton;
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const code_1 = require("@lexical/code");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const utils_1 = require("../../utils");
function CopyButton({ editor, getCodeDOMNode }) {
    const [isCopyCompleted, setCopyCompleted] = (0, react_1.useState)(false);
    const removeSuccessIcon = (0, utils_1.useDebounce)(() => {
        setCopyCompleted(false);
    }, 1000);
    async function handleClick() {
        const codeDOMNode = getCodeDOMNode();
        if (!codeDOMNode) {
            return;
        }
        let content = '';
        editor.update(() => {
            const codeNode = (0, lexical_1.$getNearestNodeFromDOMNode)(codeDOMNode);
            if ((0, code_1.$isCodeNode)(codeNode)) {
                content = codeNode.getTextContent();
            }
            const selection = (0, lexical_1.$getSelection)();
            (0, lexical_1.$setSelection)(selection);
        });
        try {
            await navigator.clipboard.writeText(content);
            setCopyCompleted(true);
            removeSuccessIcon();
        }
        catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    return (React.createElement("button", { className: "menu-item", onClick: handleClick, "aria-label": "copy" }, isCopyCompleted ? (React.createElement("i", { className: "format success" })) : (React.createElement("i", { className: "format copy" }))));
}
