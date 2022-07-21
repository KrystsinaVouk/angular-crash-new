import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  constructor(private modalService: ModalService, private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  submit() {
    // console.log(this.form.value)
    // console.log(this.title.errors)

    if (!this.title.errors) {
      this.productService.create({
        title: this.form.value.title as string,
        price: 13.5,
        description: 'lorem',
        image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
        category: 'electronic',
        rating: {
          rate: 24,
          count: 42
        }
      }).subscribe(() => this.modalService.close())
    }
  }

}
