import { logout } from "./actions";

export default function Home() {
  return (
    <div>
      <h1>logado.</h1>
      
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}