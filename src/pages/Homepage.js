import React from 'react'
import Cart from '../components/Cart'
import Navbar from '../components/Navbar'
import Billboard from '../components/Billboard'
import Features from '../components/Features'
import Categories from '../components/Categories'
import NewArrivals from '../components/NewArrivals'
import Collection from '../components/Collection'
import Bestseller from '../components/Bestseller'
import Video from '../components/Video'
import Testimonials from '../components/Testimonials'
import Relatedproducts from '../components/Relatedproducts'
import Blog from '../components/Blog'
import Logobar from '../components/Logobar'
import Newsletter from '../components/Newsletter'
import Instagram from '../components/Instagram'
import Footer from '../components/Footer'

export default function Homepage() {
  return (
    <div>
      <Cart/>
      <Navbar/>
      <Billboard/>
      <Features/>
      <Categories/>
      <NewArrivals/>
      <Collection/>
      <Bestseller/>
      <Video/>
      <Testimonials/>
      <Relatedproducts/>
      <Blog/>
      <Logobar/>
      <Newsletter/>
      <Instagram/>
      <Footer/>
    </div>
  )
}
