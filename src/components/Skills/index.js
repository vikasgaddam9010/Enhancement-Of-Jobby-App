import './index.css'

const Skill = props => {
  const {eachSkill} = props

  return (
    <li className="li-item">
      <img
        src={eachSkill.image_url}
        alt={eachSkill.name}
        className="img-item"
      />
      <p>{eachSkill.name}</p>
    </li>
  )
}

export default Skill
