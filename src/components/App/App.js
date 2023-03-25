import './App.css';
import Card from "../Card/Card";
import {useEffect, useState} from "react";
import {changeCardColor, createCard, getCards} from "../../api/api";

const colors = [
    '#ffbaba',
    '#baffbd',
    '#fff4ba',
    '#bac3ff',
    '#fabaff'
]

function App() {
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCards().then(cards => {
            setCards(cards)
            setIsLoading(false)
        })
    }, [])

    const onClick = async () => {
        try {

            if (isLoading)
                return

            setIsLoading(true)

            await createCard()
            const newCards = await getCards()

            setCards(newCards)
            setIsLoading(false)
        } catch (e) {
            alert('ERROR')
        }
    }

    const onChangeColor = async (id) => {
        try {
            if (isLoading)
                return


            setIsLoading(true)
            await changeCardColor(id, colors[Math.round(Math.random() * (colors.length - 1))])
            const newCards = await getCards()

            setCards(newCards)
            setIsLoading(false)
        } catch (e) {
            alert('ERROR')
        }
    }

    return (
        <div>
            <button onClick={onClick} style={{margin: 16}} disabled={isLoading}>Create new card</button>

            {
                isLoading
                    ? <div style={{textAlign: "center"}}>Loading</div>
                    : <div className="content">

                        {
                            cards.map(card =>
                                <Card
                                    key={card.id}
                                    title={card.title}
                                    description={card.description}
                                    color={card.color}
                                    onClick={() => onChangeColor(card.id)}
                                />
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default App;
