import { useState } from "react"
import fileDownload from 'js-file-download'


function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState({ data: '', loading: false, name: '' })

  const handleInput = e => {
    setInput(e.target.value)
  }

  const handleDownload = () => {
    fileDownload(result, result.name + '.png')
  }

  const getData = () => {
    const api = 'https://api.qrserver.com/v1/create-qr-code/?color=24344b&margin=0&data='

    fetch(api + input).then(res => setResult({ data: res.url, loading: false, name: input }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (input.trim().length > 0) {
      setResult({ ...result, loading: true })
      setTimeout(() => {
        getData()
      }, 3000);
    }

    setInput('')
  }

  return (
    <div className="app">
      <div className="card">
        <form onSubmit={ handleSubmit }>
          <input
            value={ input }
            onChange={ handleInput }
            type="text"
            placeholder="Type website URL"
          />
        </form>

        <div className="img-box">
          { result.loading ? <span className="loading"></span> : <img src={ result.data } /> }
        </div>

        <button onClick={ handleDownload }>Download</button>

        <p>
          Scan the QR code to visit the website directly
        </p>
      </div>
    </div >
  )
}

export default App
