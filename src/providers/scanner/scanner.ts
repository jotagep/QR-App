import { Injectable } from '@angular/core';
import { ScanData } from './../../model/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts'
import { ModalController, Platform, ToastController } from "ionic-angular";
import { parse_vcard } from "../../parse/vcard";


@Injectable()
export class ScannerProvider {

  private _historial: ScanData[] = [];

  constructor(
    private iab: InAppBrowser,
    private modalController: ModalController,
    private contacts: Contacts,
    private platform: Platform,
    private toastCtrl: ToastController
  ) {

  }

  agregar_historial(texto: string) {

    let data = new ScanData(texto);
    this._historial.unshift(data);
    this.abrir_scan(0);
  }

  abrir_scan(index: number) {
    let scanData = this._historial[index];
    console.log(scanData);

    switch (scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break
      case "map":
        this.modalController.create('MapaPage', { 'coords': scanData.info })
          .present();
        break
      case "contacto":
        this.crear_contacto(scanData.info);
        break
      case "mail":
        //MATMSG:TO:jgmzn@hotmail.com;SUB:Ionic;BODY:Que pasa ko;;
        let htmlLink = scanData.info;

        htmlLink = htmlLink.replace('MATMSG:TO:', 'mailto:');
        htmlLink = htmlLink.replace(';SUB:', '?subject=');
        htmlLink = htmlLink.replace(';BODY:', '&body=');
        htmlLink = htmlLink.replace(';;', '');
        htmlLink = htmlLink.replace(/ /g, '%20');

        console.log(htmlLink);
        this.iab.create(htmlLink, '_system');
      break
      default:
        console.error("Tipo no soportado");
    }
  }

  crear_contacto(texto: string) {
    let campos: any = parse_vcard(texto);
    console.log(campos);

    let nombre = campos.fn;
    let tel = campos.tel[0].value[0];

    if (!this.platform.is('cordova')) {
      console.warn("Estoy en la computadora, no se puede añadir contactos");
      return;
    }

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    contact.save().then(
      () => this.crear_toast("Contacto "+ nombre +" creado!"), 
      (error: any) =>  this.crear_toast("Error: "+ error)
    );
  }

  crear_toast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }

  cargar_historial(): ScanData[] {
    return this._historial;
  }

}
