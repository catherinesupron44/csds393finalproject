import React, { useEffect, useState } from 'react';

export default function About() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // For now, we're just using static data. You can fetch it from an API later.
    const questionsData = [
      { number: "1", text: "Who are my customers? What do they look like? Who's not interested in my products?" },
      { number: "2", text: "What other products are my customers searching for, viewing, and buying?" },
      { number: "3", text: "What ingredients and ethical considerations do my customers value?" },
      { number: "4", text: "Who are my direct competitors? In the absence of advertising, who's winning and why?" },
      { number: "5", text: "Are social media trends contributing to actual sales for me or my competitors?" },
    ];

    setQuestions(questionsData);
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
        <div className="inline-block bg-[#1e4b6e] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">ABOUT US</h1>
          </div>

          <p className="text-lg mb-8">
            In 2023, five college students envisioned an advertising-free shopping website open to all brands, where users could describe their exact needs and get personalized results. In talking to brands, we realized that skincare companies need more than just visibility...
          </p>

          <p className="text-xl font-semibold mb-12">They need answers.</p>

          <div className="space-y-8 mb-12">
            {questions.map((q) => (
              <div key={q.number} className="flex gap-4">
                <div className="text-2xl font-bold text-[#e76f51]">{q.number}</div>
                <p className="text-lg">{q.text}</p>
              </div>
            ))}
          </div>

          <p className="text-lg mb-8">
            So, we expanded our team and raised money, set on fixing e-commerce and answering these questions.
          </p>

          <p className="text-lg">
            By creating a better e-commerce experience for our users, we become their trusted advisors and personal shoppers, helping them find better products faster as we learn their preferences. We protect these users by removing personal identifiers from our data, making sure we can give brands feedback without compromising on privacy. By including more brands on a level, ad-free playing field, we offer better results to our users. To our brands, we offer more visibility, an opportunity to compete online, and answers to important questions.
          </p>
        </div>
      </div>
    </div>
  );
}
