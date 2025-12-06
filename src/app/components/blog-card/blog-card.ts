import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css'
})
export class BlogCardComponent {
  @Input() post: any;
}