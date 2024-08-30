"use client";

import { useEffect, useState } from "react";

export default function Page() {
	const [items, setItems] = useState(0);

	useEffect(() => {
		fetch("http://localhost:3000/api/cart/1")
			.then((res) => res.json())
			.then(({ data }) => setItems(data.items));
	}, []);

	return (
		<div className="flex flex-row flex-1 my-4 items-start gap-4">
			<section className="flex-1">
				<h1 className={"font-bold text-2xl"}>Client side</h1>
				<article className={"flex flex-col gap-4"}>
					<h2>Men's Crewneck</h2>
					<img
						src={
							"https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenMenscrew01_400x400_crop_center.jpg?v=1675454919"
						}
						width={"400"}
						height={"400"}
						alt={"a green sweater with long sleeves"}
					/>
					<form action="/api/submit-cart" method="POST">
						<button className={"btn btn-primary"} type={"submit"}>
							Add to cart
						</button>
					</form>
				</article>
			</section>
			<aside className="flex-0 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white">
				<h2 className={"font-bold text-xl"}>your cart</h2>
				{items} items
			</aside>
		</div>
	);
}
