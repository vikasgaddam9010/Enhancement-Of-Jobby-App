import './index.css'
import {MdStar} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
import {FaShoppingBag} from 'react-icons/fa'

const SimilarJob = props => {
  const {eachJob} = props

  return (
    <li className="background-color">
      <div className="job-list-d-flex">
        <img
          src={eachJob.company_logo_url}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="font-size-16px">
          <h1 className="title">{eachJob.title}</h1>
          <div className="job-list-d-flex m-1">
            <MdStar className="star-icon" />
            <p className="para">{eachJob.rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p className="font-size-10px">{eachJob.job_description}</p>
      <div className="job-list-d-flex">
        <div className="job-list-d-flex m-1 mt-5 mr-1">
          <GoLocation />
          <p className="para">{eachJob.location}</p>
        </div>
        <div className="job-list-d-flex m-1 mt-5">
          <FaShoppingBag />
          <p className="para">{eachJob.employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
