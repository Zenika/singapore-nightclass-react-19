import { addToCart, getCart, resetCart } from "@/repository/cart";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const cart = getCart(params.id);
	if (cart === undefined) {
		return Response.json({ error: "Cart not found" }, { status: 404 });
	}
	return Response.json({ data: cart }, { status: 200 });
}

export async function POST(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// Update cart
	const cart = addToCart(params.id);
	if (cart === undefined) {
		return Response.json({ error: "Cart not found" }, { status: 404 });
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
