import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import FiltersSection from '../FiltersSection'
import JobCard from '../JobsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    searchInput: '',
    isEmploymentFilterActive: true,
    isSalaryFilterActive: true,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobs)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentTypeId: '',
        activeSalaryRangeId: '',
      },
      this.getJobs,
    )
  }

  filterEmploymentType = activeEmploymentTypeId => {
    const {isEmploymentFilterActive} = this.state

    if (isEmploymentFilterActive) {
      this.setState({activeEmploymentTypeId}, this.getJobs)
    } else {
      this.setState({activeEmploymentTypeId: ''}, this.getJobs)
    }
    this.setState({isEmploymentFilterActive: !isEmploymentFilterActive})
  }

  filterSalaryRange = activeSalaryRangeId => {
    const {isSalaryFilterActive} = this.state
    if (isSalaryFilterActive) {
      this.setState({activeSalaryRangeId}, this.getJobs)
    } else {
      this.setState({activeSalaryRangeId: ''}, this.getJobs)
    }
    this.setState({isSalaryFilterActive: !isSalaryFilterActive})
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.changeSearchInput}
          onKeyDown={this.enterSearchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-icon-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-container">
        {this.renderSearchInput()}
        <li className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </li>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {
      searchInput,
      isEmploymentFilterActive,
      isSalaryFilterActive,
      jobsList,
    } = this.state
    return (
      <div className="all-jobs-section">
        <FiltersSection
          searchInput={searchInput}
          JobsList={jobsList}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          filterEmploymentType={this.filterEmploymentType}
          filterSalaryRange={this.filterSalaryRange}
          clearFilters={this.clearFilters}
          isEmploymentFilterActive={isEmploymentFilterActive}
          isSalaryFilterActive={isSalaryFilterActive}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}
export default AllJobsSection
