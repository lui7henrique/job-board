import { getJobs } from "@/app/actions";
import { format } from "date-fns";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { JobForm } from "./form";

type JobCardProps = { job: Awaited<ReturnType<typeof getJobs>>[number] };

function JobCard({ job }: JobCardProps) {
	return (
		<div className="flex gap-2 justify-between items-center hover:bg-muted -mx-2 px-2 py-2 rounded-lg cursor-pointer">
			<div className="flex gap-2 items-center">
				<div className="size-6 rounded-lg border bg-sky-500" />
				<h3 className="">
					{job.title}{" "}
					<span className="text-muted-foreground">at {job.company}</span>
				</h3>
			</div>

			<p className="text-sm text-muted-foreground">
				{format(new Date(job.created_at), "MMM d, yyyy")}
			</p>
		</div>
	);
}

export async function JobList() {
	const jobs = await getJobs();

	return (
		<section className="p-4">
			{jobs.map((job) => (
				<Dialog key={job.id}>
					<DialogTrigger asChild>
						<JobCard job={job} />
					</DialogTrigger>

					<DialogContent className="p-4">
						<DialogHeader className="sr-only">
							<DialogTitle>{job.title}</DialogTitle>
						</DialogHeader>

						<Tabs defaultValue="data" className="space-y-2">
							<TabsList>
								<TabsTrigger value="data">Data</TabsTrigger>
								<TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
							</TabsList>

							<TabsContent value="data">
								<JobForm
									initialData={{
										title: job.title,
										company: job.company,
										description: job.description,
									}}
								/>
							</TabsContent>
						</Tabs>
					</DialogContent>
				</Dialog>
			))}
		</section>
	);
}
