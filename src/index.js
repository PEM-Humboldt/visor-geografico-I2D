import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
// import '@fortawesome/fontawesome-free/css/all.css'
// import './scss/index.scss'
import './components/mapComponent/map-control'

import './components/pageComponent/side-bar/side-bar'
import './components/pageComponent/side-options/side-options'
import './components/uiLinks'

import './components/tutorialComponent/tutorial'

// Debug helpers for development
if (process.env.NODE_ENV !== 'production') {
  import('./components/utils/debugLayers.js');
}
