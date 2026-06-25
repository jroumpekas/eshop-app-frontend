import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeHero } from "./home-hero/home-hero";

@Component({
  selector: 'app-home',
  imports: [RouterLink, HomeHero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}