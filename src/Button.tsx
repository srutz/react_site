import {ComponentPropsWithoutRef, ReactNode} from "react";

type ButtonProps= { children?: ReactNode } & ComponentPropsWithoutRef<"button">

export function Button(props: ButtonProps) {
    const { children, ... rest } = props
    return (
        <button {...rest} className="mybutton">{children}</button>
    )
}