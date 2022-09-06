<h1 style='color: '>Node JS 🤯</h1>

Рускоязычная документация [docks](https://nodejsdev.ru/)

<br>

## Содержание:

<!-- 1. **[NVM](#node-version-manager)** -->
1. **[Глобальные объекты](#глобальные-объекты)**

<br>

## Глобальные объекты

-   `global/globalThis` - эквивален `window` в среде node js
-   `__dirname` - возвращает весь путь до родительской дирректории текущего файла
-   `__filename` - возвращает весь путь до файла, включая его имя и расширение
-   `process`

## [Node version manager](https://github.com/nvm-sh/nvm)

-   `nvm -v` - вресия nvm
-   `nvm use` - при условии что в дирректории есть .nvmrc с версией node применит ее
-   `nvm use <version>` - применит версию node
-   `nvm ls` - покажет список локально установленных версий node
-   `nvm install <version>` - установит node js с указаной версией
