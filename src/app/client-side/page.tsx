import * as Form from "@/components/form/Form";
import { RelatedProductsClient } from "@/components/product/RelatedProductClient";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getRelated_ASYNC } from "@/components/product/getRelatedProduct";
import { addToCart, asyncGetCart } from "@/repository/cart";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
	const data = await asyncGetCart("1");
	const promise = getRelated_ASYNC();

	if (!data) {
		notFound();
	}

	async function handleSubmit() {
		"use server";
		try {
			const _ = addToCart("1");
		} catch (e) {
			return { error: "No more stock for this product" };
		}
		revalidatePath("/client-side");
	}

	return (
		<>
			{/* META */}
			<title>Awesome sweater</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="stylesheet" href="./custom.css" />
			{/* PAGE */}
			<div className="flex flex-row flex-1 my-4 items-start gap-4">
				<section className="flex-1 flex flex-col items-start gap-4">
					<h1 className="font-bold text-2xl">Client side</h1>
					<article className="flex flex-col gap-4 bg-gray-100 rounded p-2">
						<h2 className={"text-xl text-slate-950"}>Men's Crewneck</h2>
						<img
							src="https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenMenscrew01_400x400_crop_center.jpg?v=1675454919"
							width="400"
							height="400"
							alt="a green sweater with long sleeves"
						/>
					</article>
				</section>
				<aside className="flex-0 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white text-2xl">
					<Form.Root action={handleSubmit}>
						<button className="btn btn-primary" type="submit">
							Add to cart
						</button>
						<h2 className="text-4xl font-bold">your cart</h2>
						<div className="h-[2rem]">{data.items} items</div>

						<Form.Pending>Loading...</Form.Pending>
						<Form.Error>EROROROR</Form.Error>
					</Form.Root>
				</aside>
			</div>

			<aside>
				<Suspense fallback={"Loading similar products from server!"}>
					<RelatedProducts />
				</Suspense>
			</aside>
			<aside>
				<Suspense
					fallback={
						<>
							<span className="loading loading-spinner loading-xs mr-4" />
							<span>Loading similar products from client!</span>
						</>
					}
				>
					<RelatedProductsClient relatedProductsPromise={promise} />
				</Suspense>
			</aside>
		</>
	);
}
