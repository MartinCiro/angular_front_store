import { Component, inject, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header";
import { FooterComponent } from "./footer/footer";
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { ThemeService } from '@services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MatIconModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private themeService = inject(ThemeService);
  
  // Computed signals para las clases dinámicas
  isDarkMode = this.themeService.isDarkMode;
  
  // Clases CSS dinámicas basadas en el tema
  containerClasses = computed(() => 
    this.isDarkMode() 
      ? 'border-gray-700' 
      : 'border-blue-400'
  );
  
  ngOnInit() {
    // Verificar que el tema está aplicado
    console.log('App Component - Dark Mode active:', this.isDarkMode());
  }
}