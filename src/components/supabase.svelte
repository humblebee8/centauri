<script>
	import { onMount, onDestroy } from "svelte";
	import { supabase } from "./supabase/client";
	import { session as supaSession, logoutEvent, signUpEvent } from "./supabase/clientStore";
  
	export let redirectToLogin = '/';
	export let redirectAfterSignUp = '/';
	export let loginPageSlug = '/signin';

	supaSession.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		if (null !== session) {
			supaSession.set(session.user);
			document.location = redirectToLogin;
		}
	});

	const logout = logoutEvent.subscribe(value => {
		if (value && true === value) {
			// fail silent
			supabase.auth.signOut();
			logoutEvent.set(false);
			document.location = loginPageSlug;
		}
	});

	const signUp = signUpEvent.subscribe(value => {
		if (value && true === value) {
			// fail silent
			signUpEvent.set(false);
			document.location = redirectAfterSignUp;
		}
	});

	onMount(() => {
		if ('authenticated' === $supaSession?.role && loginPageSlug === document.location.pathname) {
			document.location = '/';
		}
	});

	onDestroy(() => {
		// unsubscribe
		logout();
		signUp();
	});
</script>
<div on:clicked={(e) => {console.log(e.detail.slug)}}></div>