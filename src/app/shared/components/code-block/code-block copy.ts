import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-mono">{{ filename || 'code.ts' }}</span>
        <button class="text-xs px-2 py-1 bg-blue-500 text-white rounded">
          Copiar
        </button>
      </div>
      <pre class="text-sm overflow-x-auto whitespace-pre">
{{ code.substring(0, 200) }}{{ code.length > 200 ? '...' : '' }}
      </pre>
    </div>
  `
})
export class CodeBlockComponent {
  @Input() code: string = '';
  @Input() language: string = 'typescript';
  @Input() filename: string = '';
  @Input() description: string = '';
}