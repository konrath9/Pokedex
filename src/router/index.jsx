import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from '../pages/Home';
import { Home } from '../pages/Profile';

export const name = (props) => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}