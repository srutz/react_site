import {ComponentPropsWithoutRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {flushSync} from "react-dom";

export type TransitionLinkProps = {
    to: string;
    children: React.ReactNode;
    disabled?: boolean;
} & ComponentPropsWithoutRef<'a'>

/*
 * Use instead of react-router-dom's Link or NavLink
 */
export function TransitionLink(props : TransitionLinkProps) {
    const { to, children, ...rest } = props
    const navigate = useNavigate() // programmatically navigate
    const location = useLocation() // current location to determine active state
    const active = location.pathname === to

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                flushSync(() => { navigate(to) })
            })
        } else {
            // fallback for older browsers
            navigate(to)
        }
    }
    const classes: string[] = []
    if (active) {
        classes.push("active")
    }
    if (rest.className) {
        classes.push(...rest.className.split(/\s+/))
    }

    return (
        <a {...rest} href={to} onClick={onClick} className={classes.join(" ")} aria-current={active ? "page" : undefined}>
            {children}
        </a>
    )
}