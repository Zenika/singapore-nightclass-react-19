import type { getRelated_PROMISE } from "@/components/product/getRelatedProduct";
import { use } from "react";

export function RelatedProductsClient({
	relatedProductsPromise,
}: { relatedProductsPromise: ReturnType<typeof getRelated_PROMISE> }) {
	const products = use(relatedProductsPromise);

	return (
		<>
			<h2 className={"text-xl"}>Related Products Client side</h2>
			<ul className={"flex gap-4 my-4"}>
				{products.map((product) => (
					<li key={product.id} className={"rounded bg-gray-100 p-2"}>
						<div className={"flex flex-col gap-2"}>
							<h2 className={"text-slate-950"}>{product.title}</h2>
							<img width="150" src={product.featuredImage.url} alt="" />
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
