import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthService {

    constructor(
        public router: Router,
        private CookieService: CookieService) { }

    setuserData(token: string) {
        this.CookieService.remove('User');
        this.CookieService.put('User', token)
    }
    getuserData() {
        var User = this.CookieService.get('User')
        if (User)
            return this.CookieService.get('User')
        return
    }

    removeuserdata() {
        this.CookieService.removeAll();
    }
}
