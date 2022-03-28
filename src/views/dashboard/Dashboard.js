import React, { Component, lazy } from 'react'
import { useState } from 'react'

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

import { Bar } from 'react-chartjs-2'
import { render } from 'react-dom'
import { number } from 'prop-types'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const dataexample = [
  { id: 1, name: 'Product 1', angry: 40, disgust: 20, happy: 12, neutral: 39, surprise: 10 },
  { id: 2, name: 'Product 2', angry: 10, disgust: 10, happy: 40, neutral: 20, surprise: 30 },
  { id: 3, name: 'Product 3', angry: 5, disgust: 0, happy: 50, neutral: 10, surprise: 30 },
]

const progressGroupExample2 = [
  { title: 'Male', value: 53 },
  { title: 'Female', value: 43 },
]

const progressGroupExample3 = [
  { title: 'Organic Search', percent: 56, value: '191,235' },
  { title: 'Facebook', percent: 15, value: '51,223' },
  { title: 'Twitter', percent: 11, value: '37,564' },
  { title: 'LinkedIn', percent: 8, value: '27,319' },
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

function ProductDashboardLine(props) {
  // eslint-disable-next-line react/prop-types
  const id = props.selectKey
  return (
    <div>
      {dataexample
        .filter((numberID) => numberID.id == id)
        .map((items) => (
          <>
            <CChart
              type="line"
              data={{
                labels: ['Angry', 'Disgust', 'Happy', 'Neutral', 'Surprise'],
                datasets: [
                  {
                    label: items.name,
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: [
                      items.angry,
                      items.disgust,
                      items.happy,
                      items.neutral,
                      items.surprise,
                      80,
                    ],
                  },
                  {
                    label: 'Product',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [10, 20, 30, 10, 50, 80],
                  },
                ],
              }}
            />
          </>
        ))}
    </div>
  )
}

function ProductDashboardDoughnut(props) {
  // eslint-disable-next-line react/prop-types
  const id = props.selectKey
  return (
    <div>
      {dataexample
        .filter((numberID) => numberID.id == id)
        .map((items) => (
          <>
            <CChart
              type="doughnut"
              data={{
                labels: ['Angry', 'Disgust', 'Happy', 'Neutral', 'Surprise'],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#336699'],
                    data: [40, 20, 80, 10, 30],
                  },
                ],
              }}
            />
          </>
        ))}
    </div>
  )
}

function ProductName(props) {
  // eslint-disable-next-line react/prop-types
  const id = props.selectKey
  return (
    <div>
      {dataexample
        .filter((numberID) => numberID.id == id)
        .map((items) => (
          <>
            <CCardHeader className="h4">{items.name}</CCardHeader>
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
    }

    this.hanndleDropdownChange = this.hanndleDropdownChange.bind(this)
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        res.json()
      })
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        })
      })
  }

  hanndleDropdownChange(e) {
    this.setState({
      selectKey: e.target.value,
    })
  }

  render() {
    const { DataisLoaded } = this.state
    const selectKey = this.state.selectKey
    const isSelected = this.state.isSelected
    let content
    let lineChart
    let productName
    if (isSelected) {
      content = <ProductDashboardBar selectKey={selectKey} />
      lineChart = <ProductDashboardDoughnut selectKey={selectKey} />
      productName = <ProductName selectKey={selectKey} />
    }
    if (!DataisLoaded)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    return (
      <>
        {/* <div>
          <h1> Fetch data from an api in react </h1>{' '}
          {items.map((item) => (
            <ol key={item.id}>
              User_Name: {item.username}, Full_Name: {item.name}, User_Email: {item.email},
            </ol>
          ))}
        </div> */}
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
              {productName}
              <CCardBody>
                <CRow>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      {content}
                      <br />
                      <hr className="mt-0" />
                      {lineChart}
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
                            {dataexample.map((items) => (
                              <option isSelected={isSelected} key={items.id} value={items.id}>
                                {items.name}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Survey</div>
                          <CFormSelect
                            key={this.state.selectKey}
                            value={this.state.selectKey}
                            onChange={this.hanndleDropdownChange}
                          >
                            <option isSelected={isSelected} value="Survey 1">
                              Survey 1
                            </option>
                            <option isSelected={isSelected} value="Survey 2">
                              Survey 2
                            </option>
                            <option isSelected={isSelected} value="Survey 3">
                              Survey 3
                            </option>
                          </CFormSelect>
                        </div>
                      </CCol>
                    </CRow>
                    <hr className="mt-0" />
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
                    {progressGroupExample2.map((item, index) => (
                      <div className="progress-group mb-4" key={index}>
                        <div className="progress-group-header">
                          <span>{item.title}</span>
                          <span className="ms-auto fw-semibold">{item.value}%</span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="warning" value={item.value} />
                        </div>
                      </div>
                    ))}

                    <div className="mb-5"></div>

                    {progressGroupExample3.map((item, index) => (
                      <div className="progress-group" key={index}>
                        <div className="progress-group-header">
                          <span>{item.title}</span>
                          <span className="ms-auto fw-semibold">
                            {item.value}{' '}
                            <span className="text-medium-emphasis small">({item.percent}%)</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="success" value={item.percent} />
                        </div>
                      </div>
                    ))}
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
