import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./hooks/useTheme"
import { routerBasename } from "./lib/asset"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Realisations from "./pages/Realisations"
import Gallery from "./pages/Gallery"
import Tarifs from "./pages/Tarifs"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/realisations/:slug" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
