
import React from 'react'

const Connect = React.lazy(() => import('./views/Connect'))
const Clock = React.lazy(() => import('./views/Clock'))
const NowPlaying = React.lazy(() => import('./views/NowPlaying'))


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/connect', name: 'Maps', component: Connect },
  { path: '/clock', exact:true, name: 'Clock', component: Clock },
  { path: '/now_playing', name: 'Now Playing', component: NowPlaying }
]

export default routes
