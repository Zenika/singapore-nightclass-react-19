import { getAllProducts } from "@/repository/products";

export function GET() {
	const products = getAllProducts();
	return Response.json({ data: products });
}
