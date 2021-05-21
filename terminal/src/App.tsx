import React , { useState } from 'react'
import atomixIcon from './atomix.png'
import Fail from './components/fail'
import './App.scss'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'

interface IformProps {

}

export const App:React.FC<IformProps> = () => {
  const [formSuccess, setFormSuccess] = useState<boolean>()

  const handleClick = () => {
    let amount = (document.getElementById('amount') as HTMLInputElement).value
    postData("http://localhost:8080/api/charges", {"amount": parseInt(amount), "receiptEmail": "hello_gin@example.com"}).then(responseData => {
      console.log(responseData)
      if (responseData.stripeResponse.status === 'succeeded') {
        let nextArrow = (document.getElementsByClassName('awssld__next')[0] as HTMLElement)
        setFormSuccess(true)
        nextArrow.click()
      } else {
        setFormSuccess(false)
      }
    });
  }

  const postData = async (url = '', data = {}) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + btoa('atomix:atomix'))
    headers.append('Origin','http://localhost:3000')
    headers.append('Access-Control-Allow-Headers','Accept')

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: headers,
      body: JSON.stringify(data)
    })

    return response.json()
  }


  return (
    <div className="app">
      <AwesomeSlider
        fillParent
        animation="cubeAnimation"
        bullets={false}
        organicArrows={true}
      >
        <div>
          <header className="app__header">
            <h1>doTapGo</h1>
          </header>
          <div>
            <img className="app__logo" alt="logo" src={atomixIcon} />
            <form className="form">
              <input id="amount" className="form__amount" placeholder="Amount" />
              <a onClick={() => handleClick()} type="submit" className="form__submit">Donate</a>
            </form>
            {formSuccess ? '' : <Fail />}
          </div>
        </div>
        <div>
          Success
        </div>
      </AwesomeSlider>
    </div>
  );
}

export default App;
