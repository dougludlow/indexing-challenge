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
  typescriptOptions: {
    "tsconfig": true,
    "module": "system"
  },
  packages: {
    "indexing-challenge": {
      "main": "main.ts",
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "plugin-typescript"
        },
        "polyfills.ts": {
          "globals": {
            "Zone": "zone.js"
          }
        }
      }
    }
  },
  map: {
    "@angular/router@2.0.0-rc.2": "npm:@angular/router@2.0.0-rc.2"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "@angular/common": "npm:@angular/common@2.0.0-rc.2",
    "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.2",
    "@angular/core": "npm:@angular/core@2.0.0-rc.2",
    "@angular/http": "npm:@angular/http@2.0.0-rc.2",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.2",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.0.0-rc.2",
    "@angular/router": "npm:@angular/router@3.0.0-alpha.3",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.6",
    "bootswatch": "npm:bootswatch@3.3.6",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "chart.js": "npm:chart.js@2.1.6",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "css": "github:systemjs/plugin-css@0.1.23",
    "font-awesome": "npm:font-awesome@4.6.3",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "jquery": "npm:jquery@2.2.4",
    "jquery-validation": "npm:jquery-validation@1.15.0",
    "jquery-validation-unobtrusive": "npm:jquery-validation-unobtrusive@3.2.6",
    "lodash": "npm:lodash@4.13.1",
    "ng2-charts": "npm:ng2-charts@1.1.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "rxjs": "npm:rxjs@5.0.0-beta.6",
    "zone.js": "npm:zone.js@0.6.12"
  },
  packages: {
    "npm:chartjs-color-string@0.4.0": {
      "map": {
        "color-name": "npm:color-name@1.1.1"
      }
    },
    "npm:ng2-charts@1.1.0": {
      "map": {
        "chart.js": "npm:chart.js@2.1.3"
      }
    },
    "npm:chart.js@2.1.3": {
      "map": {
        "moment": "npm:moment@2.13.0",
        "chartjs-color": "npm:chartjs-color@1.0.22"
      }
    },
    "npm:chartjs-color@1.0.22": {
      "map": {
        "color-convert": "npm:color-convert@0.5.3",
        "chartjs-color-string": "npm:chartjs-color-string@0.4.0"
      }
    },
    "npm:font-awesome@4.6.3": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23"
      }
    },
    "npm:chart.js@2.1.6": {
      "map": {
        "chartjs-color": "npm:chartjs-color@2.0.0",
        "moment": "npm:moment@2.13.0"
      }
    },
    "npm:chartjs-color@2.0.0": {
      "map": {
        "chartjs-color-string": "npm:chartjs-color-string@0.4.0",
        "color-convert": "npm:color-convert@0.5.3"
      }
    },
    "npm:jquery-validation-unobtrusive@3.2.6": {
      "map": {
        "jquery": "npm:jquery@2.2.4",
        "jquery-validation": "npm:jquery-validation@1.15.0"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.6.0"
      }
    },
    "npm:buffer@4.6.0": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "ieee754": "npm:ieee754@1.1.6",
        "base64-js": "npm:base64-js@1.1.2"
      }
    }
  }
});
