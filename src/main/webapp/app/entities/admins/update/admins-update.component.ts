import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAdmins } from '../admins.model';
import { AdminsService } from '../service/admins.service';
import { AdminsFormService, AdminsFormGroup } from './admins-form.service';

@Component({
  standalone: true,
  selector: 'jhi-admins-update',
  templateUrl: './admins-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AdminsUpdateComponent implements OnInit {
  isSaving = false;
  admins: IAdmins | null = null;

  editForm: AdminsFormGroup = this.adminsFormService.createAdminsFormGroup();

  constructor(
    protected adminsService: AdminsService,
    protected adminsFormService: AdminsFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ admins }) => {
      this.admins = admins;
      if (admins) {
        this.updateForm(admins);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const admins = this.adminsFormService.getAdmins(this.editForm);
    if (admins.id !== null) {
      this.subscribeToSaveResponse(this.adminsService.update(admins));
    } else {
      this.subscribeToSaveResponse(this.adminsService.create(admins));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdmins>>): void {
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

  protected updateForm(admins: IAdmins): void {
    this.admins = admins;
    this.adminsFormService.resetForm(this.editForm, admins);
  }
}
