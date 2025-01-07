import { WorkCard } from "../components/work-card"
import Ohio_Skincare from "../images/Ohio_Skincare.webp"
import Naked_Chemistry from "../images/Naked_Chemistry.webp"

export default function Work() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
      <div className="inline-block bg-[#E3655B] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">WORK</h1>
      </div>
        <div className="grid md:grid-cols-1 gap-8">
          <WorkCard
            title="SearchOwl supports Ohio brand with comparative pricing data amidst manufacturing expansion"
            image={Ohio_Skincare}
            color="blue"
            imagePosition="left"
            href="ohio-skincare-dec24"
          />
          <WorkCard
            title="Naked Chemistry uses SearchOwl to scout vegan skincare competitive landscape"
            image={Naked_Chemistry}
            color="orange"
            imagePosition="left"
            href="naked-chemistry-nov24"
          />
        </div>
      </div>
    </div>
  )
}

