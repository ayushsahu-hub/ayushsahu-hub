import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

@Injectable({ 
  providedIn:'root' 
})

export class MatchCity implements Validators {

  validate(formGroup:FormGroup) {
    const { source, destination } = formGroup.value;
    
    let Source = source.toLowerCase(),
    Destination = destination.toLowerCase();
    
    if (Source && Destination) {
      if (Source === Destination) {
        return {cityMatch:true};
      } else {
        return null;
      }
    }        
  } 
  
}
