import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

import CNCMachining from '@/pages/CNCMachining'
import Inventry from '@/pages/Inventry'
import Integrationapi from '@/pages/integration-api'
import PurchaseAndInward from '@/pages/purchase-and-inward'
import QCInspection from '@/pages/QCInspection'
import SalesAndDispatch from '@/pages/Sales-and-dispatch'

function getButtonToastMessage(button) {
  const label =
    button.getAttribute('aria-label') ||
    button.getAttribute('title') ||
    button.textContent?.trim()

  return label ? `${label} clicked` : 'Button clicked'
}

function App() {
  useEffect(() => {
    const handleButtonClick = (event) => {
      const button = event.target.closest('button')

      if (!button || button.disabled) {
        return
      }

      toast.success(getButtonToastMessage(button), {
        duration: 1800,
      })
    }

    document.addEventListener('click', handleButtonClick)

    return () => document.removeEventListener('click', handleButtonClick)
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/purchase-and-inward" replace />} />
        <Route path="purchase-and-inward" element={<PurchaseAndInward />} />
        <Route path="cnc-machining" element={<CNCMachining />} />
        <Route path="qc-inspection" element={<QCInspection />} />
        <Route path="inventory" element={<Inventry />} />
        <Route path="sales-dispatch" element={<SalesAndDispatch />} />
        <Route path="sales-and-dispatch" element={<Navigate to="/sales-dispatch" replace />} />
        <Route path="integrations" element={<Integrationapi />} />
        <Route path="integration-api" element={<Navigate to="/integrations" replace />} />
        <Route path="*" element={<Navigate to="/purchase-and-inward" replace />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'text-xs font-semibold',
          style: {
            border: '1px solid #ccfbf1',
            borderRadius: '8px',
            color: '#0f172a',
          },
          success: {
            iconTheme: {
              primary: '#0f9a8f',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  )
}

export default App
