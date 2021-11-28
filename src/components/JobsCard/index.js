import {Link, withRouter} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
  } = jobData

  return (
    // Wrap with Link from react-router-dom
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title1">{title}</h1>
            <div className="star-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star-image"
              />
              <p className="rating-name">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-middle-section">
          <div className="location-employment-type-container">
            <IoLocationSharp className="location-icon" />
            <p className="location-name">{location}</p>
            <BsFillBriefcaseFill className="employment-case-icon" />
            <p className="employment-type-name">{employmentType}</p>
          </div>
          <div>
            <p className="package-in-lpa">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="horizontal-line" />

        <div className="job-bottom-section">
          <h1 className="description">Description</h1>
          <p className="job-descriptions">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default withRouter(JobCard)
