import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProducListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConverTospacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProducListComponent,
    ProductDetailComponent,
    ConverTospacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        component: ProducListComponent,
      },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}
