import { Component } from '@angular/core';
import { InnovationCard } from "./innovation-card/innovation-card";

@Component({
  selector: 'app-innovations',
  imports: [InnovationCard],
  templateUrl: './innovations.html',
  styleUrl: './innovations.css',
})
export class Innovations {

}
