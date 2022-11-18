import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { LoadingService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  map: google.maps.Map;
  myLatLng = { lat: 16.8041244, lng: 47.139488 }


  info: any;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    // this.loadingService.setValue(true);
    let loader = new Loader({
      apiKey: "AIzas"
      // apiKey: "AIzaSyBwvLprVfcd1yl2skYYkGk6clqw49rnRCQ&language=en"
    })

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.myLatLng,
        zoom: 4,
        mapId: '3007160f8e930d13',
      });

      new google.maps.Marker({
        position: this.myLatLng,
        map: this.map
      });

      // this.loadingService.setValue(true);
    })
  }
}


