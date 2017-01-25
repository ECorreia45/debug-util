const gulp = require('gulp');
const util = require('./debug-util');
const pj = require('./package.json');
const jedit = require('gulp-json-editor');
const git = require('gulp-git')

// git add change and created files
gulp.task('add', function(){
  return gulp.src('./')
  .pipe(git.add({args: '-A'}));
});

// git commit staged files
gulp.task('commit', function(){
  return gulp.src('./')
  .pipe(git.commit('changes committed using gulp'));
});

// git push committed files to feature branch
gulp.task('pushFeature', ['add', 'commit'], function(){
  git.push('origin', 'feature', function (err) {
    if (err) throw err;
  });
});

// git push committed files to master branch
gulp.task('pushMaster', ['add', 'commit'], function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// git push committed files to npm branch
gulp.task('pushMaster', ['add', 'commit'], function(){
  git.push('origin', 'npm', function (err) {
    if (err) throw err;
  });
});

// patch bump current version
gulp.task('patch', function () {
  let v = null;
  gulp.src('./package.json')
    .pipe(jedit({
      'version': util.versionBump(pj.version, 'patch')
    }))
    .pipe(gulp.dest('./'))
});

// minor bump current version
gulp.task('minor', function () {
  let v = null;
  gulp.src('./package.json')
  .pipe(jedit({
    'version': util.versionBump(pj.version, 'minor')
  }))
  .pipe(gulp.dest('./'))
});

// major bump current version
gulp.task('major', function () {
  let v = null;
  gulp.src('./package.json')
  .pipe(jedit({
    'version': util.versionBump(pj.version, 'major')
  }))
  .pipe(gulp.dest('./'))
});