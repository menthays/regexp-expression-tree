module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: 'RegExpTree',
      externals: {}
    }
  },
  babel: {
    plugins: 'transform-flow-strip-types'
  }
}
