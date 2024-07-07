import { ComponentPropsWithoutRef } from "react";
import "./memory.css";

const animals = "🐶🐱🐭🐹🐰🦊🐻🐼🐻‍❄️🐨🐯🦁🐮🐷🐽🐸🐵🦍🦧🦮🐕🐩🐈🐅🐆🦓🦌🐎🦄🐐🐑🐏🐖🦙🐂🐃🦬🐄🐮🦏🦛🦣🐘🦒🦘🦥🦦🦨🦡🦫🦦🐿️🦔🦇🐓🦃🦆🦢🦉🦩🦜🦤🐦🦅🦇🦤🦋🐝🐞🦗🪳🕷️🦂🦟🪰🦠🐢🐍🐊🦎🐉🦕🦖🦭🐳🐋🦈🐬🐟🐠🐡🦑🦐🦞🦀🐚🐌";

export type Card = {
    type: number
    flipped: boolean
    alive: boolean
}

export type MemoryCardProps = { 
    card: Card
} & ComponentPropsWithoutRef<'div'>

export function MemoryCard(props : MemoryCardProps) {
    const { card, ...rest} = props
    //const [ flipped, setFlipped ] = useState(true)
    const content = "" + [card.type]
    return (
        <div className="memory-card" {...rest} >
            <div className={`flipper ${card.flipped ? 'flip' : ''}`}>
                <div className="front flex items-center justify-center">
                    {content}
                </div>
                <div className="back flex items-center justify-center">
                    X
                </div>
            </div>
        </div>
    )
}
