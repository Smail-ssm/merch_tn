import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRoles, NewRoles } from '../roles.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRoles for edit and NewRolesFormGroupInput for create.
 */
type RolesFormGroupInput = IRoles | PartialWithRequiredKeyOf<NewRoles>;

type RolesFormDefaults = Pick<NewRoles, 'id'>;

type RolesFormGroupContent = {
  id: FormControl<IRoles['id'] | NewRoles['id']>;
  name: FormControl<IRoles['name']>;
  section: FormControl<IRoles['section']>;
};

export type RolesFormGroup = FormGroup<RolesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RolesFormService {
  createRolesFormGroup(roles: RolesFormGroupInput = { id: null }): RolesFormGroup {
    const rolesRawValue = {
      ...this.getFormDefaults(),
      ...roles,
    };
    return new FormGroup<RolesFormGroupContent>({
      id: new FormControl(
        { value: rolesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(rolesRawValue.name),
      section: new FormControl(rolesRawValue.section),
    });
  }

  getRoles(form: RolesFormGroup): IRoles | NewRoles {
    return form.getRawValue() as IRoles | NewRoles;
  }

  resetForm(form: RolesFormGroup, roles: RolesFormGroupInput): void {
    const rolesRawValue = { ...this.getFormDefaults(), ...roles };
    form.reset(
      {
        ...rolesRawValue,
        id: { value: rolesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RolesFormDefaults {
    return {
      id: null,
    };
  }
}
