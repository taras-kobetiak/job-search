import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { IJobFullInfo } from 'src/app/interfaces/jobFullInfo.interface';
import { LoadingService } from 'src/app/services/loading/loading-service.service';
import { ILatLng } from '../../interfaces/lat-lng.interface';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {
  @Input() currentJob: IJobFullInfo;

  map: google.maps.Map;
  myLatLng: ILatLng = { lat: 0, lng: 0 };

  constructor(private loadingService: LoadingService) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadingService.setValue(true), 0)
  }

  ngOnInit(): void {
    this.myLatLng.lat = Number(this.currentJob.location.lat);
    this.myLatLng.lng = Number(this.currentJob.location.long);
    let loader = new Loader({
      apiKey: "AIzaSyBwvLprVfcd1yl2skYYkGk6clqw49rnRCQ&language=en"
    })

    loader.load().then(() => {
      this.loadingService.setValue(false);

      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.myLatLng,
        zoom: 4,
        mapId: '3007160f8e930d13',
      });

      new google.maps.Marker({
        position: this.myLatLng,
        map: this.map,
        icon: "../../../../../assets/img/Shape.png"
      });
    })
  }
}


