<script>
	import { onDestroy } from "svelte";
	import { supabase } from "./supabase/client";
	import RedirectObserver from "./navigation/redirectObserver.svelte";
	import { session as supaSession, logoutEvent, signUpEvent, session } from "./supabase/clientStore";

	export let afterLoginRedirect = '/';
	export let afterSignupRedirect = '/';
	export let loginPageSlug = '/signin';

	supaSession.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		if (null !== session) {
			supaSession.set(session.user);
			document.location = afterLoginRedirect;
		}
	});

	const sessionSub = supaSession.subscribe(value => {
		if (value) {
			const currentPath = document.location.pathname;
			if ('authenticated' === $session?.role && (loginPageSlug === currentPath || '/signup' === currentPath)) {
				document.location = '/';
			}
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
			document.location = afterSignupRedirect;
		}
	});

	onDestroy(() => {
		// unsubscribe
		logout();
		signUp();
		sessionSub();
	});
</script>
<RedirectObserver />