var jest    = require('jest-cli'),
    gutil   = require('gulp-util'),
    through = require('through2');

module.exports = function (options, jestOptions) {
    options = options || {};

    return through.obj(function (file, enc, cb) {
        options.rootDir = options.rootDir || file.path;

        const opts = Object.assign({}, jestOptions, {config: options});

        jest.runCLI(opts, options.rootDir, function (success) {
            if(!success) {
                cb(new gutil.PluginError('gulp-jest-iojs', { message: "Tests Failed" }));
            } else {
                cb();
            }
        }.bind(this));
    });
};
