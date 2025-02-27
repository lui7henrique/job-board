import { getJobs } from "@/app/actions";

export async function JobList() {
	const jobs = await getJobs();
	console.log({ jobs });

	return (
		<div>
			{jobs.map((job) => (
				<div key={job.id}>{job.description}</div>
			))}
		</div>
	);
}
