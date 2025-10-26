const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          // 过滤掉 ResizeObserver 错误
          if (error.message && error.message.includes('ResizeObserver')) {
            return false;
          }
          return true;
        },
      },
    },
  },
})
