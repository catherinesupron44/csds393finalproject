import img from "../images/policy.webp";

export default function Disclaimer() {
  return (
    <>
      <div className="flex flex-col-1 min-h-[100dvh]">
        <main className="flex-1">
          <section>
            <div className="relative">
              <img
                src={img}
                alt="Privacy Policy"
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container px-4 md:px-6">
                  <div className="mx-full text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black mb-8">
                      Disclaimer
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <div className="text-black">
                <div className="space-y-8 text-lg">
                  <div className="space-y-4 mt-4">
                    <p>Effective Date: 12/14/2024</p>
                    <h2 className="text-2xl font-bold text-left">
                      Informational Purposes Only
                    </h2>
                    <p className="text-left">
                      Our recommendations are provided for informational
                      purposes only. We do not claim to diagnose or treat any
                      skin conditions or medical issues. Our suggestions are not
                      a substitute for professional medical advice, diagnosis,
                      or treatment.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Individual Variability
                    </h2>
                    <p className="text-left">
                      Skincare needs can vary greatly from person to person. Our
                      recommendations are based on the information you provide,
                      but we cannot guarantee that they will be suitable for
                      everyone. It is essential to consult with a qualified
                      healthcare professional or dermatologist for personalized
                      advice.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Product Safety
                    </h2>
                    <p className="text-left">
                      While we strive to suggest products that are generally
                      considered safe, we cannot guarantee the safety or
                      effectiveness of any specific skincare products. It is
                      your responsibility to read and follow the manufacturer's
                      instructions to avoid potential adverse reactions.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      No Endorsement
                    </h2>
                    <p className="text-left">
                      The presence of specific product recommendations on our
                      platform does not imply endorsement, promotion, or
                      sponsorship by SearchOwl Inc.. We do not receive
                      compensation for recommending particular products, and our
                      suggestions are based on the information you provide and
                      general product knowledge.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Disclaimer of Liability
                    </h2>
                    <p className="text-left">
                      SearchOwl Inc. and its employees shall not be held liable
                      for any direct, indirect, incidental, special, or
                      consequential damages arising out of the use or inability
                      to use our services or any products recommended through
                      our platform.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Affiliate Links and Third-Party Sites
                    </h2>
                    <p className="text-left">
                      When you follow an affiliate link provided on our platform
                      to third-party websites or online retailers, you are
                      leaving SearchOwl’s website. We are not responsible for
                      the content, terms of use, privacy policies, or practices
                      of these external websites. Any transactions,
                      interactions, or issues that arise from your visits to
                      third-party sites are solely your responsibility. It is
                      essential to review the terms and conditions, privacy
                      policies, and practices of these external sites before
                      engaging with them. Any concerns or disputes related to
                      products, services, or interactions on third-party sites
                      should be addressed directly with the respective website
                      or retailer and not with SearchOwl Inc.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Privacy and Data Protection
                    </h2>
                    <p className="text-left">
                      We take your privacy seriously and while we strive to
                      adhere to strict data protection policies and procedures,
                      SearchOwl Inc. cannot guarantee the absolute security of
                      any data transmitted over the internet. This includes but
                      is not limited to any data you transmit through the use of
                      the SearchOwl platform. Please review our privacy policy and terms and conditions
                      for more information on data handling, data processing, and data usage.
                    </p>
                  </div>
                </div>

                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Updates and Changes
                    </h2>
                    <p className="text-left">
                      SearchOwl Inc. reserves the right to update, modify, or
                      discontinue our services at any time, without prior
                      notice. We are not responsible for any inconvenience
                      caused by such changes.
                    </p>
                  </div>
                </div>
                <div className="space-y-8 text-lg py-5">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-left">
                      Affiliate Disclosure
                    </h2>
                    <p className="text-left">
                      Search Owl Inc. is an independent, e-commerce platform,
                      offering customers a personalized, AI-powered search
                      experience for skincare. We may earn money through affiliate
                      commission on products purchased through our links to
                      retailer sites. However, we are committed to be ad-free,
                      meaning we do not recommend products out of affiliate
                      deals, advertising partnerships, and manufacturer
                      pressure. Our decisions on what products to recommend are
                      driven solely by the data collected on our platform and specific product information.
                      This system allows us to stay committed to our mission of
                      curating a stronger shopping paradigm for businesses and
                      users alike.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
