import { Component } from '@angular/core';
import { HeroHeading } from "./hero-heading/hero-heading";
import { HeroImage } from "./hero-image/hero-image";
import { HeroFeature } from "./hero-feature/hero-feature";

@Component({
  selector: 'app-hero',
  imports: [HeroHeading, HeroImage, HeroFeature],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
