import { ID } from './_types';

// 0 is Sunday, 6 is Saturday
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DateTime<Server extends boolean> = Server extends true ? Date : string;

export type BaseDto<Server extends boolean = false> = {
  id: ID;
  createdAt: DateTime<Server>;
  updatedAt: DateTime<Server>;
  deletedAt: DateTime<Server> | null;
  clientId?: string | number;
};

export type BaseRelationDto = {
  id: ID;
};

// Body attrs for bulk creating, updating and deleting
export type BulkAttr<Body> = Array<Body & { id?: ID }>;
