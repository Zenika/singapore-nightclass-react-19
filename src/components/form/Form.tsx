"use client";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import { useFormStatus } from "react-dom";

export const Pending = ({ children }: { children: ReactNode }) => {
	const { pending } = useFormStatus();
	console.log("pending", pending);
	return <>{pending ? <div>{children}</div> : <div className="h-[2rem]" />}</>;
};

const ErrorContext = createContext<string | undefined>(undefined);

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = ({ children }: { children: ReactNode }) => {
	const { pending } = useFormStatus();

	const error = useContext(ErrorContext);

	return (
		<>
			{error !== undefined ? (
				<div className="text-orange-400 h-[2rem]">Out of stock</div>
			) : (
				<div className="h-[2rem]" />
			)}
		</>
	);
};
export const Root = ({
	children,
	action,
	...props
}: React.DetailedHTMLProps<
	React.FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// const aaa = action as any as Promise<{ error: string } | undefined>;

	// useEffect(() => {
	// 	if (aaa) {
	// 		aaa.then((e: { error: string } | undefined) =>
	// 			console.log("{parent form got}:", e),
	// 		);
	// 	}
	// }, [aaa]);
	// 	// @ts-ignore
	// 	// biome-ignore lint/complexity/useOptionalChain: <explanation>
	// 	action &&
	// 		action.then &&
	async function f(e: FormData) {
		setError(undefined);
		if (action && typeof action === "function") {
			const res = await (action(e) as unknown as Promise<string | undefined>);
			console.log("<res>", res);
			setError(res);
		}
	}

	const [error, setError] = useState<string | undefined>(undefined);

	return (
		<ErrorContext.Provider value={error}>
			<form {...props} action={f}>
				{children}
			</form>
		</ErrorContext.Provider>
	);
};
