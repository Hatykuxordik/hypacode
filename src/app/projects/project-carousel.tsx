"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProjectCard from "./project-card";

interface Project {
  id: string | number;
  title: string;
  status: "Completed" | string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  date: string | Date;
}

interface ProjectCarouselProps {
  projects: Project[];
  onDetails: (project: Project) => void;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
} as const;

export default function ProjectCarousel({
  projects,
  onDetails,
}: ProjectCarouselProps) {
  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        arrows={false}
        autoPlaySpeed={4000}
        keyBoardControl
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container !overflow-x-clip !overflow-y-visible"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {projects.map((project) => (
          <div key={project.id} className="px-4">
            <ProjectCard project={project} featured onDetails={onDetails} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
