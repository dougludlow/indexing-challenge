SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "indexing-challenge/": "app/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.16",
      "os": "github:jspm/nodelibs-os@0.2.0-alpha"
    },
    "packages": {
      "github:frankwallis/plugin-typescript@4.0.16": {
        "map": {
          "typescript": "npm:typescript@1.8.10"
        }
      },
      "github:jspm/nodelibs-os@0.2.0-alpha": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      }
    }
  },
  transpiler: "plugin-typescript",
  packages: {
    "indexing-challenge": {
      "main": "main.ts",
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "plugin-typescript"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "@angular/common": "npm:@angular/common@2.0.0-rc.1",
    "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.1",
    "@angular/core": "npm:@angular/core@2.0.0-rc.1",
    "@angular/http": "npm:@angular/http@2.0.0-rc.1",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.1",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.0.0-rc.1",
    "@angular/router": "npm:@angular/router@3.0.0-alpha.3",
    "@angular/router@2.0.0-rc.1": "npm:@angular/router@2.0.0-rc.1",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.6",
    "bootswatch": "npm:bootswatch@3.3.6",
    "css": "github:systemjs/plugin-css@0.1.23",
    "jquery": "npm:jquery@2.2.4",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "rxjs": "npm:rxjs@5.0.0-beta.6",
    "zone.js": "npm:zone.js@0.6.12"
  },
  packages: {}
});
