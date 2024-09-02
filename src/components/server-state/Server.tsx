"use client";
import { useCart } from "@/queries/useCart";
import { useStock } from "@/queries/useStock";
import { useEffect, useState } from "react";
import { handleAction } from "./handle-action";

export function Server() {
	const [stock, setStock] = useState(0);
	const [cart, setCart] = useState(0);

	const { data: cartData } = useCart();
	const { data: stockData } = useStock();

	useEffect(() => {
		if (cartData) {
			setCart(() => cartData.items);
		}
	}, [cartData]);

	useEffect(() => {
		if (stockData) {
			setStock(() => stockData.stock);
		}
	}, [stockData]);

	const handleQuickSet = (e: { preventDefault: () => void }) => {
		fetch("/api/set-server", {
			method: "POST",
			body: JSON.stringify({ stock: 2, cart: 1 }),
		}).then(() => window.location.reload());
	};

	return (
		<aside
			className={
				"my-4 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white"
			}
		>
			<h2 className={"font-bold text-2xl"}>Server state</h2>
			<form className={"flex flex-col gap-4"} action={handleAction}>
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
							name="stock"
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
							name="cart"
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
				<div className="grid grid-cols-1 md:grid-cols-2 justify-items-stretch gap-2">
					<button className={"btn"} type="button" onClick={handleQuickSet}>
						Quickset
					</button>
					<button className={"btn"} type="submit">
						Refresh
					</button>
				</div>
			</form>
		</aside>
	);
}
