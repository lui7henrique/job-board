import { getJobs } from "@/app/actions";
import { format } from "date-fns";
export async function JobList() {
	const jobs = await getJobs();
	console.log({ jobs });

	return (
		<div>
			{jobs.map((job) => (
				<div key={job.id} className="flex gap-2 justify-between items-center">
					<div>
						<h3 className="">
							{job.title}{" "}
							<span className="text-muted-foreground">at {job.company}</span>
						</h3>
					</div>

					<p className="text-sm text-muted-foreground">
						{format(new Date(job.created_at), "MMM d, yyyy")}
					</p>
				</div>
			))}
		</div>
	);
}
