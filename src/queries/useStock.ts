import { useQuery } from "@tanstack/react-query";

type Product = {
	id: number;
	name: string;
	description: string;
	img: string;
	stock: number;
};
const QUERY_KEY = ["product", "1"];
export function useStock() {
	return useQuery<Product>({
		queryKey: QUERY_KEY,
		queryFn: () =>
			fetch("/api/product/1")
				.then((res) => res.json())
				.then((data) => data.data),
	});
}

useStock.QUERY_KEY = QUERY_KEY;
