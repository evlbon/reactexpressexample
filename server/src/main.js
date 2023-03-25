const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000;

const colors = [
    '#ffbaba',
    '#baffbd',
    '#fff4ba']

const cards = [
    {id: 1, title: 'Card 1', description: "some text", color: colors[0]},
    {id: 2, title: 'Card 2', description: "some text", color: colors[0]}
]

app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    setTimeout(next, 500)
})

app.get('/api/cards', (req, res) => {
    res.send(cards)
})

app.post('/api/cards', (req, res) => {
    const id = cards.length + 1
    const newCard = {id: id, title: `Card ${id}`, description: "some text", color: colors[0]}
    cards.push(newCard)

    res.send(newCard)
})

app.post('/api/cards/:cardId', (req, res)=>{
    const card = cards.find(card => card.id === parseInt(req.params?.cardId))

    if(!card)
        return res.sendStatus(404)

    if(!req.body.color)
        return res.sendStatus(400)

    card.color = req.body.color

    res.send(card)
})

app.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully Running, and App is listening on port " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    }
);