import * as Form from "@/components/form/Form";
import { RelatedProductsClient } from "@/components/product/RelatedProductClient";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getRelated_PROMISE } from "@/components/product/getRelatedProduct";
import { addToCart, getCart } from "@/repository/cart";
import { timeout } from "@/utils/timeout";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
	const cart = getCart("1");
	if (!cart) {
		notFound();
	}

	async function handleAction() {
		"use server";
		await timeout(1000);
		try {
			// Update cart
			addToCart("1");
			revalidatePath("/");
			return false;
		} catch (e) {
			return true;
		}
	}

	const promise = getRelated_PROMISE();

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

					<Suspense fallback={<div className="loading" />}>
						<RelatedProducts />
					</Suspense>

					<Suspense fallback={<div className="loading" />}>
						<RelatedProductsClient relatedProductsPromise={promise} />
					</Suspense>
				</section>
				<Form.Root
					action={handleAction}
					className="flex-0 p-4 rounded bg-gray-200 text-slate-950 dark:bg-slate-800 dark:text-white text-2xl"
				>
					<button className="btn btn-primary" type="submit">
						Add to cart
					</button>
					<h2 className="text-4xl font-bold">your cart</h2>

					<div className="h-[2rem]">{cart.items} items</div>

					<Form.Pending />
					<Form.Error />
				</Form.Root>
			</article>
		</>
	);
}
