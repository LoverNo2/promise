import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'esm',
    },
    // {
    //   file: './dist/index.cjs',
    //   format: 'cjs',
    // },
  ],
  plugins: [typescript()],
  onwarn(warning, warn) {
    // 过滤掉循环依赖警告
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return
    }
    warn(warning)
  },
}
