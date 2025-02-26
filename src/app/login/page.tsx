import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { login } from "./actions";

export default function LoginPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<LoginForm action={login} />

				<Link
					href="/sign-up"
					className="text-sm text-muted-foreground text-center"
				>
					Don't have an account? Sign up
				</Link>
			</div>
		</main>
	);
}
