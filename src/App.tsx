import { Routes, Route } from 'react-router'
import AppLayout from '@/mainComponents/AppLayout'
import HomePage from '@/pages/HomePage'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}