# SNDVLL CORE/COMPONTENTS/ICONS REPO

In the current state, support is limited to Angular 13.
Instructions for how to use with an angular project:

1. Clone the repo into the root of the project, and rename the folder to "projects".
2. In tsconfig.json paste these paths in:
```
"paths": {
  "@sndvll/icons": ["dist/sndvll-icons"],
  "@sndvll/icons/*": ["dist/sndvll-icons/*"],
  "@sndvll/components": ["dist/sndvll-components"],
  "@sndvll/components/*": ["dist/sndvll-components/*"],
  "@sndvll/core": ["dist/sndvll-core"],
  "@sndvll/core/*": ["dist/sndvll-core/*"],
}
```
3. In angular.json paste these configs in under "projects" key:
```
"sndvll-icons": {
  "projectType": "library",
  "root": "projects/sndvll-icons",
  "sourceRoot": "projects/sndvll-icons/src",
  "prefix": "lib",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:ng-packagr",
      "options": {
        "project": "projects/sndvll-icons/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "projects/sndvll-icons/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "projects/sndvll-icons/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    }
  }
},
"sndvll-components": {
  "projectType": "library",
  "root": "projects/sndvll-components",
  "sourceRoot": "projects/sndvll-components/src",
  "prefix": "lib",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:ng-packagr",
      "options": {
        "project": "projects/sndvll-components/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "projects/sndvll-components/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "projects/sndvll-components/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    }
  }
},
"sndvll-core": {
  "projectType": "library",
  "root": "projects/sndvll-core",
  "sourceRoot": "projects/sndvll-core/src",
  "prefix": "lib",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:ng-packagr",
      "options": {
        "project": "projects/sndvll-core/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "projects/sndvll-core/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "projects/sndvll-core/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    },
    "test": {
      "builder": "@angular-devkit/build-angular:karma",
      "options": {
        "main": "projects/sndvll-core/src/test.ts",
        "tsConfig": "projects/sndvll-core/tsconfig.spec.json",
        "karmaConfig": "projects/sndvll-core/karma.conf.js"
      }
    }
  }
}
```
4. In root package.json, add these scripts:
```
"icons:build": "ng build sndvll-icons",
"components:build": "ng build sndvll-components",
"core:build": "ng build sndvll-core",
"lib:build": "npm run core:build && npm run icons:build && npm run components:build",
```
5. Then run ```npm run lib:build```

Import components in modules where you want them, or create a ShareModule and import what you need there.<br />
Create an IconsModule to use icons. Take a look in components library for an example.
