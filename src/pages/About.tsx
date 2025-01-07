import React, { useEffect, useState } from 'react';

import cullen from "../images/Cullen.webp";
import dale from "../images/Dale.webp";
import jadon from "../images/Jadon.webp";
import ryan from "../images/Ryan.webp";
import priya from "../images/Priya.webp";

import { Card, Image, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { FaLinkedin } from 'react-icons/fa';


interface SocialIconProps {
  icon: any;
}

const SocialIcon = ({icon: Icon } : SocialIconProps) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-gray-800 transition-colors"
  >
    <Icon className="w-6 h-6" />
  </a>
);


const TeamMemberCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="m-5">
      <div className="flex justify-center items-center">
        <Tooltip>
        <Card className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[440px] bg-[#1e4b6e] rounded-[20px] shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#ffffff] p-[60px_30px]">
            <CardBody className="flex justify-center items-center flex-col text-xl relative">
              <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] md:w-[280px] md:h-[280px] relative mb-[10px] overflow-hidden rounded-full">
                <Image
                  className="z-0 opacity-1"
                  src={item.img}
                  width="100%"
                  height="auto"
                  alt={item.name}
                />
              </div>
              <CardHeader className="flex justify-center text-white items-center flex-col text-3xl pt-7 z-0">
                {item.name}
              </CardHeader>
              <div className="text-center">
                <p className='text-white'>{item.title}</p>
              </div>

              <div className="absolute hidden md:block inset-0 bg-[#1e4b6e] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-center items-center text-center">
                <p className="text-xl text-white">{item.bio}</p>
              </div>

              <div className="md:hidden w-full">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full py-2 text-primary text-white font-medium mt-4"
                >
                  {isExpanded ? "Show Less" : "Learn More"}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-base text-white mb-4 px-4 text-center">
                    {item.bio}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
          <SocialIcon icon={FaLinkedin} />
                    </a>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tooltip>
      </div>
    </div>
  );
};
  const list = [
    {
      title: "CEO",
      name: "Jadon Wyant",
      img: jadon,
      linkedin: "https://www.linkedin.com/in/jadon-wyant-573a9b21b/",
      bio: "Prior to starting SearchOwl, Jadon ran a swimming blog and corresponding Instagram and Twitter audience with over 1500 total followers, as well as a video game e-commerce store. Jadon is a senior studying Accounting at CWRU.",
    },
    {
      title: "CMO",
      name: "Priya Francis",
      img: priya,
      linkedin: "https://www.linkedin.com/in/priyatfrancis",
      bio: "Priya is a junior at the University of Miami, currently studying marketing. She has had the privilege of working with various marketing and real estate groups within the Lehigh Valley. Priya also has considerable experience working with multi-media art and graphic design.",
    },
    {
      title: "CTO",
      name: "Dale Berkove",
      img: dale,
      linkedin: "https://www.linkedin.com/in/dale-berkove-8817071b4/",
      bio: "Dale is a senior studying Data Science at CWRU. He has worked in immersive advertising, game development, and has startup experience in ed-tech. In addition, Dale currently sits on the advisory board of PiP World.",
    },
    {
      title: "COO",
      name: "Cullen Combi",
      img: cullen,
      linkedin: "https://www.linkedin.com/in/mark-combi-92bba7210/",
      bio: "Cullen is a senior at CWRU, studying Mechanical Engineering. Cullen has a variety of project management experiences and expertise in solving complex problems in high-uncertainty environments.",
    },
    {
      title: "CFO",
      name: "Ryan Kaiser",
      img: ryan,
      linkedin: "https://www.linkedin.com/in/ryanparkkaiser",
      bio: "Ryan is a senior study Finance and International Business at CWRU. He specializes in financial modeling, forecasting and strategy, and has applied his skills at multiple different corporations and countries.",
    },
  ];

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
      <div className="inline-block bg-[#1e4b6e] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">ABOUT</h1>
      </div>

          <p className="text-lg mb-8">
            In 2023, five college students envisioned an advertising-free shopping website open to all brands, where users could describe their exact needs and get personalized results. In talking to brands, we realized that skincare companies need more than just visibility...They need answers
          </p>

          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="19" viewBox="0 0 1194 19" fill="none">
<path d="M1193.66 9.5L1185 0.839746L1176.34 9.5L1185 18.1603L1193.66 9.5ZM-0.000244141 11H1185V8H-0.000244141L-0.000244141 11Z" fill="#A2A3BB"/>
</svg>

          <div className="space-y-8 mb-12">
            {questions.map((q) => (
              <div key={q.number} className="flex gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.25em] w-auto"
        viewBox="0 0 45 24"
        fill="none"
      >
<path d="M44.2143 13.0607C44.8 12.4749 44.8 11.5251 44.2143 10.9393L34.6683 1.3934C34.0825 0.807611 33.1328 0.807611 32.547 1.3934C31.9612 1.97919 31.9612 2.92893 32.547 3.51472L41.0323 12L32.547 20.4853C31.9612 21.0711 31.9612 22.0208 32.547 22.6066C33.1328 23.1924 34.0825 23.1924 34.6683 22.6066L44.2143 13.0607ZM0 13.5H43.1536V10.5H0V13.5Z" fill="#A2A3BB"/>
</svg>
                <p className="text-lg">{q.text}</p>
              </div>
            ))}
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="18" viewBox="0 0 1187 18" fill="none">
<path d="M0.339746 9L9 17.6603L17.6603 9L9 0.339746L0.339746 9ZM9 10.5H1187V7.5H9V10.5Z" fill="#A2A3BB"/>
</svg>

          <p className="text-lg mb-8">
            So, we expanded our team and raised money, set on fixing e-commerce and answering these questions.
          </p>

          <p className="text-lg mb-8">
            By creating a better e-commerce experience for our users, we become their trusted advisors and personal shoppers, helping them find better products faster as we learn their preferences. We protect these users by removing personal identifiers from our data, making sure we can give brands feedback without compromising on privacy. By including more brands on a level, ad-free playing field, we offer better results to our users. To our brands, we offer more visibility, an opportunity to compete online, and answers to important questions.
          </p>
          <p className="text-lg mb-8"> 
          SearchOwl offers a better way to do shopping. Partner with us today by listing your skincare products on our site and allowing us to answer the important questions that will drive your business forward.”
          </p>

        <div className="inline-block bg-[#1e4b6e] px-4 py-2 mb-12">
            <h1 className="text-4xl font-serif text-white">THE TEAM</h1>
      </div>

        <div className="flex justify-center items-center flex-wrap">
        {list.map((item, index) => (
          <TeamMemberCard key={index} item={item} />
        ))}
      </div>
      </div>
      </div>
  );
}
