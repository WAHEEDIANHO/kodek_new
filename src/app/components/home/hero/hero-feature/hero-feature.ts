import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-feature',
  imports: [],
  templateUrl: './hero-feature.html',
  styleUrl: './hero-feature.css',
})
export class HeroFeature {
 features = [
    { title: 'End-to-end digital expertise' },
    { title: 'Scalable future-ready solutions' },
    { title: 'Human-centered design approach' },
  ];
}
