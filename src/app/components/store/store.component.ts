import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, debounceTime, Observable, shareReplay, startWith} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ProductModel} from '../../models/product.model';
import {StoreModel} from '../../models/store.model';
import {ProductsService} from '../../services/products.service';
import {StoresService} from '../../services/stores.service';

@Component({
  selector: 'app-store',
  styleUrls: ['./store.component.scss'],
  templateUrl: './store.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreComponent {

  readonly products$: Observable<ProductModel[]> = this._productsService.getAllProducts().pipe(shareReplay(1));
  readonly searchValue: FormControl = new FormControl('');
  readonly store$: Observable<StoreModel> = this._activatedRoute.params.pipe(
    switchMap((params) => this._storesService.getOneStore(params['storeId']).pipe(
      map(store => ({
        ...store,
        distanceInMeters: +(store.distanceInMeters / 1000).toFixed(1)
      }))
    )),
    shareReplay(1)
  );

  readonly productsList$: Observable<ProductModel[]> = combineLatest([
    this.products$,
    this.store$,
    this.searchValue.valueChanges.pipe(
      startWith(''),
      shareReplay(1),
      debounceTime(1000),
    )
  ]).pipe(
    map(([products, store, form]: [ProductModel[], StoreModel, string]) =>
      products.filter(product => product.storeIds.includes(store.id) &&
        product.name.toLowerCase().includes(form?.toLowerCase()))
    )
  )

  constructor(private _productsService: ProductsService, private _activatedRoute: ActivatedRoute, private _storesService: StoresService) {
  }

}
