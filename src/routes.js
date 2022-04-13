import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const EmotionData = React.lazy(() => import('./views/theme/emotion/EmotionData'))
const Product = React.lazy(() => import('./views/theme/product/Product'))
const Survey = React.lazy(() => import('./views/theme/survey/Survey'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/emotion', name: 'EmotionData', component: EmotionData },
  { path: '/theme/product', name: 'Product', component: Product },
  { path: '/theme/survey', name: 'Survey', component: Survey },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
]

export default routes
