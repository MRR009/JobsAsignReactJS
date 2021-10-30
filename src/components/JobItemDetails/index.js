import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobDetails'

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
    similarJobsData: [],
    lifeAtCompanyList: [],
    skillsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedJobDetailsData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills,
    rating: data.rating,
    title: data.title,
  })

  getFormattedLifeAtCompanyData = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

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
      console.log(fetchedData)
      const updatedJobDetailsData = Object.entries(fetchedData.job_details)

      // console.log(updatedJobDetailsData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarJobData(eachSimilarJob),
      )
      // console.log(fetchedData.job_details)
      // const updatedLifeAtCompanyList = updatedJobDetailsData.lifeAtCompany.map(
      //  eachElement => this.getFormattedLifeAtCompanyData(eachElement),
      // )
      // const updatedSkillsList = updatedJobDetailsData.skills.map(eachSkill =>
      //  this.getFormattedSkillsData(eachSkill),
      // )

      this.setState({
        jobData: {...updatedJobDetailsData},
        similarJobsData: [...updatedSimilarJobsData],
        // lifeAtCompanyList: [...updatedLifeAtCompanyList],
        // skillsList: [...updatedSkillsList],
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
    const {jobData, similarJobsData} = this.state
    console.log(similarJobsData)
    console.log(jobData)

    return (
      <div className="job-details-success-view">
        <div className="job-details-container">
          <img src="mageUrl" alt="job" className="job-image" />
          <div className="job">
            <h1 className="job-name">title</h1>
            <p className="price-details">Rs price/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">rating</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">totalReviews Reviews</p>
            </div>
            <p className="job-description">description</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">availability</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">brand</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
                testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">quantity</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
                testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button type="button" className="button add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
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
