// DATA
import pages from '@/constants/data/pages'

// COMPONENTS
import { Routes, Route, HashRouter } from 'react-router'
import { AppLayout } from '@mainComponents/AppCore'

export default function App() {
  return (
    <HashRouter useTransitions={true}>
      <Routes>
        <Route element={<AppLayout />}>
          {pages.map((page) => {
            switch (page.type) {
              case "main":
                return <Route index key="/" path={page.path} element={page.element} />
              case "base":
                return <Route key={page.path} path={page.path} element={page.element} />
              case "notFound":
                return <Route key="404" path="*" element={page.element} />
            }
          })}
        </Route>
      </Routes>
    </HashRouter>
  )
}