import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilPencil, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Dataset',
  },
  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Emotions',
        to: '/theme/emotion',
      },
      {
        component: CNavItem,
        name: 'Information',
        to: '/theme/product',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Survey',
    to: '/theme/survey',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
]

export default _nav
