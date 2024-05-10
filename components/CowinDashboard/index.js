// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByGender from '../VaccinationByGender/index'
import VaccinationByAge from '../VaccinationByAge/index'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    currentApiStatus: apiStatusConstants.loading,
    coverageDetails: [],
    byAgeDetails: [],
    byGenderDetails: [],
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    this.setState({currentApiStatus: apiStatusConstants.loading})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedCoverageDetails = data.last_7_days_vaccination.map(cov => ({
        vaccineDate: cov.vaccine_date,
        dose1: cov.dose_1,
        dose2: cov.dose_2,
      }))
      const updatedByAgeDetails = data.vaccination_by_age
      const updatedByGenderDetails = data.vaccination_by_gender
      this.setState(
        {
          coverageDetails: updatedCoverageDetails,
          byAgeDetails: updatedByAgeDetails,
          byGenderDetails: updatedByGenderDetails,
          currentApiStatus: apiStatusConstants.success,
        },
        this.renderView,
      )
    } else {
      this.setState(
        {currentApiStatus: apiStatusConstants.failure},
        this.renderView,
      )
    }
  }

  successView = () => {
    const {coverageDetails, byAgeDetails, byGenderDetails} = this.state
    return (
      <>
        <VaccinationCoverage data={coverageDetails} />
        <VaccinationByGender data={byGenderDetails} />
        <VaccinationByAge data={byAgeDetails} />
      </>
    )
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
    </>
  )

  renderView = () => {
    const {currentApiStatus} = this.state
    switch (currentApiStatus) {
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="dashboard-container">
          <div className="website-logo-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-heading">Co-Win</h1>
          </div>
          <h1 className="website-description">CoWin Vaccination in India</h1>
          {this.renderView()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
