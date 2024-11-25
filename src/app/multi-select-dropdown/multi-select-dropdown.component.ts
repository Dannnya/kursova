import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {
  // Define the items for the dropdown
  items = ['КОІТ', 'КРКС', 'КРКТ', 'КСП', 'КСНЕ', 'КФБЕ'];
  selectedItems: string[] = []; // Array to hold selected items
  isDropdownOpen = false; // Tracks the open/closed state of the dropdown

  // Output event emitter to pass selected items to parent component
  @Output() selectionChanged = new EventEmitter<string[]>();

  // Toggle dropdown open/close
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle item selection and deselection
  toggleSelection(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.selectionChanged.emit(this.selectedItems); // Emit selected items
  }
}
