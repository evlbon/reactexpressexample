import './Card.css'

const Card = ({title, description, color, onClick}) => {

    return <div className="card" style={{background: color}} onClick={onClick}>

        <h5>{title}</h5>
        <p>{description}</p>

    </div>
}

export default Card
