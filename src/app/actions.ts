"use server";

import type { JobFormValues } from "@/lib/schemas/jobs";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();

	redirect("/login");
}

export async function createJob(values: JobFormValues) {
	try {
		const supabase = await createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error("You must be logged in to create a job");
		}

		const { data, error } = await supabase.from("jobs").insert({
			...values,
			user_id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getJobs() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("You must be logged in to get jobs");
	}

	const { data, error } = await supabase
		.from("jobs")
		.select("*")
		.eq("user_id", user.id);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
