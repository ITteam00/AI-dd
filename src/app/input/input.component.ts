import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TextGenerationService } from '../text-generation.service';
/**
 * @title Input with error messages
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  constructor(private apiService: TextGenerationService) {}
  result: string = '123';
  inputValue: string = '';

  onEnter() {
    this.apiService.generateContent(this.inputValue).subscribe(
      (data) => {
        this.result = data;
      },
      (error) => {
        console.log('!!' + error);
      }
    );
  }
}
