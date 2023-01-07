import React from 'react'
import Header from './header'
import {Outlet} from "react-router-dom"

export default function () {
  return <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <footer></footer>
  </>
}
