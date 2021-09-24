import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchCity } from '../match-city';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  
  flightForm = new FormGroup({
    source: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    destination :new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    departure: new FormControl('',[
      Validators.required
    ]),
    returndate: new FormControl('',[
      Validators.required]),
    passenger: new FormControl('',[
    Validators.required,
    Validators.min(1),
    Validators.max(6)
    ])  
  },{validators:[this.matchCity.validate]});
  
  constructor(private matchCity:MatchCity,private searchService:SearchService) { }
   result:any;

  ngOnInit(): void {
  }

  onSubmit(){ 
    if(this.flightForm.invalid ){
      return;
    }

    this.searchService.getData(this.flightForm.value).subscribe({
      next:(response)=>{
        this.result = response;
      },
      error:(err)=>{
        if (!err.status) {
          this.flightForm.setErrors({noConnection:true});
        } else {
          this.flightForm.setErrors({unknownError:true});
        }
      }
    });   
  }

  onReset(){
    this.flightForm.reset();
  }
}
