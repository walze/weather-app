import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'


const App = lazy(() => import('./App'))

render(
  (
    <Suspense fallback={'loading'}>
      <App />
    </Suspense>
  ),
  document.querySelector('#app')
)