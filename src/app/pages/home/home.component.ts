import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  }

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
}
