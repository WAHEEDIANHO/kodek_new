import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mobileOpen = signal(false);
  offerOpen = signal(false);

  toggleMobile() {
    this.mobileOpen.set(!this.mobileOpen());
  }

  toggleOffer() {
    this.offerOpen.set(!this.offerOpen());
  }

  closeOffer() {
    this.offerOpen.set(false);
  }

  onOfferButtonKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.offerOpen()) {
        this.closeOffer();
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.offerOpen()) {
        this.offerOpen.set(true);
      }
      queueMicrotask(() => {
        const firstItem = document.querySelector<HTMLElement>('[data-offer-menu-item]');
        if (firstItem) {
          firstItem.focus();
        }
      });
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.offerOpen()) {
        this.offerOpen.set(true);
      }
      const firstItem = document.querySelector<HTMLElement>('[data-offer-menu-item]');
      if (firstItem) {
        firstItem.focus();
      }
    }
  }

  onOfferItemKeydown(event: KeyboardEvent, index: number) {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-offer-menu-item]')
    );

    if (!items.length) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeOffer();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % items.length;
      items[nextIndex].focus();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      items[0].focus();
    }

    if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1].focus();
    }
  }
}
