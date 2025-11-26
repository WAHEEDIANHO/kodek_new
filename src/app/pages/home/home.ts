import { Component } from '@angular/core';
import { Hero } from "../../components/home/hero/hero";

@Component({
  selector: 'app-home',
  imports: [Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
