
/**
* 
*/
export type AddRecordDTO = {
  projectId?: number; // 
  record?: Record; // 
}

/**
* 
*/
export type Config = {
  blockClass?: string; // 
  blockSelector?: string; // 
  checkoutEveryNms?: number; // 
  checkoutEveryNth?: number; // 
  collectFonts?: boolean; // 
  createdBy?: string; // 
  createdDate?: string; // 
  hooks?: string; // 
  id?: number; // 
  ignoreClass?: string; // 
  inlineStylesheet?: boolean; // 
  isDeleted?: number; // 
  maskAllInputs?: boolean; // 
  maskInputFn?: string; // 
  maskInputOptions?: string; // 
  maskTextClass?: string; // 
  maskTextFn?: string; // 
  maskTextSelector?: string; // 
  packFn?: string; // 
  project?: Project; // 
  recordCanvas?: boolean; // 
  recordLog?: boolean; // 
  sampling?: string; // 
  slimDOMOptions?: string; // 
  updatedBy?: string; // 
  updatedDate?: string; // 
  userTriggeredOnInput?: boolean; // 
}

/**
* 
*/
export type Pageable = {
  offset?: number; // 
  pageNumber?: number; // 
  pageSize?: number; // 
  paged?: boolean; // 
  sort?: Sort; // 
  unpaged?: boolean; // 
}

/**
* 
*/
export type Page<T> = {
  content?: T[]; // 
  empty?: boolean; // 
  first?: boolean; // 
  last?: boolean; // 
  number?: number; // 
  numberOfElements?: number; // 
  pageable?: Pageable; // 
  size?: number; // 
  sort?: Sort; // 
  totalElements?: number; // 
  totalPages?: number; // 
}

/**
* 
*/
export type Project = {
  address?: string; // 
  recordTime?: number;
  config?: Config; // 
  createdBy?: string; // 
  createdDate?: string; // 
  id?: number; // 
  imageUrl?: string; // 
  isDeleted?: number; // 
  name?: string; // 
  description?: string;
  records?: []; // 
  updatedBy?: string; // 
  updatedDate?: string; // 
  users?: []; // 
  isDefault?: boolean;
}

/**
* 
*/
export type Record = {
  createdBy?: string; // 
  createdDate?: string; // 
  date?: string; // 
  events?: string; // 
  id?: number; // 
  isDeleted?: number; // 
  project?: Project; // 
  updatedBy?: string; // 
  updatedDate?: string; // 
}

/**
* 
*/
export type Response<T> = {
  code?: number; // 
  data?: T; // 
  msg?: string; // 
}

/**
* 
*/
export type Sort = {
  empty?: boolean; // 
  sorted?: boolean; // 
  unsorted?: boolean; // 
}

/**
* 
*/
export type UpdateConfigDTO = {
  config?: Config; // 
  projectId?: number; // 
}

/**
* 
*/
export type User = {
  createdBy?: string; // 
  createdDate?: string; // 
  id?: number; // 
  isDeleted?: number; // 
  name?: string; // 
  projects?: []; // 
  updatedBy?: string; // 
  updatedDate?: string; // 
}

/**
* 
*/
export type UserProjectDTO = {
  projectId?: number; // 
  userId?: number; // 
}
