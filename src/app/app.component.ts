import {Component} from '@angular/core';
import {IProduct} from "./models/product";
import {products as data} from './data/product'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Buzzing version 14';

  products: IProduct[] = data
}
