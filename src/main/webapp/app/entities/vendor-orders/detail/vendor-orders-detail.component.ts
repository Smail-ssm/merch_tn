import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IVendorOrders } from '../vendor-orders.model';

@Component({
  standalone: true,
  selector: 'jhi-vendor-orders-detail',
  templateUrl: './vendor-orders-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class VendorOrdersDetailComponent {
  @Input() vendorOrders: IVendorOrders | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
