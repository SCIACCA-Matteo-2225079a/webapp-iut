import router from "next/router";
import React from "react";
import { Package } from "react-feather";

type Props = {
	children: React.ReactNode,
	disabled?: boolean,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	type?: "button" | "submit" | "reset",
	href?: string,
	icon?: React.ReactNode
}

const Brand = ({ children, onClick, href, icon, disabled = false, type }: Props) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		} else if (href) {
			router.push(href);
		}
	};

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={handleClick}
			className="flex px-4 py-2 my-4 font-semibold text-white bg-blue-500 rounded-lg shadow-md justify-evenly hover:bg-blue-700 dark:bg-gold-500 dark:hover:bg-gold-700 focus:outline-none disabled:opacity-50"
		>
			<div className="mr-2">
				{icon || <Package />} {}
			</div>
			{children}
		</button>
	);
};

Brand.defaultProps = {
	disabled: false,
	onClick: undefined,
	type: "button",
	href: undefined,
	icon: undefined
};

export default Brand;
