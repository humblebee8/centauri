<script>
	import { supabase } from "./supabase/client";
	import { session as supaSession } from "./supabase/clientStore";

	supaSession.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		if (null !== session) {
			supaSession.set(session.user);
		}
	});
</script>