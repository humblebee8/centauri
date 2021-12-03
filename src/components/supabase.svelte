<script>
	import { onMount, onDestroy } from "svelte";
	import { supabase } from "./supabase/client";
	import { session as supaSession, logoutEvent } from "./supabase/clientStore";
  
	export let redirectToLogin = '/';
	export let loginPageSlug = '/login';

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

	onMount(() => {
		if ('authenticated' === $supaSession?.role && loginPageSlug === document.location.pathname) {
			document.location = '/';
		}
	});

	onDestroy(() => {
		logout();
	});
</script>
<div on:clicked={(e) => {console.log(e.detail.slug)}}></div>