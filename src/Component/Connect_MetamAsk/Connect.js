import React from 'react'

function Connect({getAccount, account}) {
  return (
    <div style={{background: "rgb(23, 23, 24)", height: "100vh"}} className="d-flex justify-content-center align-items-center">
      <div className="container">
      <div className='row'>
        <div className='col-12'>
          <button className='btn btn-primary' onClick={getAccount}>Connect MetaMask</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Connect