import { Injectable } from '@angular/core';
import { AuthService } from '../../services';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const GUESTITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
];


const LOGGEDITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'orders',
    name: 'Order',
    type: 'link',
    icon: 'view_list'
  },
];


@Injectable()
export class MenuService {

  constructor(private AuthService: AuthService) { }

  getAll(): Menu[] {
    if (!!this.AuthService.getuserData())
      return LOGGEDITEMS;
    else
      return GUESTITEMS;
  }

  add(menu) {
    GUESTITEMS.push(menu);
  }
}
