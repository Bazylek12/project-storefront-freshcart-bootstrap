import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, of, shareReplay, startWith} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CategoryModel} from '../../models/category.model';
import {ProductModel} from '../../models/product.model';
import {CategoriesService} from '../../services/categories.service';
import {ProductsService} from '../../services/products.service';
import {FormControl} from "@angular/forms";
import {SortingOptionModel} from "../../models/sorting-option.model";

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
    switchMap(params => this._categoriesService.getOneCategory(params['categoryId'])),
    shareReplay(1)
  );
  readonly sortValue: FormControl = new FormControl('featureValueDescending');
  readonly sort$: Observable<string> = this.sortValue.valueChanges.pipe(
    startWith('featureValueDescending'),
    shareReplay(1)
  );
  readonly sortingOptions$: Observable<SortingOptionModel[]> = of([
    { name: 'Featured', value: 'featureValueDescending' },
    { name: 'Price: Low to High', value: 'priceAscending' },
    { name: 'Price: High to low', value: 'priceDescending' },
    { name: 'Avg. Rating', value: 'ratingValueDescending' }
  ])

  readonly productsList$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAllProducts().pipe(shareReplay(1)),
    this.category$,
    this.sort$
  ]).pipe(
    map(([products, category, sort]: [ProductModel[], CategoryModel, string]) =>
      this.sortProducts(products, category, sort)
    )
  );


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

  public sortProducts(products: ProductModel[], category: CategoryModel, sort: string): ProductModel[] {
    return products
      .filter((product) => product.categoryId.includes(category.id))
      .sort((a, b) => {
        if (sort === 'featureValueDescending') {
         return a.featureValue < b.featureValue ? 1 : -1;
        }
        if (sort === 'priceAscending') {
          return a.price > b.price ? 1 : -1;
        }
        if (sort === 'priceDescending') {
          return a.price < b.price ? 1 : -1;
        }
        if (sort === 'ratingValueDescending') {
          return a.ratingValue < b.ratingValue ? 1 : -1;
        }
        return 0;
      });
  }

}
