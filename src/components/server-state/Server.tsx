"use client";
import { useEffect, useState } from "react";

export function Server() {
	const [stock, setStock] = useState(0);
	const [cart, setCart] = useState(0);

	useEffect(() => {
		fetch("/api/cart/1")
			.then((res) => res.json())
			.then(({ data }) => setCart(data.items));
		fetch("/api/product/1")
			.then((res) => res.json())
			.then(({ data }) => setStock(data.stock));
	}, []);

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		fetch("/api/set-server", {
			method: "POST",
			body: JSON.stringify({ stock, cart }),
		}).then(() => window.location.reload());
	};
	return (
		<aside
			className={
				"my-4 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white"
			}
		>
			<h2 className={"font-bold text-2xl"}>Server state</h2>
			<form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
				<div
					className={
						"grid grid-cols-1 md:grid-cols-2 justify-items-stretch gap-2"
					}
				>
					<label htmlFor={"cart-content"}>Items in stock</label>
					<div className="join border flex">
						<button
							className="btn join-item"
							type="button"
							onClick={(e) => setStock((s) => s + 1)}
						>
							+
						</button>
						<input
							id="stock-content"
							readOnly
							className="join-item px-4 w-fit flex-1"
							type={"number"}
							value={stock}
						/>
						<button
							className="btn join-item"
							type="button"
							onClick={(e) => setStock((s) => s - 1)}
						>
							-
						</button>
					</div>
					<label htmlFor={"cart-content"}>Items in cart</label>
					<div className="join border flex">
						<button
							className="btn join-item"
							type="button"
							onClick={(e) => setCart((c) => c + 1)}
						>
							+
						</button>
						<input
							id="cart-content"
							readOnly
							className="join-item px-4 w-fit flex-1"
							type={"number"}
							value={cart}
						/>
						<button
							className="btn join-item"
							type="button"
							onClick={(e) => setCart((c) => c - 1)}
						>
							-
						</button>
					</div>
				</div>
				<button className={"btn"} type="submit">
					Refresh
				</button>
			</form>
		</aside>
	);
}
