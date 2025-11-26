import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mobileOpen = signal(false);

   toggleMobile() {
    this.mobileOpen.set(!this.mobileOpen());
  }
}
