import { SignUpForm } from "@/components/auth/sign-up-form";
import { signup } from "./actions";

export default function SignUpPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<SignUpForm action={signup} />
			</div>
		</main>
	);
}
