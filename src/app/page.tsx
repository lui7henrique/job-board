import { JobForm } from "@/components/jobs/form";
import { JobList } from "@/components/jobs/job-list";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import { LogOut, PlusIcon } from "lucide-react";
import { createJob, logout } from "./actions";

export default async function Home() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();

	return (
		<main className="py-16 h-screen">
			<section className="p-6 border border-dashed h-full rounded-lg max-w-2xl mx-auto bg-white space-y-4">
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<form action={logout}>
							<Button
								type="submit"
								variant="outline"
								size="icon"
								className="size-6"
							>
								<LogOut className="size-3" />
							</Button>
						</form>

						<p className="text-sm text-muted-foreground">{data.user?.email}</p>
					</div>

					<div className="flex items-center gap-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm">
									<PlusIcon className="size-4" />
									New job
								</Button>
							</DialogTrigger>

							<DialogContent className="p-0">
								<DialogHeader className="sr-only">
									<DialogTitle>New job</DialogTitle>
								</DialogHeader>

								<JobForm action={createJob} />
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<JobList />
			</section>
		</main>
	);
}
