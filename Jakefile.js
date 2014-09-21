/*global desc, task, jake, fail, complete */
(function () {
    "use strict";

    task("default", ["lint", "spec"]);

    task('spec', {async: true}, function () {
      sh('node ./node_modules/.bin/buster-test --reporter specification', function (out) {
        console.log(out);
        complete();
      }, function(out) {
        console.log(out);
        fail('specs failed');
      });
    });

    desc("Lint everything");
    task("lint", [], function () {
        var lint = require("./lib/support/lint_runner.js");

        var files = new jake.FileList();
        files.include("spec/**/*.js");
        files.include("lib/**/*.js");
        files.exclude("node_modules");
        files.exclude("spec/helper.js");
        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    // `node --version`
    task("node", [], function() {
        var NODE_VERSION = "v0.10.5\n";

        sh("node --version", function(stdout){
            if (stdout !== NODE_VERSION) fail("Incorrect node version. Expected " + NODE_VERSION);
            complete();
        });
    }, {async: true});

    function sh(command, callback, error_callback) {
      var stdout = "";
      var process = jake.createExec(command, {printStdout:true, printStderr: true});
      process.on("stdout", function(chunk) {
        stdout += chunk;
      });
      process.on("stderr", function(chunk) {
        stdout += chunk;
      });
      process.on("cmdEnd", function() {
        callback(stdout);
      });
      process.on("error", function() {
        error_callback(stdout);
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
