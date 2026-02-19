import { Component } from '@angular/core';
import { Hero } from "../../components/home/hero/hero";
import { Innovations } from "../../components/home/innovations/innovations";
import { Product } from "../../components/home/product/product";
import { OurClient } from "../../components/home/our-client/our-client";

@Component({
  selector: 'app-home',
  imports: [Hero, Innovations, Product, OurClient],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
