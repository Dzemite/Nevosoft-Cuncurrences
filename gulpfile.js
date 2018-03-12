// Dependencies
var config = require("./config.js");
var pathManager = require("./server/pathManager.js");
var gulp = require("gulp");
var del = require("del");
var jshint = require("gulp-jshint");
var shell = require("gulp-shell");
var preprocess = require("gulp-preprocess");
var nodemon = require("gulp-nodemon");

// Clean
gulp.task("clean", function (cb) {
	del([pathManager.PUBLIC_BUILD], cb);
});

// Copy to build directory
gulp.task("copy", function () {
	gulp.src([pathManager.PUBLIC_ASSETS + "/**/*.*"]).pipe(gulp.dest(pathManager.PUBLIC_BUILD + "/assets"));
	gulp.src([pathManager.PUBLIC_CSS + "/**/*.*"]).pipe(gulp.dest(pathManager.PUBLIC_BUILD + "/css"));

	if (config.env != "production") {
		gulp.src([pathManager.PUBLIC_LIB + "/**/*.*"]).pipe(gulp.dest(pathManager.PUBLIC_BUILD + "/lib"));
		gulp.src([pathManager.PUBLIC_SCRIPTS + "/**/*.js"]).pipe(gulp.dest(pathManager.PUBLIC_BUILD + "/scripts"));
	} else {
		gulp.src([pathManager.PUBLIC_LIB + "/requirejs/require.js"]).pipe(gulp.dest(pathManager.PUBLIC_BUILD + "/lib/requirejs"));
	}
});

// Runs the r.js command
gulp.task("scripts", shell.task(config.requirejsCommand + " -o public/scripts/build.js"));

// HTML preprocessor
gulp.task("html", function () {
	gulp.src(pathManager.PUBLIC + "/index.html")
		.pipe(preprocess({ context: { NODE_ENV: config.env } }))
		.pipe(gulp.dest(pathManager.PUBLIC_BUILD));
});

// Starts node server
gulp.task("server", function () {
	nodemon({
		script: pathManager.BASE + "/server.js",
		watch: [
			pathManager.BASE + "/*.js",
			pathManager.SERVER + "/*.js"
		],
		ignore: [
			pathManager.PUBLIC + "/**/*.*"
		]
	});
});

// Watch
gulp.task("watch", function () {
	// Public side
	gulp.watch([
		pathManager.PUBLIC + "/**/*.*",
		"!" + pathManager.PUBLIC_BUILD + "/**/*.*"
	], ["copy", "html", "lint"]);
	
	// Server side
	gulp.watch([
		pathManager.BASE + "/*.js",
		pathManager.SERVER + "/*.js"
	], ["lint"]); 
});

// Lint
gulp.task("lint", function () {
	return gulp.src([
		pathManager.BASE + "/*.js",
		pathManager.SERVER + "/*.js",
		pathManager.PUBLIC_SCRIPTS + "/**/*.js",
		"!" + pathManager.PUBLIC_SCRIPTS + "/build.js",
		"!" + pathManager.PUBLIC_BUILD + "/main-built.js",
	])
	.pipe(jshint())
	.pipe(jshint.reporter("default"));
});

// Environment tasks
gulp.task("development", ["watch", "copy", "html", "lint", "server"]);
gulp.task("production", ["copy", "scripts", "html"]);
gulp.task("default", [config.env]);
