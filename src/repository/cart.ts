import { db } from "@/repository/db";

type Cart = {
	id: number;
	items: number;
};

export function getCart(cartId: string): Cart | undefined {
	return db.prepare("SELECT * FROM carts WHERE id = ?").get(cartId) as
		| Cart
		| undefined;
}

export function addToCart(cartId: string): Cart | undefined {
	try {
		// FIXME: start db transaction and decrease stock
		let row: Cart | undefined;
		row = db
			.prepare("UPDATE carts SET items = items + 1 WHERE id = ? returning *")
			.get(cartId) as Cart | undefined;
		// const moveItemFromStockToCart = db.transaction(() => {
		// 	// updateProductStock(1, ???)
		// });
		return row;
	} catch (err) {
		if (!db.inTransaction) throw err; // (transaction was forcefully rolled back)
		throw err;
	}
}

export function resetCart(cartId: string): Cart | undefined {
	const row = db
		.prepare("UPDATE carts SET items = 0 WHERE id = ? returning *")
		.get(cartId) as Cart | undefined;
	return row;
}

export function setCart(cartId: string, items: number): Cart | undefined {
	const row = db
		.prepare("UPDATE carts SET items = ? WHERE id = ? returning *")
		.get(items, cartId) as Cart | undefined;
	return row;
}
