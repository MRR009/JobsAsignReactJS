import {Link} from 'react-router-dom'
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
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating">
            <h1 className="job-title">{title}</h1>
            <div className="star-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="job-middle-section">
            <IoLocationSharp className="location-icon" />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill className="employment-case-icon" />
            <p className="employment-type">{employmentType}</p>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
        </div>

        <div className="job-bottom-section">
          <p className="description-title">Description</p>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
