import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOrders } from '../orders.model';
import { OrdersService } from '../service/orders.service';
import { OrdersFormService, OrdersFormGroup } from './orders-form.service';

@Component({
  standalone: true,
  selector: 'jhi-orders-update',
  templateUrl: './orders-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OrdersUpdateComponent implements OnInit {
  isSaving = false;
  orders: IOrders | null = null;

  editForm: OrdersFormGroup = this.ordersFormService.createOrdersFormGroup();

  constructor(
    protected ordersService: OrdersService,
    protected ordersFormService: OrdersFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
      if (orders) {
        this.updateForm(orders);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orders = this.ordersFormService.getOrders(this.editForm);
    if (orders.id !== null) {
      this.subscribeToSaveResponse(this.ordersService.update(orders));
    } else {
      this.subscribeToSaveResponse(this.ordersService.create(orders));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrders>>): void {
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

  protected updateForm(orders: IOrders): void {
    this.orders = orders;
    this.ordersFormService.resetForm(this.editForm, orders);
  }
}
