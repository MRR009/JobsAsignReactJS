import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'

// import {BsPlusSquare, BsDashSquare,} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobDetails'
// import JobCard from '../JobsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsList: [],
    lifeAtCompanyData: {},
    skillsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSkillsData = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getFormattedSimilarJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const jobDetails = fetchedData.job_details
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }
      // console.log(updatedJobDetails)

      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarJobData(eachSimilarJob),
      )
      // console.log(updatedSimilarJobsData)

      const lifeAtCompanyData = updatedJobDetails.lifeAtCompany
      const updatedLifeAtCompany = {
        description: lifeAtCompanyData.description,
        imageUrl: lifeAtCompanyData.image_url,
      }
      // console.log(updatedLifeAtCompany)

      const skillsData = updatedJobDetails.skills
      const updatedSkillsData = skillsData.map(eachSkill =>
        this.getFormattedSkillsData(eachSkill),
      )

      // console.log(updatedSkillsData)

      this.setState({
        jobData: {...updatedJobDetails},
        similarJobsList: [...updatedSimilarJobsData],
        lifeAtCompanyData: {...updatedLifeAtCompany},
        skillsList: [...updatedSkillsData],
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-viewimg.png"
        className="failure-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsList, lifeAtCompanyData, skillsList} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobData

    return (
      <div className="job-details-success-view">
        <div className="job-item-container">
          <div className="job-details-top-section">
            <img
              src={companyLogoUrl}
              alt="job-details-company logo"
              className="job-details-company-logo"
            />
            <div className="job-details-title-rating-container">
              <h1 className="job-details-job-title">{title}</h1>
              <div className="job-details-star-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="job-details-star"
                />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-details-middle-section">
            <div className="job-details-location-employment-type-container">
              <IoLocationSharp className="job-details-location-icon" />
              <p className="job-details-location">{location}</p>
              <BsFillBriefcaseFill className="job-details-employment-case-icon" />
              <p className="job-details-employment-type">{employmentType}</p>
            </div>
            <div>
              <p className="job-details-package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="job-details-horizontal-line" />

          <div className="job-bottom-section">
            <div className="description-link-container">
              <h1 className="job-details-description-title">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-link"
              >
                Visit <FaExternalLinkAlt className="visit-link-icon" />
              </a>
            </div>
            <p className="job-details-job-description">{jobDescription}</p>
          </div>

          <h1 className="skills-heading">Skills</h1>
          <div className="skills-container">
            {skillsList.map(eachSKill => {
              const {imageUrl, name} = eachSKill
              return (
                <div className="skills-list">
                  <img src={imageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </div>
              )
            })}
          </div>

          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company">
            <p className="life-at-company-description">
              {lifeAtCompanyData.description}
            </p>
            <img
              src={lifeAtCompanyData.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobsList.map(eachSimilarJob => (
            <SimilarJobItem jobDetails={eachSimilarJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
