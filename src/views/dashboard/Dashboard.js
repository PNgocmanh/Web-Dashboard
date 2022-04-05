import React, { Component, lazy } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
} from '@coreui/react'
import { CChartBar, CChart } from '@coreui/react-chartjs'

import { render } from 'react-dom'
import { number } from 'prop-types'
import axios from 'axios'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const dataexample = [
  { id: 1, name: 'Product 1', angry: 40, disgust: 20, happy: 12, neutral: 39, surprise: 10 },
  { id: 2, name: 'Product 2', angry: 10, disgust: 10, happy: 40, neutral: 20, surprise: 30 },
  { id: 3, name: 'Product 3', angry: 5, disgust: 0, happy: 50, neutral: 10, surprise: 30 },
]

function ProductDashboardBar(props) {
  // eslint-disable-next-line react/prop-types
  const id = props.selectKey
  return (
    <div>
      {dataexample
        .filter((numberID) => numberID.id == id)
        .map((items) => (
          <>
            <CChartBar
              data={{
                labels: ['Angry', 'Disgust', 'Happy', 'Neutral', 'Surprise'],
                datasets: [
                  {
                    label: 'Emotion',
                    backgroundColor: '#f87979',
                    data: [
                      items.angry,
                      items.disgust,
                      items.happy,
                      items.neutral,
                      items.surprise,
                      100,
                    ],
                  },
                ],
              }}
              label="months"
            />
          </>
        ))}
    </div>
  )
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      DataisLoaded: false,
      isOpen: false,
      isSelected: true,
      selectKey: 1,
      ProductData: [],
      SurveyData: [],
    }

    this.hanndleDropdownChange = this.hanndleDropdownChange.bind(this)
    this.getAngry = this.getAngry.bind(this)
    this.getDisgust = this.getDisgust.bind(this)
    this.getNeutral = this.getNeutral.bind(this)
    this.getSurprise = this.getSurprise.bind(this)
    this.getSum = this.getSum.bind(this)
  }

  componentDidMount() {
    fetch('https://ai-emotion-detection-server.herokuapp.com/api/v1/edata')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        })
      })
      .catch((err) => {
        console.log(err)
      })
    fetch('https://ai-emotion-detection-server.herokuapp.com/api/v1/product')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          ProductData: json,
          DataisLoaded: true,
        })
      })
    fetch('https://ai-emotion-detection-server.herokuapp.com/api/v1/survey')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          SurveyData: json,
          DataisLoaded: true,
        })
      })
  }

  hanndleDropdownChange(e) {
    this.setState({
      selectKey: e.target.value,
    })
  }

  getSum(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id)
        sum =
          sum + element.neutral + element.angry + element.happy + element.surprise + element.disgust
    }
    return sum
  }

  getAngry(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id) sum = sum + element.angry
    }
    return sum
  }

  getDisgust(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id) sum = sum + element.disgust
    }
    return sum
  }

  getHappy(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id) sum = sum + element.happy
    }
    return sum
  }

  getNeutral(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id) sum = sum + element.neutral
    }
    return sum
  }

  getSurprise(dataList) {
    let sum = 0
    for (let index = 0; index < dataList.length; index++) {
      const element = dataList[index]
      if (this.state.selectKey == element.product_id) sum = sum + element.surprise
    }
    return sum
  }

  render() {
    const { DataisLoaded, items, ProductData, SurveyData } = this.state
    const selectKey = this.state.selectKey
    const isSelected = this.state.isSelected
    console.log(selectKey)
    let content
    let sum = this.getSum(items)
    console.log(sum)
    let angry = this.getAngry(items)
    let disgust = this.getDisgust(items)
    //let happy = this.getHappy(items)
    let happy = this.getHappy(items)
    console.log(happy)
    let neutral = this.getNeutral(items)
    let surprise = this.getSurprise(items)
    if (isSelected) {
      content = <ProductDashboardBar selectKey={selectKey} />
    }
    if (!DataisLoaded)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    return (
      <>
        <WidgetsDropdown />

        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h2 id="traffic" className="card-title mb-0">
                  Overviews
                </h2>
                <div className="small text-medium-emphasis">February - March 2022</div>
              </CCol>
            </CRow>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CTable hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Dataset statistics</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Number of variables</CTableDataCell>
                        <CTableDataCell>42</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Number of observations</CTableDataCell>
                        <CTableDataCell>494021</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Missing cells</CTableDataCell>
                        <CTableDataCell>0</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Missing cells (%)</CTableDataCell>
                        <CTableDataCell>0.0%</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Total size in memory</CTableDataCell>
                        <CTableDataCell>158.3 MB</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Average record size in memory</CTableDataCell>
                        <CTableDataCell>336.0 B</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Numeric</CTableDataCell>
                        <CTableDataCell>28</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan="2">Categorical</CTableDataCell>
                        <CTableDataCell>14</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CTable hover>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Variable types</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Numeric</CTableDataCell>
                          <CTableDataCell>28</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Categorical</CTableDataCell>
                          <CTableDataCell>14</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCardBody>
        </CCard>

        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              {ProductData.filter((numberID) => numberID.id == this.state.selectKey).map(
                (items) => (
                  <>
                    <CCardHeader className="h4">{items.pname}</CCardHeader>
                  </>
                ),
              )}
              <CCardBody>
                <CRow>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CChartBar
                        data={{
                          labels: ['Angry', 'Disgust', 'Happy', 'Neutral', 'Surprise'],
                          datasets: [
                            {
                              label: 'Collection',
                              backgroundColor: '#f87979',
                              data: [angry, disgust, happy, neutral, surprise, sum],
                            },
                          ],
                        }}
                        label="months"
                      />
                      <br />
                      <hr className="mt-0" />
                      <CChart
                        type="doughnut"
                        data={{
                          labels: ['Angry', 'Disgust', 'Happy', 'Neutral', 'Surprise'],
                          datasets: [
                            {
                              label: '%',
                              backgroundColor: [
                                '#41B883',
                                '#E46651',
                                '#00D8FF',
                                '#DD1B16',
                                '#336699',
                              ],
                              data: [
                                (angry / sum) * 100,
                                (disgust / sum) * 100,
                                (happy / sum) * 100,
                                (neutral / sum) * 100,
                                (surprise / sum) * 100,
                              ],
                            },
                          ],
                        }}
                      />
                    </CRow>
                  </CCol>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Product</div>
                          <CFormSelect
                            key={this.state.selectKey}
                            value={this.state.selectKey}
                            onChange={this.hanndleDropdownChange}
                          >
                            {ProductData.map((items) => (
                              <option isSelected={isSelected} key={items.id} value={items.id}>
                                {items.pname}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Survey</div>
                          <CFormSelect>
                            {SurveyData.filter(
                              (numberID) => numberID.id == this.state.selectKey,
                            ).map((items) => (
                              <option isSelected={isSelected} key={items.id} value={items.id}>
                                {items.survey_time}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </CCol>
                    </CRow>
                    <hr className="mt-0" />
                    <CTable hover>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Details of Survey</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Distinct</CTableDataCell>
                          <CTableDataCell>2495</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Distinct (%)</CTableDataCell>
                          <CTableDataCell>0.5%</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Missing</CTableDataCell>
                          <CTableDataCell>0</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Missing (%)</CTableDataCell>
                          <CTableDataCell>0.0%</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Memory size</CTableDataCell>
                          <CTableDataCell>30 MB</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell colSpan="2">Categorical</CTableDataCell>
                          <CTableDataCell>14</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>

                    <div className="mb-5"></div>

                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span>Angry</span>
                        <span className="ms-auto fw-semibold">
                          {angry}{' '}
                          <span className="text-medium-emphasis small">
                            ({(angry / sum) * 100}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(angry / sum) * 100} />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span>Disgust</span>
                        <span className="ms-auto fw-semibold">
                          {disgust}{' '}
                          <span className="text-medium-emphasis small">
                            ({(disgust / sum) * 100}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(disgust / sum) * 100} />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span>Happy</span>
                        <span className="ms-auto fw-semibold">
                          {happy}{' '}
                          <span className="text-medium-emphasis small">
                            ({(happy / sum) * 100}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(happy / sum) * 100} />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span>Neutral</span>
                        <span className="ms-auto fw-semibold">
                          {neutral}{' '}
                          <span className="text-medium-emphasis small">
                            ({(neutral / sum) * 100}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(neutral / sum) * 100} />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span>Surprise</span>
                        <span className="ms-auto fw-semibold">
                          {surprise}{' '}
                          <span className="text-medium-emphasis small">
                            ({(surprise / sum) * 100}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(surprise / sum) * 100} />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <br />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}
export default Dashboard
