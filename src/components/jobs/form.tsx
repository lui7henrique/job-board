"use client";

import type { createJob } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type JobFormValues, jobSchema } from "@/lib/schemas/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface JobFormProps {
	initialData?: JobFormValues;
	action: typeof createJob;
}

export function JobForm({ initialData, action }: JobFormProps) {
	const form = useForm<JobFormValues>({
		resolver: zodResolver(jobSchema),
		defaultValues: initialData || {
			title: "",
			company: "",
			description: "",
		},
	});

	async function onSubmit(values: JobFormValues) {
		await action(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex flex-col"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Title</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Frontend Developer" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Acme Inc." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Describe the job responsibilities, requirements, and benefits..."
									className="h-[200px] overflow-y-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{initialData ? "Update" : "Create"}
				</Button>
			</form>
		</Form>
	);
}
