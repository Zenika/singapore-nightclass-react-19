"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { useFormStatus } from "react-dom";

export const Pending = () => {
	const { pending } = useFormStatus();
	return (
		<>{pending ? <div className="loading" /> : <div className="h-[2rem]" />}</>
	);
};

const ErrorContext = createContext<boolean>(false);

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = () => {
	const error = useContext(ErrorContext);

	return (
		<>
			{error ? (
				<div className="text-red-400 h-[2rem]">Out of stock</div>
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
	async function f(e: FormData) {
		setError(false);
		if (action && typeof action === "function") {
			const res = await (action(e) as unknown as Promise<boolean | undefined>);
			setError(!!res);
		}
	}

	const [error, setError] = useState<boolean>(false);

	return (
		<ErrorContext.Provider value={error}>
			<form {...props} action={f}>
				{children}
			</form>
		</ErrorContext.Provider>
	);
};
