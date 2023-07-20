import React from 'react'
import ReactDom from 'react-dom'
import { ToastContainer } from './ToastContainer'
import { toast } from './toast'

if (typeof window !== 'undefined') {
  const toastContainerDiv = document.createElement('div')
  toastContainerDiv.className = 'bone-toast-container'
  document.body.appendChild(toastContainerDiv)
  ReactDom.render(<ToastContainer />, toastContainerDiv)
}

export { ToastContainer, toast }
