import './index.css'

const SimilarJobItem = () => (
  <li className="similar-job-item">
    <img src="imageUrl" className="similar-job-image" alt="similar job title" />
    <p className="similar-job-title">title</p>
    <p className="similar-job-brand">by brand</p>
    <div className="similar-job-price-rating-container">
      <p className="similar-job-price">Rs price/-</p>
      <div className="similar-job-rating-container">
        <p className="similar-job-rating">rating</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          alt="star"
          className="similar-job-star"
        />
      </div>
    </div>
  </li>
)
export default SimilarJobItem
