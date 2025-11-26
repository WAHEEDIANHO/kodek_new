import { Component, inject, signal, OnInit } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-hero-heading',
  imports: [NgxTypedJsModule],
  templateUrl: './hero-heading.html',
  styleUrl: './hero-heading.css',
})
export class HeroHeading implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(false);

  ngOnInit(): void {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }
}
