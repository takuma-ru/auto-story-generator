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
    pushRepo: "origin/release/${version}",
  },
  plugins: {},
};
