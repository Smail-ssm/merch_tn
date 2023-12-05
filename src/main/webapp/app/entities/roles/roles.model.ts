export interface IRoles {
  id: number;
  name?: string | null;
  section?: string | null;
}

export type NewRoles = Omit<IRoles, 'id'> & { id: null };
