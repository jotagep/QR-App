import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScannerProvider } from './../../providers/scanner/scanner';
import { ScanData } from './../../model/scan-data.model';



@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  historial: ScanData[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scanner: ScannerProvider
  ) { }

  ionViewDidLoad () {
    this.historial = this.scanner.cargar_historial();
  }

  abrir_scan(index: number) {
    this.scanner.abrir_scan(index);
  }
}
