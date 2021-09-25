import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input()label:string;
  @Input()control:FormControl;
  @Input()inputType:string;
  @Input() mindate:string;
  constructor() { }

  ngOnInit(): void {
  }

  showErrors(){
    const {touched, errors} = this.control;
    return touched && errors;
  }

}
