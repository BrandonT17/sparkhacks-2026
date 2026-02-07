import { redirect } from "next/navigation";

export default function Home() {
  // Logic happens here (e.g., checking if user is logged in)
  redirect('/dashboard');
  
  // No return statement needed after a redirect
}