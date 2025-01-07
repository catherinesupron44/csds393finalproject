import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function Contact() {
  const [calApiReady, setCalApiReady] = useState(false);

  useEffect(() => {
    // Ensure the Cal.com API is loaded only on the client side
    const loadCalApi = async () => {
      const cal = await getCalApi({ namespace: "offboarding" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setCalApiReady(true); // Set the Cal API as ready once it's loaded
    };

    loadCalApi();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-[#1e4b6e] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">CONTACT</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-[600px]">
              {calApiReady ? (
                <Cal
                  namespace="market-research"
                  calLink="jadonwyant/market-research"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "scroll",
                  }}
                  config={{
                    layout: "month_view",
                  }}
                />
              ) : (
                <div>Loading calendar...</div> // Show loading message while the Cal API is initializing
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
