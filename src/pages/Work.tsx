import { WorkCard } from "../components/work-card"

export default function Work() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
      <div className="inline-block bg-[#E3655B] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">WORK</h1>
          </div>
        <div className="grid md:grid-cols-1 gap-8">
          <WorkCard
            title="SearchOwl helps [Brand]'s [Product] stand out via ingredient analysis"
            image="/placeholder.svg?height=400&width=600"
            color="blue"
            imagePosition="left"
            href="#"
          />
          <WorkCard
            title="Naked Chemistry uses SearchOwl to scout competitors' social media marketing strategies."
            image="/placeholder.svg?height=400&width=600"
            color="coral"
            imagePosition="left"
            href="#"
          />
        </div>
      </div>
    </div>
  )
}

