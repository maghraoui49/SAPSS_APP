import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {
  prenom!: string
  nom!: string
  email!: string
  despon!: string
  comentaire!: string

  envoyee :boolean = false
  constructor( private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  envoyer() {
    this.prenom='';
    this.nom='';
    this.email=''
    this.despon=''
    this.comentaire=''
    this.envoyee  = true

  }
}
