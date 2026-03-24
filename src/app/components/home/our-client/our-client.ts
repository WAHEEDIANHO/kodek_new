import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap'
import { ClientCarousel } from "./client-carousel/client-carousel";

@Component({
  selector: 'app-our-client',
  imports: [ClientCarousel],
  templateUrl: './our-client.html',
  styleUrl: './our-client.css',
})
export class OurClient implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
  ) { }
   
  ngOnInit(): void {
    if(isPlatformBrowser(this.platform)) {
      gsap.set(".box", {
        x: (index) => index * 10 + 'em',
       })

       gsap.to(".box", {
        duration: 5,
        ease: "none",
        x: "+=70em", //move each box 70em to left
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % 70) //force x value to be between 0 and 70 using modulus
        },
        repeat: -1
      });
    }
   }

   items = new Array(7).fill(0).map((_, index) => ({
    id: index + 1,
    image: `/images/home/clients/image_${index + 1}.svg`,
    alt: `Client ${index + 1}`,
  }));

}
