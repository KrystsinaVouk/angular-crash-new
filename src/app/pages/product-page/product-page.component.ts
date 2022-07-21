import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  title = 'Buzzing version 14';
  modalTitle = 'Create New Product';
  term = ''
  loading = false
  products$: Observable<IProduct[]>

  /*  products: IProduct[] = data*/

  constructor(public productService: ProductService, public modalService: ModalService) {
  }

  ngOnInit() {
    this.loading = true
    this.productService.getAll().subscribe(
      () => this.loading = false
    )
    /*    this.productService.getAll().subscribe((products)=>{
          this.products = products
          this.loading = false
        })*/
  }

}
