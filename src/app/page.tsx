import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { logout } from "./actions";

export default function Home() {
	return (
		<main className="py-16 h-screen">
			<section className="p-6 border border-dashed h-full rounded-lg max-w-2xl mx-auto bg-white">
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<h1 className="text-2xl font-bold">My notes</h1>

						<form action={logout}>
							<Button type="submit" variant="outline">
								Logout
							</Button>
						</form>
					</div>

					<div className="flex items-center gap-2">
						<Button>
							<PlusIcon className="size-4" />
							New note
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
