"use client";

import { useCart } from "@/queries/useCart";
import { useActionState } from "react";

export default function Page() {
	const { data, refreshCart } = useCart();
	const [error, action, isPending] = useActionState(async () => {
		const res = await fetch("/api/cart/1", { method: "POST" });
		if (!res.ok) {
			return true;
		}
		await refreshCart();
		return false;
	}, false);

	async function handleAction() {
		action();
	}

	return (
		<>
			{/* PAGE */}
			<article className="flex flex-row flex-1 my-4 items-start gap-4">
				<section className="flex-1 flex flex-col items-start gap-4">
					<h1 className="font-bold text-2xl">Product page</h1>
					<section className="flex flex-col gap-4 bg-gray-100 rounded p-2">
						<h2 className={"text-2xl text-slate-950"}>Men's Crewneck</h2>
						<img
							src="https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenMenscrew01_400x400_crop_center.jpg?v=1675454919"
							width="400"
							height="400"
							alt="a green sweater with long sleeves"
						/>
					</section>
				</section>
				<form
					action={handleAction}
					className="flex-0 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white text-2xl"
				>
					<button className="btn btn-primary" type="submit">
						Add to cart
					</button>
					<h2 className="text-4xl font-bold">your cart</h2>
					{data ? (
						<div className="h-[2rem]">{data.items} items</div>
					) : (
						<div className="h-[2rem]" />
					)}
					{!data || isPending ? (
						<div className="loading" />
					) : (
						<div className="h-[2rem]" />
					)}
					{error ? (
						<div className="text-red-400">Out of stock</div>
					) : (
						<div className="h-[2rem]" />
					)}
				</form>
			</article>
		</>
	);
}
