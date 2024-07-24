import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-affilate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './affilate.component.html',
  styleUrl: './affilate.component.css'
})
export class AffilateComponent {
  // declaration of form
  affiliateForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    //declaration of fields..
    this.affiliateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      message: ['', [Validators.required]],
    });

  }


  //sending mail..
  onSubmit() {
    console.log(this.affiliateForm.value);
    console.log("Name valid:", this.affiliateForm.get('name')?.valid);
    console.log("Email valid:", this.affiliateForm.get('email')?.valid);
    console.log("Contact number valid:", this.affiliateForm.get('contactNumber')?.valid);
    console.log("Message valid:", this.affiliateForm.get('message')?.valid);

    emailjs.init('zrYm5YurkWeA1Tag8');

    emailjs.send("service_rpgn218", "template_njk010e", {
      from_name: this.affiliateForm.get('name')?.value,
      to_name: "thorgames",
      from_email: this.affiliateForm.get('email')?.value,
      message: this.affiliateForm.get('message')?.value,
      from_contact: this.affiliateForm.get('contactNumber')?.value,
    });

    alert('message sent');
    this.affiliateForm.reset();

    if (this.affiliateForm.valid) {
      console.log("value", this.affiliateForm.value);

    } else {
      console.log("not valid");

    }
  }
}


