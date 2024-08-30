import Link from "next/link";

export default function Page() {
	return (
		<div className={"flex-1 flex flex-col gap-4 my-4"}>
			<h1>Items successfully added to the cart</h1>
			<Link href={"/client-side"} className={"btn btn-primary"}>
				Back to product page
			</Link>
		</div>
	);
}
