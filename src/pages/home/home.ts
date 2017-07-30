import { Component } from '@angular/core';
//Componentes
import { IonicPage, ToastController, Platform } from 'ionic-angular';
//Plugins
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
//Services
import { ScannerProvider } from './../../providers/scanner/scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private scanner: ScannerProvider
  ) { }

  scan() {
    console.log('Realizando scan');

    //Pruebas en el PC - Web - No Cordova
    if( !this.platform.is('cordova') ){
      // this.scanner.agregar_historial('https://www.google.es/');
      // this.scanner.agregar_historial('geo:41.9348915,0.24381719999996676');
      // this.scanner.agregar_historial('MATMSG:TO:jgmzn@hotmail.com;SUB:Ionic;BODY:Que pasa ko;;');
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log('Resultado texto: '+ barcodeData.text);
      console.log('Resultado formato: '+ barcodeData.format);
      console.log('Resultado cancelled: '+ barcodeData.cancelled);

      if (barcodeData.cancelled == false && barcodeData.text != null) {
        this.scanner.agregar_historial(barcodeData.text);
      }
    }, (err) => {
      // An error occurred
      console.error('Error: ', err);
      this.mostrar_error("Error: " + err);
    });
  }

  mostrar_error(err: string) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }

}
