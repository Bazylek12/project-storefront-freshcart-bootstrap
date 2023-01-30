import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CategoryModel} from '../../models/category.model';
import {ProductModel} from '../../models/product.model';
import {CategoriesService} from '../../services/categories.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {
  readonly categoriesList$: Observable<CategoryModel[]> = this._categoriesService.getAllCategories();
  readonly category$: Observable<CategoryModel> = this._activatedRoute.params.pipe(
    switchMap(params => this._categoriesService.getOneCategory(params['categoryId'])));
  readonly productsList$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAllProducts(),
    this.category$,
  ]).pipe(
    map(([products, category]: [ProductModel[], CategoryModel]) =>
      products.filter(product => product.categoryId.includes(category.id))
    )
  )


  constructor(private _categoriesService: CategoriesService, private _activatedRoute: ActivatedRoute, private _productsService: ProductsService) {
  }

  public starClass(ratingValue: number, star: number): string {
    if (ratingValue >= star) {
      return 'bi-star-fill';
    }
    if (ratingValue + 1 > star && ratingValue % 1 !== 0) {
      return 'bi-star-half';
    }
    return 'bi-star';
  }

}
