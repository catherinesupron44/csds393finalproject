import React from "react";

interface ProjectCardProps {
  title: string;
  image: string;
  color?: "blue" | "orange";
  className?: string;
}

export function ProjectCard({ title, image, color = "blue", className = "" }: ProjectCardProps) {
  const bgColor = color === "blue" ? "bg-[#1e4b6e]" : "bg-[#E3655B]";
  const classes = `relative group overflow-hidden rounded-lg ${className}`;

  return (
    <div className={classes}>
      <div className="aspect-[16/9] relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className={`p-6 text-white ${bgColor}`}>
        <h3 className="text-xl mb-4">{title}</h3>
        <a href="#" className="inline-block text-sm hover:underline">
          READ MORE
        </a>
      </div>
    </div>
  );
}
