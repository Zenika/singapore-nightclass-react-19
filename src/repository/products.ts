import { db } from "@/repository/db";
import { SqliteError } from "better-sqlite3";

type Product = {
	id: number;
	name: string;
	description: string;
	img: string;
	stock: number;
};

export function getAllProducts(): Product[] {
	const products = db.prepare("SELECT * from products").all() as Product[];

	return products;
}

export function getProduct(id: string): Product | undefined {
	const product = db.prepare("SELECT * from products where id = ?").get(id) as
		| Product
		| undefined;

	return product;
}

export function decrementProductStock(
	productId: string,
	stock: number,
): Product | undefined {
	try {
		const products = db
			.prepare("UPDATE products SET stock = stock - 1 WHERE id = ? returning *")
			.get(stock, productId) as Product | undefined;
		return products;
	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_CHECK") {
			throw new OutOfStockError();
		}
		throw e;
	}
}

export class OutOfStockError extends Error {
	constructor() {
		super("Product is out of stock");
	}
}

export function updateProductStock(
	productId: string,
	stock: number,
): Product | undefined {
	try {
		const products = db
			.prepare("UPDATE products SET stock = ? WHERE id = ? returning *")
			.get(stock, productId) as Product | undefined;

		return products;
	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_CHECK") {
			throw new OutOfStockError();
		}
		throw e;
	}
}
