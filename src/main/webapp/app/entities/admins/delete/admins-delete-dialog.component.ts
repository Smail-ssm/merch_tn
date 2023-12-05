import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAdmins } from '../admins.model';
import { AdminsService } from '../service/admins.service';

@Component({
  standalone: true,
  templateUrl: './admins-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AdminsDeleteDialogComponent {
  admins?: IAdmins;

  constructor(
    protected adminsService: AdminsService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adminsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
