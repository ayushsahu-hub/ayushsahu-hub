import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

@Injectable({ 
  providedIn:'root' 
})

export class MatchCity implements Validators {

  validate(formGroup:FormGroup) {
    const { source, destination } = formGroup.value;
    
    if (source && destination) {
      if (source === destination) {
        return {cityMatch:true};
      } else {
        return null;
      }
    }        
  } 
  
}
