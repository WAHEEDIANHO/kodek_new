import { Component } from '@angular/core';
import { Hero } from "../../components/home/hero/hero";
import { Innovations } from "../../components/home/innovations/innovations";
import { Product } from "../../components/home/product/product";
import { OurClient } from "../../components/home/our-client/our-client";
import { Contact } from "../../components/home/contact/contact";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Hero, Innovations, Product, OurClient, Contact, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
