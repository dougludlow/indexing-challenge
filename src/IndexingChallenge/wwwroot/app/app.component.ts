import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  selector: 'indexing-challenge',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    // ROUTER_PROVIDERS
  ],
  template: `
    <span>Hello</span>
  `
})
// @Routes([

// ])
export class AppComponent {}