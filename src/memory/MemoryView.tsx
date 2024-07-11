import { useState } from "react";
import { Card, MemoryCard } from "./MemoryCard";
import { Button } from "./Button";

const images = [
    "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/34231/antler-antler-carrier-fallow-deer-hirsch.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/67552/giraffe-tall-mammal-africa-67552.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/325045/pexels-photo-325045.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/219906/pexels-photo-219906.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/17811/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/162203/panthera-tigris-altaica-tiger-siberian-amurtiger-162203.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/39857/leopard-leopard-spots-animal-wild-39857.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/70080/elephant-africa-african-elephant-kenya-70080.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/460775/pexels-photo-460775.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/144234/bull-landscape-nature-mammal-144234.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1319515/pexels-photo-1319515.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1207875/pexels-photo-1207875.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1499596/pexels-photo-1499596.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/302304/pexels-photo-302304.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/106685/pexels-photo-106685.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/34770/haan-crows-mohawk.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/45246/green-tree-python-python-tree-python-green-45246.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1335971/pexels-photo-1335971.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/76957/tree-frog-frog-red-eyed-amphibian-76957.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/53125/elephant-tusk-ivory-animal-53125.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1829979/pexels-photo-1829979.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/75973/pexels-photo-75973.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/598966/pexels-photo-598966.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/1059823/pexels-photo-1059823.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/73825/osprey-adler-bird-of-prey-raptor-73825.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/236599/pexels-photo-236599.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/234054/pexels-photo-234054.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/38280/monkey-mandril-africa-baboon-38280.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/3551498/pexels-photo-3551498.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/314865/pexels-photo-314865.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/16040/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&h=350",
]

function createArray(n: number) {
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

function getRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeRandomCards(rows: number, cols: number) {
    let cards: Card[] = []
    for (let i = 0; i < rows * cols / 2; i++) {
        const url = images[getRandomBetween(0, images.length - 1)]
        const master: Card = { 
            type: i, 
            flipped: true, 
            alive: true,
            url,
        }
        cards.push({...master})
        cards.push({...master})
    }
    cards = shuffle(cards)
    return cards
}


export function MemoryView() {
    const rows = 4;
    const cols = 4;
    const [ cardsState, setCardsState ] = useState<Card[]>(makeRandomCards(rows, cols))
    const [ gameState, setGameState ] = useState<"selecting" | "selectedtwo">("selecting")
    console.log("Render MemoryView")

    const handleClick = (index: number) => {
        const newCardsState = [...cardsState]
        const card = newCardsState[index]
        if (!card.alive) {
            return
        }
        if (gameState == "selecting" && card.flipped) {
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
                }, 750)
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
            <div className="flex gap-4">
                <Button onClick={() => {
                    setCardsState(makeRandomCards(rows, cols))
                    setGameState("selecting")
                }}>New Game</Button>
            </div>
            <div>{gameState}</div>
            <div className="grow"></div>
        </div>
    )
}