import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'], // Diretório raiz com todos os arquivos TypeScript a compilar
  format: ['esm'], // Formato de saída: ESM (ES Modules) - padrão moderno
  outDir: 'build', // Diretório de saída dos arquivos compilados
  sourcemap: true, // Gera arquivos .map para debugging
  shims: true, // Adiciona polyfills para compatibilidade
  target: 'esnext', // Target JavaScript: versão mais recente
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
      '@env': './src/env',
      '@lib': './src/lib',
      '@controllers': './src/http/controllers',
      '@middlewares': './src/http/middlewares',
      '@constants': './src/constants',
      '@use-cases': './src/use-cases',
      '@repositories': './src/repositories',
      '@services': './src/services',
      '@http': './src/http',
      '@tps': './src/@types',
      '@utils': './src/utils',
      '@templates': './src/templates',
      '@schemas': './src/http/schemas',
    }
  },
})
