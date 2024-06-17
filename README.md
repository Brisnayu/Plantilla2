# Configuración básica ESLint + Prettier + Angular:

Para asegurarte de que tienes bien configurados ESLint y Prettier en tu proyecto de Angular, aquí tienes una guía paso a paso. Asegúrate de seguir cada paso para integrar correctamente estas herramientas en tu proyecto.

1. Instalar dependencias
Primero, instala las dependencias necesarias para ESLint y Prettier. Abre tu terminal y ejecuta los siguientes comandos:

```sh
npm install --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-angular
```

2. Configurar ESLint
Crea o actualiza el archivo .eslintrc.json en la raíz de tu proyecto con la siguiente configuración:

```sh
{
  "root": true,
  "overrides": [
    {
      "files": ["*.ts"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:@angular-eslint/recommended"
      ],
      "plugins": ["@typescript-eslint", "prettier", "@angular-eslint"],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "singleQuote": true,
            "trailingComma": "all",
            "printWidth": 80,
            "tabWidth": 2,
            "semi": true,
            "quotes": ["error", "always"],
            "endOfLine": "lf"
          }
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "vars": "local",
            "args": "after-used",
            "ignoreRestSiblings": false
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "plugins": ["@angular-eslint/template"],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "parser": "angular"
          }
        ]
      }
    }
  ]
}
```

3. Configurar Prettier
Crea un archivo prettier.config.js o .prettierrc o .prettierrc.json en la raíz de tu proyecto con la siguiente configuración:

```sh
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": false,
  "printWidth": 80,
  "endOfLine": "lf"
}
```

4. Integrar ESLint y Prettier en Angular
Si estás utilizando Angular CLI, puedes añadir un script en tu package.json para ejecutar ESLint:

```sh
"scripts": {
  "lint": "eslint 'src/**/*.{ts,js,html}'"
}
```

5. Ejecutar ESLint
Ejecuta el siguiente comando en la terminal para verificar que ESLint está configurado correctamente:

```sh
npm run lint
```

IMPORTANTE: En caso de errores se pueden formatear usando el comando: ng lint --fix


6. Configuración en el Editor
Para asegurarte de que tu editor de código (como VSCode) aplica automáticamente las reglas de ESLint y Prettier, instala las extensiones necesarias:

ESLint: ESLint Extension
Prettier: Prettier Extension
Luego, agrega la siguiente configuración en tu settings.json de VSCode:

```sh
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.packageManager": "npm"
}
```

7. Ignorar archivos innecesarios
Crea un archivo .eslintignore en la raíz de tu proyecto para ignorar archivos y directorios innecesarios:

```sh
node_modules/
dist/
*.js
*.html
```

Y un archivo .prettierignore para Prettier:

```sh
/dist
/node_modules
```
# Configuración básica Translate (i18n):

Para implementar i18n (internacionalización) en tu proyecto Angular, puedes seguir los siguientes pasos:

1. Instalar ngx-translate: 
Esta es una biblioteca que te permitirá manejar la internacionalización en tu proyecto Angular. Para instalarla, puedes usar el siguiente comando en tu terminal:
--------------------------------------------------------------------
```sh
npm install @ngx-translate/core @ngx-translate/http-loader --save
```
--------------------------------------------------------------------

2. Importar módulos necesarios: 
Necesitas importar TranslateModule y TranslateLoader en tu módulo principal (usualmente app.module.ts). Aquí también configurarás TranslateHttpLoader para que cargue tus archivos de traducción.

----------------------------------------------------------------------------
```sh
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---------------------------------------------------------------------------

3. Usar las traducciones en tu aplicación: 

Puedes usar el servicio TranslateService para cambiar el idioma en tiempo de ejecución, y el pipe translate para mostrar las traducciones en tus componentes.

-------------------------------------------------------------------------------

```sh
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {
  translate.setDefaultLang('en');
}

switchLanguage(language: string) {
  this.translate.use(language);
}
```

--------------------------------------------------------------------------------

4. En el html:

----------------------------------------------------------------------------------
```sh
<div>{{ 'HELLO' | translate:param }}</div>
```
------------------------------------------------------------------------------------

5. Crear archivos de traducción: Debes tener archivos JSON para cada idioma que quieras soportar. Estos archivos deben estar en la ruta que especificaste al configurar TranslateHttpLoader.

----------------------------------------------------------------------------------------
```sh
// assets/i18n/en.json
{
  "HELLO": "Hello"
}

// assets/i18n/es.json
{
  "HELLO": "Hola"
}
```
-----------------------------------------------------------------------------------------

6. Select para cambiar de idioma:

    ```sh
    <select class="px-3 py-1" [(ngModel)]="selectedLanguage" (change)="onLanguageChange()">
        <option value="en">English</option>
        <option value="es">Castellano</option>
        <option value="ca">Català</option>
    </select>
```

--------------------------------------------------------------------------------------------