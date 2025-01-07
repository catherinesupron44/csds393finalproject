import img from "../images/Naked_Chemistry.webp";
import { Link } from "react-router-dom"

export default function NakedChemistry() {
  return (
    <>
      <div className="flex flex-col-1 min-h-[100dvh]">
        <main className="flex-1">
        <div className="grid md:grid-cols-1 gap-8">
          <div className="bg-[#e76f51] rounded-none overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 md:order-last">
                <div className="relative aspect-[4/3]">
                  <img src={img} alt={"Naked Chemistry uses SearchOwl to scout vegan skincare competitive landscape"} className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-white text-4xl mb-6">{"Naked Chemistry uses SearchOwl to scout vegan skincare competitive landscape"}</h2>
              </div>
            </div>
          </div>
        </div>

        <section>
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
              <div className="text-black">
                <div className="space-y-8 text-lg">
                  <div className="space-y-4 mt-4">
                    <h2 className="text-2xl font-bold text-left">
                      Case Study Completed November 2024
                    </h2>
                    <p className="text-left">
                    In October, SearchOwl partnered with Naked Chemistry, a boutique skincare company based in Los Angeles, to analyze and enhance their social media content marketing strategies. Founded in 2020, Naked Chemistry specializes in vegan, sustainable, and cruelty-free skincare products and relies heavily on Instagram for brand awareness.
                    </p>
                    <p className="text-left">
                    Naked Chemistry sought to expand its reach and strengthen its messaging around themes such as environmental sustainability and clean ingredients. To support this goal, SearchOwl conducted a competitive analysis by examining content from similar fast-growing boutique skincare companies. This process included synthesizing non-sponsored recommendations from skincare influencers and analyzing content themes that resonated most with target audiences.
                    </p>
                    <p className="text-left">
                    The analysis identified 10 distinct themes that Naked Chemistry could adopt to inspire future marketing campaigns. Specific examples highlighted why these themes succeeded in competitor content, providing actionable insights. Amongthe recommendations, bundling products and promoting them together emerged as a promising strategy to increase engagement and sales.
                    </p>
                    <p className="text-left">
                    Armed with these insights, Naked Chemistry is poised to refine its content and connect with a broader audience while staying true to its sustainable mission.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Full Case Study
                    </h2>
                    <a
    href="/SearchOwl_x_Naked_Chemistry_Case_Study.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#e76f51] hover:text-blue"
  >
    Available Here
  </a>
                  </div>
                </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
