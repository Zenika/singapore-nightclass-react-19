import { addToCart } from "@/repository/cart";
import { redirect } from "next/navigation";

export function POST() {
	let cart: ReturnType<typeof addToCart>;
	try {
		// Update cart
		cart = addToCart("1");
		if (cart === undefined) {
			return Response.json({ error: "Cart not found" }, { status: 404 });
		}
	} catch (e) {
		return Response.json(
			{ error: "No more stock for this product" },
			{ status: 422 },
		);
	}
	return redirect("/client-side");
}
