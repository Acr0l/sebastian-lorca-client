import React from "react"
import Footer from "../Footer/Footer.js"
import Header from "../Header/Header.js"
import useStyles from "./LayoutStyles.js"


const Layout = ({children}) => {
  const classes = useStyles()
  return (
    <div className={classes.Container}>
      <Header/>
      <main>{children}</main> 
      <Footer/>
    </div>
  )
}

export default Layout;