import { Link, LinkProps, useLocation } from "react-router-dom";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
    const path = useLocation().pathname
    const className = path == rest.to ? activeClassName : ''

    return(
        <Link {...rest}>
            { cloneElement(children, {
                className
            }) }
        </Link>
    );
}