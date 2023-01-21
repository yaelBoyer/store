import { Injectable } from '@angular/core';

export abstract class TokenStorage {

    abstract get(): string;
    abstract set(token: string);
    abstract clear();
}

@Injectable({
    providedIn: 'root'
})
export class TokenLocalStorage extends TokenStorage {

    protected key = 'auth_app_token';

    constructor() {
        super();
    }

    /**
     * Returns token from localStorage
     * @returns {string}
     */
    get(): string {
        const raw = localStorage.getItem(this.key);
        return raw;
    }

    /**
     * Sets token to localStorage
     * @param {string} token
     */
    set(token: string) {
        localStorage.setItem(this.key, token);
    }

    /**
     * Clears token from localStorage
     */
    clear() {
        localStorage.removeItem(this.key);
    }
}
