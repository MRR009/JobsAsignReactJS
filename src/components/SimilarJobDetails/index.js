import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li key={id} className="similar-job-item">
      <div className="similar-job-top-section">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-star-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star-image"
            />
            <p className="similar-job-rating-name">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-title">Description</h1>
      <p className="similar-job-descriptions">{jobDescription}</p>
      <div className="similar-job-middle-section">
        <div className="similar-job-location-employment-type-container">
          <IoLocationSharp className="similar-job-location-icon" />
          <p className="similar-job-location-name">{location}</p>
          <BsFillBriefcaseFill className="similar-job-employment-case-icon" />
          <p className="similar-job-employment-type-name">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
