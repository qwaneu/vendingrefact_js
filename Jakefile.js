/*global desc, task, jake, fail, complete */
(function () {
    "use strict";

    task("default", ["lint", "test"]);

    desc("Unit tests");
    task("test", ["node"], function(){
        var reporter = require('nodeunit').reporters['default'];
        reporter.run(['src/server/_server_test.js'], null, function(failures){
            if (failures) fail("tests failed");
            complete();
        });
    }, {async:true} );

    desc("Lint everything");
    task("lint", ["node"], function () {
        var lint = require("./lib/support/lint_runner.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    // `node --version`
    task("node", [], function() {
        var NODE_VERSION = "v0.8.6\n";

        sh("node --version", function(stdout){
            if (stdout !== NODE_VERSION) fail("Incorrect node version. Expected " + NODE_VERSION);
            complete();
        });
    }, {async: true});

    function sh(command, callback) {
        var stdout = "";
        var process = jake.createExec(command, {printStdout:true, printStderr: true});
        process.on("stdout", function(chunk) {
            stdout += chunk;
        });
        process.on("cmdEnd", function() {
            callback(stdout);
        });
        process.run();
    }

    function nodeLintOptions() {
        return {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
        };
    }
})();
