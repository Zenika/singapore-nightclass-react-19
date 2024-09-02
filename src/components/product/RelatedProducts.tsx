import { getRelated_ASYNC } from "@/components/product/getRelatedProduct";

export async function RelatedProducts() {
	const products = await getRelated_ASYNC();

	return (
		<>
			<h2 className={"text-xl"}>Related Products</h2>
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
