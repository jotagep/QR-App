import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat: number;
  lng: number;

  constructor( 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {

    let coordsArray = this.navParams.get('coords').slice(4).split(",");

    this.lat = Number ( coordsArray[0] );
    this.lng = Number ( coordsArray[1] );

    console.log(this.lat,this.lng);
  }

  cerrar_modal () {
    this.viewCtrl.dismiss();
    console.log("Mapa cerrado");
  }
}
