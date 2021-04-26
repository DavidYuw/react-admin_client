import React from 'react'
import ReactDOM from 'react-dom'
import memoryUtils from './utils/memoryUtils'
import storeUtils from './utils/storeUtils'

import App from './App'

const user = storeUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'))