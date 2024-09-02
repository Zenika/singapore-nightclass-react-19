"use server";
import { setCart } from "@/repository/cart";
import { updateProductStock } from "@/repository/products";
import { revalidatePath } from "next/cache";

export async function handleAction(formData: FormData) {
	console.log(">>", JSON.stringify(formData));
	const stock = formData.get("stock");
	const cart = formData.get("cart");
	if (!stock || !cart) {
		return;
	}
	try {
		// product id and cart id are hardcoded
		setCart("1", Number(cart));
		updateProductStock("1", Number(stock));
	} catch (e) {
		console.log("error", e);
		return;
	}

	revalidatePath("/client-side");
}
