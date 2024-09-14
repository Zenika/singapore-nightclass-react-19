import { timeout } from "@/utils/timeout";

export async function getRelated_ASYNC() {
	await timeout(5000);
	const response = await fetch(
		"https://mock.shop/api?query=%7B%20products(first%3A%203%2C%20query%3A%20%22NOT%20gid%3A%2F%2Fshopify%2FProduct%2F7982905098262%22)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20featuredImage%20%7B%20id%20url%20%7D%20description%20%7D%20%7D%20%7D%7D",
	);
	if (!response.ok) {
		throw new Error("Failed to fetch related product");
	}
	const productsFromServer = (await response.json()) as RelatedProductsResponse;
	const productForClient: RelatedProducts =
		productsFromServer.data.products.edges.map(({ node }) => node);
	return productForClient;
}

export function getRelated_PROMISE() {
	return timeout(1000)
		.then(() =>
			fetch(
				"https://mock.shop/api?query=%7B%20products(first%3A%203%2C%20query%3A%20%22NOT%20gid%3A%2F%2Fshopify%2FProduct%2F7982905098262%22)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20featuredImage%20%7B%20id%20url%20%7D%20description%20%7D%20%7D%20%7D%7D",
			),
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Failed to fetch related product");
			}
			return res.json() as Promise<RelatedProductsResponse>;
		})
		.then(
			(productsFromServer) =>
				productsFromServer.data.products.edges.map(
					({ node }) => node,
				) as RelatedProducts,
		);
}

type RelatedProductsResponse = {
	data: {
		products: {
			edges: {
				node: {
					id: string;
					title: string;
					description: string;
					featuredImage: {
						id: string;
						url: string;
					};
				};
			}[];
		};
	};
};
type RelatedProducts = {
	id: string;
	title: string;
	description: string;
	featuredImage: {
		id: string;
		url: string;
	};
}[];

/*
 * https://mock.shop/?query=ewogIHByb2R1Y3RzKGZpcnN0OiAzLCBxdWVyeTogIk5PVCBnaWQ6Ly9zaG9waWZ5L1Byb2R1Y3QvNzk4MjkwNTA5ODI2MiIpIHsKICAgIGVkZ2VzIHsKICAgICAgbm9kZSB7IAogICAgICAgIGlkCiAgICAgICAgdGl0bGUKICAgIGZlYXR1cmVkSW1hZ2UgewogICAgICBpZAogICAgICB1cmwKICAgIH0KICAgICAgICBkZXNjcmlwdGlvbgogICAgICB9CiAgICB9CiAgfQp9Cg%3D%3D
{
  products(first: 3, query: "NOT gid://shopify/Product/7982905098262") {
    edges {
      node {
        id
        title
        description
        featuredImage {
          id
          url
        }
      }
    }
  }
}
 *
 */
