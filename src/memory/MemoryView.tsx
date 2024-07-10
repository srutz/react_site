import { useState } from "react";
import { Card, MemoryCard } from "./MemoryCard";

function createArray(n) {
    return Array.from({ length: n }, (_, index) => index);
}


function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}

function makeRandomCards(rows: number, cols: number) {
    let cards: Card[] = []
    for (let i = 0; i < rows * cols / 2; i++) {
        cards.push({ type: i, flipped: true, alive: true })
        cards.push({ type: i, flipped: true, alive: true })
    }
    cards = shuffle(cards)
    return cards
}


export function MemoryView() {
    const rows = 4;
    const cols = 4;
    const [ cardsState, setCardsState ] = useState<Card[]>(makeRandomCards(rows, cols))
    const [ gameState, setGameState ] = useState<"selecting" | "selectedtwo">("selecting")

    const handleClick = (index: number) => {
        const newCardsState = [...cardsState]
        const card = newCardsState[index]
        if (!card.alive) {
            return
        }
        if (gameState == "selecting") {
            card.flipped = !card.flipped
            setCardsState(newCardsState)
            const nonFlipped = newCardsState.filter(card => !card.flipped)
            if (nonFlipped.length == 2) {
                setGameState("selectedtwo")
                const card1 = nonFlipped[0]
                const card2 = nonFlipped[1]
                setTimeout(() => {
                    const newCardsState = [...cardsState]
                    newCardsState.forEach(card => card.flipped = true)
                    if (card1.type == card2.type) {
                        card1.alive = card2.alive = false
                    }
                    setCardsState(newCardsState)
                    setGameState("selecting")
                }, 1_000)
            }
        }
    }

    return (
        <div className="flex flex-col gap-2 grow justfiy-center items-center">
            <div className="grow"></div>
            <div className="flex flex-col gap-2 memory-container">
                {createArray(rows).map((row, index) => (
                    <div key={"row" + index} className="flex gap-2">
                        {createArray(cols).map((col) => (
                            <MemoryCard 
                                key={row * cols + col} 
                                card={cardsState[row * cols + col]} 
                                onClick={() => { handleClick(row * cols + col)}} />
                        ))}
                    </div>
                ))}
            </div>
            <div>{gameState}</div>
            <div className="grow"></div>
        </div>
    )
}