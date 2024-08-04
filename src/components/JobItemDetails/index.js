import './index.css'
import {MdStar} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
import {FaShoppingBag, FaExternalLinkAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import Skills from '../Skills'
import LoaderView from '../LoaderView'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    skillsList: [],
    lifeAtCompanyData: {},
    similarJobslist: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const jwtToken = Cookies.get('jwt')
      const {
        match: {
          params: {id},
        },
      } = this.props

      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      console.log(`Fetching URL: ${url}`) // Log URL for debugging

      const apiResult = await fetch(url, options)

      if (apiResult.ok) {
        const eachAndSimilarData = await apiResult.json()
        const jobDetails = eachAndSimilarData.job_details
        const camelCaseJobData = {
          companyLogoUrl: jobDetails.company_logo_url,
          companyWebsiteUrl: jobDetails.company_website_url,
          employmentType: jobDetails.employment_type,
          id: jobDetails.id,
          title: jobDetails.title,
          location: jobDetails.location,
          rating: jobDetails.rating,
          packagePerAnnum: jobDetails.package_per_annum,
          skills: jobDetails.skills,
          jobDescription: jobDetails.job_description,
          lifeAtCompany: jobDetails.life_at_company,
          similarJobs: jobDetails.similar_jobs,
        }
        this.setState({
          jobData: camelCaseJobData,
          skillsList: jobDetails.skills,
          lifeAtCompanyData: jobDetails.life_at_company,
          similarJobslist: eachAndSimilarData.similar_jobs,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
        console.error('Failed to fetch job details')
      }
    } catch (error) {
      console.error('Error fetching job details:', error)
    }
  }

  renderJobItem = () => {
    const {jobData, lifeAtCompanyData, skillsList, similarJobslist} = this.state
    const {
      companyLogoUrl,
      rating,
      location,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      title,
      jobDescription,
    } = jobData
    return (
      <>
        <div className="job-contain">
          <div className="d-flex-item">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-1"
            />
            <div className="font-size-16px">
              <h1 className="title-1">{title}</h1>
              <div className="job-list-d-flex m-1">
                <MdStar className="star-icon" />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="d-flex-space-between">
            <div className="job-list-d-flex">
              <div className="job-list-d-flex m-1 mt-5 mr-1">
                <GoLocation />
                <p className="para">{location}</p>
              </div>
              <div className="job-list-d-flex m-1 mt-5">
                <FaShoppingBag />
                <p className="para">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="center">
            <h1>Description</h1>
            <a className="job-list-d-flex" href={companyWebsiteUrl}>
              <p>Visit</p>
              <FaExternalLinkAlt className="external-link-icon" />
            </a>
            <p className="para-description-1">{jobDescription}</p>
          </div>

          <h1>Skills</h1>
          <ul className="ul-item">
            {skillsList.length >= 2 ? (
              skillsList.map(eachSkill => (
                <Skills key={eachSkill.name} eachSkill={eachSkill} />
              ))
            ) : (
              <p>At least two skills are required</p>
            )}
          </ul>

          <h1 className="text-white">Life at Company</h1>
          <div className="d-flex-item-space-between">
            <p className="link-item">{lifeAtCompanyData.description}</p>
            <img
              alt="life at company"
              className="item-life-at-company-image"
              src={lifeAtCompanyData.image_url}
            />
          </div>
        </div>

        <h1 className="tsadkfjskfjkdsjf">Similar Jobs</h1>
        <ul className="d-flex-item">
          {similarJobslist.map(eachJob => (
            <SimilarJob key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => <LoaderView />

  renderFailureView = () => (
    <div className="failed-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="logout-btn"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItem()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-container flex-direction-column">
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
