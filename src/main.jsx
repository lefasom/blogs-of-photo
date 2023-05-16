import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import store from '../redux/store'
const domain = 'dev-i1bwqgm8z4bqs5iw.us.auth0.com'
const clientId = 'zfiFFyq6L2SmmeOKaDxbrWZTmW3YkMAI'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
)
