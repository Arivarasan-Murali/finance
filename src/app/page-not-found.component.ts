import { Component } from "@angular/core";

@Component({
  selector: "page-not-found",
  template: `<p>Page Not Found</p>`,
  styles: [
    "p {position: absolute;font-size: 3rem;top: 50%;left: 50%;transform: translate(-50%, -50%);mix-blend-mode: difference;}",
  ],
})
export class PageNotFoundComponent {}
