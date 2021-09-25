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
  todays:any;
  result:any=[];

  flightForm = new FormGroup({
    source: new FormControl('',[Validators.required]),
    destination :new FormControl('',[Validators.required]),
    departure: new FormControl('',[Validators.required]),
    returndate: new FormControl('',[Validators.required]),
    passenger: new FormControl('',[
    Validators.required,
    Validators.min(1),
    Validators.max(6)
    ])  
  },{validators:[this.matchCity.validate]});
  
  constructor(private matchCity:MatchCity,private searchService:SearchService) { }   

  ngOnInit(): void {
    this.getDates();
  }

  getDates(){
    let toDate:any = new Date().getDate();
    if (toDate < 10) {
      toDate = '0'+ toDate;
    }
    let month:any = new Date().getMonth()+1;
    if (month<10) {
      month ='0'+month;
    }
    let year:any = new Date().getFullYear();
    this.todays = `${year}-${month}-${toDate}`;
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
