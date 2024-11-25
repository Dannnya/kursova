import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MultiSelectDropdownComponent } from '../multi-select-dropdown/multi-select-dropdown.component';



@Component({
  selector: 'app-lecturers',
  standalone: true,
  imports: [
    CommonModule,
    MultiSelectDropdownComponent,

  ],
  template: '<app-multi-select-dropdown />',
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.css'
})
export class LecturersComponent {


  show()
  {
    console.log()
  }
  lecturers = 
    [
    {
      name:"ХІО",
      department:"КРКТ",
      status:"free"
    },
    {
      name:"ХІО",
      department:"КРКС",
      status:"free"
    },
    {
      name:"ХІО",
      department:"КОІТ",
      status:"free"
    },
    {
      name:"Рендзіняк",
      department:"КРКТ", 
      status:"taken"
    },
    {
      name:"Благітко",
      department:"КРКТ",
      status:"pending"
    },
    {
      name:"Чмихало",
      department:"КСП",
      status:"free"
    },
    {
      name:"Хмельницький",
      department:"КОІТ",
      status:"free"
    },

  ]

  

  lecturersDisplayed : any = this.lecturers


  selectedItemsInParent: string[] = [];
  onSelectionChanged(selectedItems: string[]) {
    this.selectedItemsInParent = selectedItems;
    console.log(this.selectedItemsInParent)
    this.filterLecturers(selectedItems)

  }

  filterLecturers(selectedItems: any)
  {
    
    if(selectedItems.length === 0)
    {
      this.lecturersDisplayed = this.lecturers
      return 0;
    }
    this.lecturersDisplayed = this.lecturers.filter((lec) => selectedItems.find((dep: any) => dep == lec.department))
    console.log(this.lecturersDisplayed)
    return 0;
  }
  

  sendRequest()
  {
    alert("cool")
  }

  
  

  

}
