import { Component } from "@angular/core";

import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import {
  startWith,
  debounceTime,
  switchMap,
  distinctUntilChanged,
} from "rxjs/operators";
import { CountryService } from "../../services/country.service";
import { CountryObj } from "src/app/models/countryInterface";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  filteredOptions$: Observable<CountryObj[]>;
  filterControl = new FormControl();

  constructor(private service: CountryService) {
    this.filteredOptions$ = this.filterControl.valueChanges.pipe(
      startWith(""),
      debounceTime(environment.defaultDebounceTime),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.service.getData(val);
      })
    );
  }
}
