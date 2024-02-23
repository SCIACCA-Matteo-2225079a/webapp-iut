import router from "next/router";
import React from "react";
import { Package } from "react-feather";

type Props = {
	children: React.ReactNode,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	type?: "button" | "submit" | "reset",
	href?: string,
	icon?: React.ReactNode
}

const Brand = ({ children, onClick, href, icon, type }: Props) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		} else if (href) {
			router.push(href);
		}
	};

	/* eslint-disable react/button-has-type */
	return (
		<button
			type={type || "button"}
			onClick={handleClick}
			className="flex px-4 py-2 my-4 font-semibold text-white bg-blue-500 rounded-lg shadow-md justify-evenly hover:bg-blue-700 dark:bg-gold-500 dark:hover:bg-gold-700 focus:outline-none disabled:opacity-50"
		>
			<div className="mr-2">
				{icon || <Package />} {}
			</div>
			{children}
		</button>
	);
	/* eslint-enable react/button-has-type */
};

Brand.defaultProps = {
	onClick: undefined,
	type: "button",
	href: undefined,
	icon: undefined
};

export default Brand;

