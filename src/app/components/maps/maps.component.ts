import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  map: google.maps.Map;


  ngOnInit(): void {

    let loader = new Loader({
      apiKey: "AIzaSyBwvLprVfcd1yl2skYYkGk6clqw49rnRCQ&language=en"
    })

    loader.load().then(() => {
      console.log(1);
      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 6.8041244, lng: 47.139488 },
        zoom: 4,
        mapId: '3007160f8e930d13'
      })
    })
  }
}


