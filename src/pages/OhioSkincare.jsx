import img from "../images/Ohio_Skincare.webp";
import { Link } from "react-router-dom"

export default function OhioSkincare() {
  return (
    <>
      <div className="flex flex-col-1 min-h-[100dvh]">
        <main className="flex-1">
        <div className="grid md:grid-cols-1 gap-8">
          <div className="bg-[#1e4b6e] rounded-none overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 md:order-last">
                <div className="relative aspect-[4/3]">
                  <img src={img} alt={"SearchOwl supports Ohio brand with comparative pricing data amidst manufacturing expansion"} className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-white text-4xl mb-6">{"SearchOwl supports Ohio brand with comparative pricing data amidst manufacturing expansion"}</h2>
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
                      Case Study Completed December 2024
                    </h2>
                    <p className="text-left">
                    In December, we collaborated with a prominent local brand in Ohio to conduct comprehensive skincare market research. The brand, which initially began
                    producing products in a home kitchen, has experienced significant growth, expanding into a brick-and-mortar location and accumulating a substantial following
                    on social media. As part of its strategic growth, the brand's owner plans to partner with a manufacturer to scale up production.
                    </p>
                    <p className="text-left">
                    Ahead of these developments, SearchOwl was engaged to provide data-driven insights to inform key decisions related to product pricing and messaging
                    strategies.
                    </p>
                    <p className="text-left">
                    Our analysis involved a comparison of the brand's facial cleanser pricing against similar products within our database. This included a broad market comparison
                    as well as a focused comparison among products featuring the specific ingredients highlighted by the brand. The findings revealed that the brand was
                    underpricing its product in relation to its competitors. In response, the owner decided to implement a 19% price increase for the cleanser.
                    </p>
                    <p className="text-left">
                    Additionally, the brand owner sought our assistance in identifying the most compelling product attributes for messaging. After analyzing the competitive
                    landscape, we determined that the brand's current product claim was present in nearly 50% of comparable offerings. In contrast, a benefit associated with the
                    cleanser appeared in only 2.7% of competitive products. As a result, the brand owner has decided to revise both the product's messaging and packaging to
                    better differentiate it in the marketplace as they enter the new year.
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
                      href="/SearchOwl_x_Ohio_Skincare_Case_Study.pdf"
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
