import {
	OutOfStockError,
	getProduct,
	updateProductStock,
} from "@/repository/products";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// Update cart
	let product: ReturnType<typeof getProduct>;

	try {
		product = getProduct(params.id);
	} catch (e) {
		return Response.json({ error: (e as Error).message }, { status: 500 });
	}

	if (product === undefined) {
		return Response.json({ error: "Product not found" }, { status: 404 });
	}
	return Response.json({ data: product }, { status: 200 });
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// Update cart
	const { stock } = await request.json();
	let product: ReturnType<typeof updateProductStock>;

	try {
		product = updateProductStock(params.id, stock);
	} catch (e) {
		if (e instanceof OutOfStockError) {
			return Response.json({ error: e.message }, { status: 422 });
		}
	}

	if (product === undefined) {
		return Response.json({ error: "Product not found" }, { status: 404 });
	}
	return Response.json({ data: product }, { status: 200 });
}
