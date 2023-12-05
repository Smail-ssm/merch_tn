import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IVendorOrders } from '../vendor-orders.model';
import { VendorOrdersService } from '../service/vendor-orders.service';

@Component({
  standalone: true,
  templateUrl: './vendor-orders-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class VendorOrdersDeleteDialogComponent {
  vendorOrders?: IVendorOrders;

  constructor(
    protected vendorOrdersService: VendorOrdersService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vendorOrdersService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
