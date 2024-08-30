import { addToCart } from "@/repository/cart";
import { redirect } from "next/navigation";

export function POST() {
	addToCart("1");
	return redirect("http://localhost:3000/client-side");
}
