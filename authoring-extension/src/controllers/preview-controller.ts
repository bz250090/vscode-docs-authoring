"use strict";

import * as vscode from "vscode";
import * as common from "../helper/common";
import { reporter } from "../telemetry/telemetry";

const telemetryCommand: string = "preview topic";

export function previewTopicCommand() {
    const commands = [
        { command: previewTopic.name, callback: previewTopic },
    ];
    return commands;
}

export function previewTopic() {
    reporter.sendTelemetryEvent("command", { command: telemetryCommand });

    const editor = vscode.window.activeTextEditor;

    if (!common.isValidEditor(editor, true, "previewTopic")) {
        return;
    }

    if (!common.isMarkdownFileCheck(editor, false)) {
        return;
    }

    vscode.commands.executeCommand("DocFX.showDfmPreviewToSide").then(
        // tslint:disable-next-line:no-console
        (result) => console.log("preview launched."),
        (err) => vscode.window.showErrorMessage("DocFX preview extension not installed or disabled."));
}
