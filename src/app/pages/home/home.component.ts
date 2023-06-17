import { Component, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  mapHeight!: string;
  mapWidth!: string;
  constructor() {
    this.setMapDimensions();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  panelOpenState = false;

  items: string[] = [
    'তুরাগ',
    'গ্রীন অনাবিল',
    'ভিক্টর ক্লাসিক',
    'প্রজাপতি',
    'মধুমতি',
    'বি আর টি সি',
    'বসুমতি',
    'শান্তি পরিবহন',
    'পরিস্থান',
    'কেয়ারি সিন্দাবাদ',
    'ভি আই পি',
    'উপকূল',
  ];

  @HostListener('window:resize')
  onWindowResize() {
    this.setMapDimensions();
  }

  private setMapDimensions() {
    if (window.innerWidth < 640) {
      this.mapHeight = '300px';
      this.mapWidth = '400px';
    } else if (window.innerWidth < 1024) {
      this.mapHeight = '300px';
      this.mapWidth = '500px';
    } else {
      this.mapHeight = '400px';
      this.mapWidth = '750px';
    }
  }
  ngOnInit(): void {}
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 23.85826,
    lng: 90.40501,
  };
  zoom = 10;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  vertices: google.maps.LatLngLiteral[] = [
    {
      lat: 23.85826,
      lng: 90.40501,
    },
    {
      lat: 23.73826,
      lng: 90.39471,
    },
  ];

  myControl = new FormControl<string | User>('');
  options: User[] = [
    { name: 'Airport' },
    { name: 'Uttara' },
    { name: 'Dhanmondi' },
    { name: 'Jatrabari' },
    { name: 'Komolapur' },
    { name: 'Mirpur' },
  ];
  filteredOptions: Observable<User[]>;

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}

export interface User {
  name: string;
}
