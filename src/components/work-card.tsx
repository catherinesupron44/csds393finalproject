import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function WorkCard ({ title, image, color = "blue", imagePosition = "left", href }) {
  const bgColor = color === "blue" ? "bg-[#1e4b6e]" : "bg-[#e76f51]";

  return (
    <div className={`${bgColor} rounded-none overflow-hidden`}>
      <div className="flex flex-col md:flex-row">
        <div className={`md:w-1/3 ${imagePosition === "right" ? "md:order-last" : ""}`}>
          <div className="relative aspect-[4/3]">
            <img src={image} alt={title} className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-white text-2xl mb-6">{title}</h2>
          <Link to={href} className="text-white hover:underline uppercase text-sm tracking-wider">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};