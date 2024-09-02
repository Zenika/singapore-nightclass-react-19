import { setCart } from "@/repository/cart";
import { updateProductStock } from "@/repository/products";

export async function POST(request: Request) {
	const { stock, cart } = await request.json();
	try {
		// product id and cart id are hardcoded
		setCart("1", cart);
		updateProductStock("1", stock);
	} catch (e) {
		console.log(e);
	}
	return Response.json({}, { status: 201 });
}
