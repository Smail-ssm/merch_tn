import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IVendorOrders } from '../vendor-orders.model';
import { VendorOrdersService } from '../service/vendor-orders.service';
import { VendorOrdersFormService, VendorOrdersFormGroup } from './vendor-orders-form.service';

@Component({
  standalone: true,
  selector: 'jhi-vendor-orders-update',
  templateUrl: './vendor-orders-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class VendorOrdersUpdateComponent implements OnInit {
  isSaving = false;
  vendorOrders: IVendorOrders | null = null;

  editForm: VendorOrdersFormGroup = this.vendorOrdersFormService.createVendorOrdersFormGroup();

  constructor(
    protected vendorOrdersService: VendorOrdersService,
    protected vendorOrdersFormService: VendorOrdersFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vendorOrders }) => {
      this.vendorOrders = vendorOrders;
      if (vendorOrders) {
        this.updateForm(vendorOrders);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vendorOrders = this.vendorOrdersFormService.getVendorOrders(this.editForm);
    if (vendorOrders.id !== null) {
      this.subscribeToSaveResponse(this.vendorOrdersService.update(vendorOrders));
    } else {
      this.subscribeToSaveResponse(this.vendorOrdersService.create(vendorOrders));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVendorOrders>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(vendorOrders: IVendorOrders): void {
    this.vendorOrders = vendorOrders;
    this.vendorOrdersFormService.resetForm(this.editForm, vendorOrders);
  }
}
