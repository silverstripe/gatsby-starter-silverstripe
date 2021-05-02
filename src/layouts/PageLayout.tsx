import React from "react"
import MainNav from "../components/MainNav"
import Footer from "../components/Footer"
import Header from "../components/Header"

const PageLayout: React.FC = ({ children }) => {
  return (
    <>
      <header role="banner">
        <Header />
        <MainNav />
      </header>
      <main id="main" className="main" role="main">
        {children}
      </main>
      <footer className="footer-site" role="contentinfo">
        <Footer />
      </footer>
    </>
  )
}

export default PageLayout
