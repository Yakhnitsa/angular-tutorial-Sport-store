import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: ProductRepository) {
  }

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string): void {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number): void {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  ngOnInit(): void {
  }

}
