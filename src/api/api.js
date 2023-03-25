import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:8000/api'})


export const getCards = () => api.get('/cards').then(r => r.data)

export const createCard = () => api.post('/cards').then(r => r.data)

export const changeCardColor = (id, newColor) => api.post(`/cards/${id}`, {color: newColor}).then(r => r.data)