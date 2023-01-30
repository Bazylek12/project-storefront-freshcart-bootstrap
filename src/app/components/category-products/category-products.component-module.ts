import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from './category-products.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent]
})
export class CategoryProductsComponentModule {
}
