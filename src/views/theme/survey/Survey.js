import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import axios from 'axios'
class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      DataisLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://ai-emotion-detection-server.herokuapp.com/api/v1/survey')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        })
      })
  }

  render() {
    //let itemsRows = this.getItems(this.items)
    const { DataisLoaded, items } = this.state
    if (!DataisLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{' '}
        </div>
      )
    return (
      <>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton color="success">Add Filter </CButton>
            <CButton className="float-end" color="success">
              Add Filter{' '}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-center">Survey Table</h3>
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Place</th>
                  <th>Survey time</th>
                  <th>Data count</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.product_id}</td>
                    <td>{item.place}</td>
                    <td>{item.survey_time}</td>
                    <td>{item.data_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
          <CCardFooter>
            <CButton color="primary" onClick={() => this.download()}>
              Download data{' '}
            </CButton>
          </CCardFooter>
        </CCard>
      </>
    )
  }

  download() {
    axios({
      url: 'https://ai-emotion-detection-server.herokuapp.com/api/v1/survey', //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.csv') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  }
}

export default Survey
