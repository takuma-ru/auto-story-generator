# ESLint

## Base config
```js
import mainConfig from './main.mjs'

function config() {
  return mainConfig({
    vue: true,
  })
}

export default config
```
