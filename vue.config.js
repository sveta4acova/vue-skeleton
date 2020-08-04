module.exports = {
  css: {
    loaderOptions: {
      // передача настроек в sass-loader
      // @/ это псевдоним к каталогу src/ поэтому предполагается,
      // что у вас в проекте есть файл `src/variables.scss`
      // Примечание: эта опция называется "prependData" в sass-loader v8
      sass: {
        additionalData: '@import "~@/config/styles/variables.sass"'
      },
      // по умолчанию опция `sass` будет применяться к обоим синтаксисам
      // потому что синтаксис `scss` по сути также обрабатывается sass-loader
      // но при настройке опции `prependData` синтаксис `scss` требует точку с запятой
      // в конце оператора, в то время как для `sass` точки с запятой не требуется
      // в этом случае синтаксис `scss` можно настроить отдельно с помощью опции `scss`
      // scss: {
      //   additionalData: `@import "~@/config/styles/variables.scss";`
      // },
    }
  }
};
