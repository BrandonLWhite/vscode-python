// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import * as fs from 'fs-extra';
import * as path from 'path';
import { IDataScienceSettings } from '../../client/common/types';
import { EXTENSION_ROOT_DIR } from '../../client/constants';

// The default base set of data science settings to use
export function defaultDataScienceSettings(): IDataScienceSettings {
    return {
        allowImportFromNotebook: true,
        jupyterLaunchTimeout: 10,
        jupyterLaunchRetries: 3,
        enabled: true,
        jupyterServerURI: 'local',
        // tslint:disable-next-line: no-invalid-template-strings
        notebookFileRoot: '${fileDirname}',
        changeDirOnImportExport: false,
        useDefaultConfigForJupyter: true,
        jupyterInterruptTimeout: 10000,
        searchForJupyter: true,
        showCellInputCode: true,
        collapseCellInputCodeByDefault: true,
        allowInput: true,
        maxOutputSize: 400,
        enableScrollingForCellOutputs: true,
        errorBackgroundColor: '#FFFFFF',
        sendSelectionToInteractiveWindow: false,
        variableExplorerExclude: 'module;function;builtin_function_or_method',
        codeRegularExpression: '^(#\\s*%%|#\\s*\\<codecell\\>|#\\s*In\\[\\d*?\\]|#\\s*In\\[ \\])',
        markdownRegularExpression: '^(#\\s*%%\\s*\\[markdown\\]|#\\s*\\<markdowncell\\>)',
        enablePlotViewer: true,
        runStartupCommands: '',
        debugJustMyCode: true,
        variableQueries: [],
        jupyterCommandLineArguments: [],
        widgetScriptSources: []
    };
}

export function takeSnapshot() {
    // tslint:disable-next-line: no-require-imports
    const memwatch = require('@raghb1/node-memwatch');
    return new memwatch.HeapDiff();
}

let snapshotCounter = 1;
// tslint:disable-next-line: no-any
export function writeDiffSnapshot(snapshot: any, prefix: string) {
    const diff = snapshot.end();
    const file = path.join(EXTENSION_ROOT_DIR, 'tmp', `SD-${snapshotCounter}-${prefix}.json`);
    snapshotCounter += 1;
    fs.writeFile(file, JSON.stringify(diff), { encoding: 'utf-8' }).ignoreErrors();
}
