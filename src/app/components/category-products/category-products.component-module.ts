import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from './category-products.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent]
})
export class CategoryProductsComponentModule {
}
