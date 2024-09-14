import { addToCart, getCart, resetCart } from "@/repository/cart";
import { timeout } from "@/utils/timeout";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const cart = getCart(params.id);

	// await timeout(750);
	if (cart === undefined) {
		return Response.json({ error: "Cart not found" }, { status: 404 });
	}
	return Response.json({ data: cart }, { status: 200 });
}

export async function POST(
	request: Request,
	{ params }: { params: { id: string } },
) {
	let cart: ReturnType<typeof addToCart>;

	await timeout(1000);
	try {
		// Update cart
		cart = addToCart(params.id);
		if (cart === undefined) {
			return Response.json({ error: "Cart not found" }, { status: 404 });
		}
	} catch (e) {
		return Response.json(
			{ error: "No more stock for this product" },
			{ status: 422 },
		);
	}
	return Response.json({ data: cart }, { status: 200 });
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// Update cart
	const cart = resetCart(params.id);
	if (cart === undefined) {
		return Response.json({ error: "Cart not found" }, { status: 404 });
	}
	return Response.json({ data: cart }, { status: 200 });
}
