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
  hooks: {
    "after:git:release":
      "echo Release is done; git switch -c release/${version} ${version}; git push --set-upstream origin release/${version}; git switch main; git merge release/${version}; git push;",
  },
  plugins: {},
};
