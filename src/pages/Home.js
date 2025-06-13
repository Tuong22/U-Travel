"use client"

import { useNavigate } from "react-router-dom"
import { Hero } from "../components/Hero/Hero"
import { SectionTitle } from "../components/Title/Title"
import { CustomButton } from "../components/Button/CustomButton"
import { MobileAppSection } from "../components/mobile_app_section/MobileAppSection"
import { Footer } from "../components/Footer/Footer"
import BlogSection from "../components/BlogCard/BlogSection"
import { blogPosts } from "../mock/blog"
import PropertyGrid from "../components/PropertyCategoryCard/PropertyGrid"
import { hanoiProperties } from "../mock/hanoi"
import GuideCard from "../components/PropertyCard/GuideCard"
import TripCard from "../components/PropertyCard/TripCard"
import TravelMap from "../components/Map/Map"
import CityCardGrid from "../components/CityCard/CityCardGrid"
import { cities } from "../mock/city"

export const Home = () => {
  const navigate = useNavigate()

  const handleSearchClick = () => {
    navigate("/search")
  }

  const handlePlanTripsClick = () => {
    navigate("/planning/new")
  }

  const handleViewAllBlogsClick = () => {
    console.log("Điều hướng đến trang blog")
  }

  return (
    <div className="w-full">
      <section className="px-4">
        <Hero
          onClickSearch={handleSearchClick}
          banner={"https://static.vinwonders.com/production/bai-bien-nha-trang-topbanner.jpg"}
        />
      </section>

      <section className="pt-14 px-4 max-w-7xl mx-auto">
        <div className="flex flex-row justify-between">
          <SectionTitle title={"Recently Viewed & \n Upcoming "} />
          <CustomButton title={"Plan new trips"} onClick={handlePlanTripsClick} />
        </div>
      </section>

      <section>
        <CityCardGrid cities={cities} />
      </section>

      <section className="pt-14 px-4 max-w-7xl mx-auto">
        <TravelMap />
      </section>

      <section className="pt-14 px-4 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <TripCard
            avatarSrc={
              "https://media.istockphoto.com/id/502068878/pt/foto/jovem-saud%C3%A1vel-homem-australiano.jpg?s=170667a&w=0&k=20&c=OOcs2hhewa1GzEwNhkup2D9v6y74GDBP5jMBPQEgr5U="
            }
            backgroundSrc={"https://cellphones.com.vn/sforum/wp-content/uploads/2022/06/1-14.jpg"}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <GuideCard backgroundSrc={"https://1nedrop.com/wp-content/uploads/2024/10/anh-bien-44rY8B4R.jpg"} />
        </div>
      </section>

      <section className="pt-14 px-4 max-w-7xl mx-auto">
        <div className="mb-10">
          <SectionTitle title={"Explore"} />
        </div>
        <PropertyGrid properties={hanoiProperties} />
      </section>

      <section className="pt-14 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionTitle title={"Others\nGuides & Tips"} />
        </div>
        <BlogSection blogPosts={blogPosts} />
        <div className="flex flex-row justify-center">
          <CustomButton title={"View All Blogs"} onClick={handleViewAllBlogsClick} />
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <MobileAppSection />
      </section>

      <Footer />
    </div>
  )
}
