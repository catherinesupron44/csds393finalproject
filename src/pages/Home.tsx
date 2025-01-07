import { Link, useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/project-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1F2EB]">
      <section className="bg-[#1e4b6e] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-serif mb-6">
              Skincare Insights from a shopping site, not an analyst.
            </h1>
            <p className="text-lg mb-8">
              In 2023, nerdy college students decided to build an ad-free shopping website that learns consumers' preferences over time. Big shopping platforms don't share complete performance data with brands. See what your customers are asking for, and how your products are performing on a level playing field.
            </p>
            <Link 
              href="/about"
              className="text-[#e76f51] hover:underline"
            >
              → LEARN MORE ABOUT US
            </Link>
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
              title="Naked Chemistry uses SearchOwl to scout competitors' social media marketing strategies."
              image="/placeholder.svg?height=400&width=600"
              color="orange"
            />
            <ProjectCard
              title="SearchOwl helps [Brand]'s [Product] stand out via ingredient analysis"
              image="/placeholder.svg?height=400&width=600"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

