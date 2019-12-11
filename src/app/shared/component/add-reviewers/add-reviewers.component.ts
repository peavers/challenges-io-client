import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-reviewers',
  templateUrl: './add-reviewers.component.html',
  styleUrls: ['./add-reviewers.component.scss']
})
export class AddReviewersComponent {
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  reviewerCtrl = new FormControl();
  filteredReviewers: Observable<string[]>;
  reviewers: string[] = ['chris@codacy.com'];
  allReviewers: string[] = ['pedro@codacy.com', 'andrea@codacy.com', 'bruno@codacy.com'];

  @ViewChild('reviewerInput', { static: false }) reviewerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredReviewers = this.reviewerCtrl.valueChanges.pipe(
      startWith(null),
      map((reviewer: string | null) => (reviewer ? this._filter(reviewer) : this.allReviewers.slice()))
    );
  }

  add(event: MatChipInputEvent): void {
    // Add reviewer only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our reviewer
      if ((value || '').trim()) {
        this.reviewers.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.reviewerCtrl.setValue(null);
    }
  }

  remove(reviewer: string): void {
    const index = this.reviewers.indexOf(reviewer);

    if (index >= 0) {
      this.reviewers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.reviewers.push(event.option.viewValue);
    this.reviewerInput.nativeElement.value = '';
    this.reviewerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allReviewers.filter(reviewer => reviewer.toLowerCase().indexOf(filterValue) === 0);
  }
}
