"use server";

import type { SignUpFormValues } from "@/lib/schemas/sign-up";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(data: SignUpFormValues) {
	const supabase = await createClient();
	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
