import './index.css'

const FiltersSection = props => {
  const renderProfile = () => (
    <div className="profile">
      <h1 className="user-name">Rahul Atluri</h1>
      <p className="user-job">Lead Software Developer and AI-ML expert</p>
    </div>
  )

  const renderEmploymentTypeFiltersList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employmentType => {
      const {filterEmploymentType, activeEmploymentTypeId} = props
      const onClickEmploymentTypeItem = () =>
        filterEmploymentType(employmentType.employmentTypeId)
      const employmentTypeClassName =
        activeEmploymentTypeId === employmentType.employmentTypeId
          ? `and-up active-employment-type`
          : `and-up`
      return (
        <li
          className="employment-item"
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

  const renderEmploymentTypeFilters = () => (
    <div>
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employment-type-list">
        {renderEmploymentTypeFiltersList()}
      </ul>
    </div>
  )

  const renderSalariesRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryRange => {
      const {filterSalaryRange, activeSalaryRangeId} = props

      const onClickSalaryRangeItem = () =>
        filterSalaryRange(salaryRange.salaryRangeId)
      const isActive = salaryRange.salaryRangeId === activeSalaryRangeId
      const salaryRangeClassName = isActive
        ? `salary-range-name active-salary-range-name`
        : `salary-range-name`

      return (
        <li className="salary-range-item" key={salaryRange.salaryRangeId}>
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
  const renderProductCategories = () => (
    <>
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salaries-range-list">{renderSalariesRangeList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderProfile()}
      <hr />
      {renderEmploymentTypeFilters()}
      <hr />
      {renderProductCategories()}
    </div>
  )
}

export default FiltersSection
