import { ComponentPropsWithoutRef, CSSProperties } from "react";
import "./memory.css";

const animals = "🐶🐱🐭🐹🐰🦊🐻🐼🐻‍❄️🐨🐯🦁🐮🐷🐽🐸🐵🦍🦧🦮🐕🐩🐈🐅🐆🦓🦌🐎🦄🐐🐑🐏🐖🦙🐂🐃🦬🐄🐮🦏🦛🦣🐘🦒🦘🦥🦦🦨🦡🦫🦦🐿️🦔🦇🐓🦃🦆🦢🦉🦩🦜🦤🐦🦅🦇🦤🦋🐝🐞🦗🪳🕷️🦂🦟🪰🦠🐢🐍🐊🦎🐉🦕🦖🦭🐳🐋🦈🐬🐟🐠🐡🦑🦐🦞🦀🐚🐌";

export type Card = {
    type: number
    flipped: boolean
    alive: boolean
    url: string
}

export type MemoryCardProps = { 
    card: Card
} & ComponentPropsWithoutRef<'div'>

export function MemoryCard(props : MemoryCardProps) {
    const { card, ...rest} = props
    const content = "" + [card.type]
    const frontStyle: CSSProperties = {
        backgroundImage: `url(${card.url})`,
    }
    return (
        <div className={`memory-card cursor-pointer`} {...rest} >
            {card.alive && (
                <div className={`memory-card-body flipper ${card.flipped ? 'flip' : ''}`}>
                    <div className="front flex items-center justify-center" style={frontStyle}>
                    </div>
                    <div className="back flex items-center justify-center">
                    </div>
                </div>
            )}
        </div>
    )
}
