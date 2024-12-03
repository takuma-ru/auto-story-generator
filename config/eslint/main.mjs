import antfu from '@antfu/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

function mainConfig(
  /** @type {Parameters<typeof antfu>[0]} */
  options,
  /** @type {Parameters<typeof antfu>[1][]} */
  ...userConfigs
) {
  return antfu({
    type: 'lib',
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: 'double',
      semi: true,
    },
    rules: {
      'antfu/top-level-function': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/consistent-type-definitions': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
    formatters: {
      html: true,
      css: true,
      markdown: true,
    },
    ignores: ['**/dist/**/*'],
    plugins: {
      'unused-imports': unusedImports,
    },

    ...options,
  }, ...userConfigs)
}

export default mainConfig
