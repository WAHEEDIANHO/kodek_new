import { Component } from '@angular/core';
import { Hero } from "../../components/home/hero/hero";
import { Innovations } from "../../components/home/innovations/innovations";

@Component({
  selector: 'app-home',
  imports: [Hero, Innovations],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
