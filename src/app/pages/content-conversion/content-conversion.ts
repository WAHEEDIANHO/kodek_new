import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { Footer } from "../../components/footer/footer";
import { ContactForm } from "../../components/contact-form/contact-form";

@Component({
  selector: 'app-content-conversion',
  standalone: true,
  imports: [CommonModule, Footer, ContactForm],
  templateUrl: './content-conversion.html',
  styleUrl: './content-conversion.css',
})
export class ContentConversion implements OnInit, AfterViewInit, OnDestroy {
  activeTab = signal('overview'); // 'overview' | 'digital-learning'
  private platformId = inject(PLATFORM_ID);
  isBrowser = false;

  @ViewChild('contentContainer') contentContainer!: ElementRef;
  @ViewChild('tabIndicator') tabIndicator!: ElementRef;

  private touchStartX = 0;
  private touchEndX = 0;
  private resizeObserver: ResizeObserver | null = null;
  private eventListeners: Array<{ type: string, listener: EventListenerOrEventListenerObject }> = [];

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) { 
      this.animateTabIndicator(this.activeTab());
      this.initScrollGestures();
      
      // Animate in initial content
      gsap.fromTo(this.contentContainer.nativeElement, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.eventListeners.forEach(l => window.removeEventListener(l.type, l.listener));
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
  }

  setActiveTab(tab: string) {
    if (this.activeTab() === tab) return;
    else this.activeTab.set(tab);
    if (this.isBrowser) {
      gsap.to(this.contentContainer.nativeElement, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          this.activeTab.set(tab);
          // Animate in new content
          gsap.fromTo(this.contentContainer.nativeElement, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
          this.animateTabIndicator(tab);
        }
      });
    }
    
  }

  animateTabIndicator(tab: string) {
    if (!this.tabIndicator) return;
    
    // Simple logic to move indicator based on tab index (assuming 2 tabs for now)
    // Adjust xPos based on actual tab widths if needed, but for equal width tabs percentages work fine.
    // 'overview' is index 0 (0%), 'digital-learning' is index 1 (100% of one tab width)
    // Assuming the indicator is relative to the tab container and tabs are equal width.
    const xPos = tab === 'overview' ? '0%' : '100%';
    
    gsap.to(this.tabIndicator.nativeElement, {
      x: xPos,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }

  initScrollGestures() {
    // Simple swipe detection for mobile
    const touchStart = (e: Event) => {
      this.touchStartX = (e as TouchEvent).changedTouches[0].screenX;
    };
    
    const touchEnd = (e: Event) => {
      this.touchEndX = (e as TouchEvent).changedTouches[0].screenX;
      this.handleSwipe();
    };

    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchend', touchEnd, { passive: true });
    
    this.eventListeners.push({ type: 'touchstart', listener: touchStart });
    this.eventListeners.push({ type: 'touchend', listener: touchEnd });

    // Mouse wheel handling for tab switching (debounced)
    let isScrolling = false;
    const wheelHandler = (e: Event) => {
      // Only hijack scroll if we are not scrolling content vertically?
      // Actually, let's keep it simple: if user scrolls significantly horizontally or uses a trackpad swipe
      const wheelEvent = e as WheelEvent;
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) {
        // Horizontal scroll detected
        if (isScrolling) return;
        
        if (wheelEvent.deltaX > 30) {
          // Scroll Right -> Next Tab
           if (this.activeTab() === 'overview') this.setActiveTab('digital-learning');
           isScrolling = true;
           setTimeout(() => isScrolling = false, 1000);
        } else if (wheelEvent.deltaX < -30) {
          // Scroll Left -> Prev Tab
           if (this.activeTab() === 'digital-learning') this.setActiveTab('overview');
           isScrolling = true;
           setTimeout(() => isScrolling = false, 1000);
        }
      }
    };
    
    window.addEventListener('wheel', wheelHandler, { passive: true });
    this.eventListeners.push({ type: 'wheel', listener: wheelHandler });
  }

  handleSwipe() {
    const SWIPE_THRESHOLD = 50;
    if (this.touchEndX < this.touchStartX - SWIPE_THRESHOLD) {
      // Swiped Left -> Next Tab (Overview -> Digital Learning)
      if (this.activeTab() === 'overview') this.setActiveTab('digital-learning');
    }
    if (this.touchEndX > this.touchStartX + SWIPE_THRESHOLD) {
      // Swiped Right -> Prev Tab (Digital Learning -> Overview)
      if (this.activeTab() === 'digital-learning') this.setActiveTab('overview');
    }
  }
}
