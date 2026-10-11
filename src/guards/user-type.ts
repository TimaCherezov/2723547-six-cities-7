import { UserType } from '../shared/types/index.js';

export const isAvailableUserType = (type: string): type is UserType => type === 'basic' || type === 'pro';
