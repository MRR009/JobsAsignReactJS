import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class FiltersSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileDetails: {},
      // isChecked: false,
    }
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileApiUrl, options)

    if (response.ok) {
      const profileDetails = await response.json()
      const profileDetailsList = [profileDetails.profile_details]
      const updatedDetails = {
        name: profileDetailsList[0].name,
        profileImageUrl: profileDetailsList[0].profile_image_url,
        shortBio: profileDetailsList[0].short_bio,
      }

      this.setState({
        profileDetails: updatedDetails,
      })
    } else {
      this.renderProfileRetry()
    }
  }

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  renderProfileRetry = () => (
    <button type="button" onClick={this.onClickProfileRetry}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="user-name">{name}</h1>
        <p className="user-job">{shortBio}</p>
      </div>
    )
  }

  renderEmploymentTypeList = () => {
    const {employmentTypesList} = this.props
    return employmentTypesList.map(employmentType => {
      const {filterEmploymentType, activeEmploymentTypeId} = this.props

      // const onChangeEmploymentType = () => {}

      const onClickEmploymentTypeItem = () =>
        filterEmploymentType(employmentType.employmentTypeId)
      const employmentTypeClassName =
        activeEmploymentTypeId === employmentType.employmentTypeId
          ? `filters-and-up filters-active-employment-type`
          : `filters-and-up`

      return (
        <li
          className="filters-employment-type-item"
          key={employmentType.employmentTypeId}
          onClick={onClickEmploymentTypeItem}
        >
          <input
            type="checkbox"
            id={employmentType.employmentTypeId}
            name={employmentType.label}
            value={employmentType.employmentTypeId}
          />
          <label
            className={employmentTypeClassName}
            htmlFor={employmentType.employmentTypeId}
          >
            {' '}
            {employmentType.label}
          </label>
        </li>
      )
    })
  }

  renderEmploymentType = () => (
    <div>
      <h1 className="filters-employment-type-heading">Type of Employment</h1>
      <ul className="filters-employment-type-list">
        {this.renderEmploymentTypeList()}
      </ul>
    </div>
  )

  renderSalaryRangeList = () => {
    const {salaryRangesList} = this.props

    return salaryRangesList.map(salaryRange => {
      const {filterSalaryRange, activeSalaryRangeId} = this.props

      const onClickSalaryRangeItem = () =>
        filterSalaryRange(salaryRange.salaryRangeId)
      const isActive = salaryRange.salaryRangeId === activeSalaryRangeId
      const salaryRangeClassName = isActive
        ? `filters-salary-range-name active-salary-range-name`
        : `filters-salary-range-name`

      return (
        <li
          className="filters-salary-range-item"
          key={salaryRange.salaryRangeId}
        >
          <input
            type="radio"
            id={salaryRange.salaryRangeId}
            name={salaryRange.label}
            value={salaryRange.salaryRangeId}
            onChange={onClickSalaryRangeItem}
          />
          <label
            className={salaryRangeClassName}
            htmlFor={salaryRange.salaryRangeId}
          >
            {salaryRange.label}
          </label>
        </li>
      )
    })
  }

  renderSalaryRange = () => (
    <div>
      <h1 className="filters-salary-range-heading">Salary Range</h1>
      <ul className="filters-salary-range-list">
        {this.renderSalaryRangeList()}
      </ul>
    </div>
  )

  render() {
    const {clearFilters} = this.props
    return (
      <div className="filters-group-container">
        {this.renderProfile()}
        <hr />
        {this.renderEmploymentType()}
        <hr />
        {this.renderSalaryRange()}
        <button
          type="button"
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}

export default FiltersSection
