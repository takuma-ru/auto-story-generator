module.exports = {
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
  git: {
    requireCleanWorkingDir: false,
    addFiles: ["package.json"],
    commitMessage:
      ":bookmark: release @takuma-ru/auto-story-generator@${version}",
  },
  plugins: {},
};