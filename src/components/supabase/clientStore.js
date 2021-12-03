import { writable } from 'svelte/store';
export const session = writable();
export const logoutEvent = writable(false);
export const signUpEvent = writable(false);