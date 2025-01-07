import { Link, useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/project-card"
import Ohio_Skincare from "../images/Ohio_Skincare.webp"
import Naked_Chemistry from "../images/Naked_Chemistry.webp"
import Top_Image from "../images/homepage.webp"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1F2EB]">
      <section className="bg-[#1e4b6e] text-white py-20">
        <div className="grid md:grid-cols-2 gap-16 px-10">
        <div className="max-w-2xl justify-content align-center">
            <h1 className="text-5xl font-serif mb-6">
              Skincare Market Research from a shopping platform, not a survey.
            </h1>
            <p className="text-lg mb-8">
              We know big shopping platforms don't share complete performance data with you. See what your customers are asking for and how your products are performing on a level playing field.
            </p>
            <Link 
              to="/about"
              className="text-[#e76f51] hover:underline"
            >
              → LEARN MORE ABOUT US
            </Link>
          </div>
          <div className="relative aspect-[16/9] relative">
            <img src={Top_Image} alt={""} className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-[#255F85] mb-12">
            RECENT PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="Naked Chemistry uses SearchOwl to scout vegan skincare competitive landscape"
              image={Naked_Chemistry}
              color="orange"
              to="naked-chemistry-nov24"
            />
            <ProjectCard
              title="SearchOwl supports Ohio brand with comparative pricing data amidst manufacturing expansion"
              image={Ohio_Skincare}
              to="ohio-skincare-dec24"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

