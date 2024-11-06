import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlideComponent } from "./slide/slide.component";
import { InputComponent } from "./input/input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlideComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LearnInput';
}
