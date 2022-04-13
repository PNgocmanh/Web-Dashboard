import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import axios from 'axios'
class EmotionData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      DataisLoaded: false,
    }
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
            <h3 className="text-center">Emotion Table</h3>
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>Data ID</th>
                  <th>Angry</th>
                  <th>Disgust</th>
                  <th>Happy</th>
                  <th>Neutral</th>
                  <th>Surprise</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.data_id} className="text-center">
                    <td>{item.data_id}</td>
                    <td>{item.angry}</td>
                    <td>{item.disgust}</td>
                    <td>{item.happy}</td>
                    <td>{item.neutral}</td>
                    <td>{item.surprise}</td>
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
      url: 'https://ai-emotion-detection-server.herokuapp.com/api/v1/edata', //your url
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

export default EmotionData
