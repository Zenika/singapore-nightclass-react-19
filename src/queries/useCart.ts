import { useStock } from "@/queries/useStock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type Cart = {
	id: number;
	items: number;
};

const QUERY_KEY = ["cart"];

export function useCart() {
	const [cart, setCart] = useState<Cart | undefined>(undefined);
	const queryClient = useQueryClient();
	const { data, refetch, status, fetchStatus } = useQuery<Cart>({
		queryKey: QUERY_KEY,
		queryFn: async ({ signal }) => {
			const res = await fetch("/api/cart/1", { signal });
			const { data } = await res.json();
			return data;
		},
	});

	useEffect(() => {
		if (data) {
			setCart(data);
		}
	}, [data]);

	return {
		data: cart,
		refreshCart: async () => {
			return Promise.all([
				// refetch(),
				queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
				queryClient.invalidateQueries({ queryKey: useStock.QUERY_KEY }),
			]);
		},
	};
	// --------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------
	// const [data, setData] = useState<Cart | undefined>(undefined);
	//
	// useEffect(() => {
	// 	fetch("/api/cart")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.data));
	// }, []);
	//
	// return {
	// 	data,
	// 	refreshCart: async () => {
	// 		const res = await fetch("/api/cart");
	// 		const { data } = await res.json();
	// 		setData(() => data);
	// 	},
	// };
}
export function useUpdateCart() {
	const queryClient = useQueryClient();
	return useMutation<Cart>({
		mutationFn: async () => {
			const response = await fetch("/api/cart/1", { method: "post" });
			const json = await response.json();
			if (!response.ok) {
				throw new Error("No stokc");
			}
			const { data } = await response.json();
			return data;
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY });
			queryClient.invalidateQueries({ queryKey: useStock.QUERY_KEY });
		},
	});
}

useCart.QUERY_KEY = QUERY_KEY;
//
// export function useRefreshCart() {
// 	const queryClient = useQueryClient();
// 	return () =>
// 		queryClient.invalidateQueries({
// 			queryKey: useCart.QUERY_KEY,
// 		});
// }
