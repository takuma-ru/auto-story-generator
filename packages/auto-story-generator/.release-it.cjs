module.exports = {
  npm: {
    publish: true,
  },
  /* github: {
    release: true,
  }, */
  git: {
    tag: false,
    requireCleanWorkingDir: false,
    commitMessage:
      ":bookmark: release @takuma-ru/auto-story-generator@${version}",
  },
  /* hooks: {
    "after:git:release": "git pull origin ${version}",
  }, */
  plugins: {},
};
