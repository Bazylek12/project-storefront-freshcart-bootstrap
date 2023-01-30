import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

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

  constructor(private _categoriesService: CategoriesService, private _activatedRoute: ActivatedRoute) {
  }
}
