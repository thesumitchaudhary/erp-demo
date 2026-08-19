import { Navigate, Route, Routes } from 'react-router-dom'

import CNCMachining from '@/pages/CNCMachining'
import Inventry from '@/pages/Inventry'
import Integrationapi from '@/pages/integration-api'
import PurchaseAndInward from '@/pages/purchase-and-inward'
import QCInspection from '@/pages/QCInspection'
import SalesAndDispatch from '@/pages/Sales-and-dispatch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/purchase-and-inward" replace />} />
      <Route path="/purchase-and-inward" element={<PurchaseAndInward />} />
      <Route path="/cnc-machining" element={<CNCMachining />} />
      <Route path="/qc-inspection" element={<QCInspection />} />
      <Route path="/inventory" element={<Inventry />} />
      <Route path="/sales-dispatch" element={<SalesAndDispatch />} />
      <Route path="/sales-and-dispatch" element={<Navigate to="/sales-dispatch" replace />} />
      <Route path="/integrations" element={<Integrationapi />} />
      <Route path="/integration-api" element={<Navigate to="/integrations" replace />} />
    </Routes>
  )
}

export default App
