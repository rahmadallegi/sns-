import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { apiGet, API_BASE_URL as BASE_URL } from "@/lib/api";

interface Project {
  title: string;
  detail: string;
  image: string;
  images?: string[];
}

interface ProjectsResponse {
  message: string;
  constructionProjects: Project[];
  easabilityProjects: Project[];
  parkingProjects: Project[];
  supportProjects: Project[];
  telecomProjects: Project[];
  wasteProjects: Project[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  const images =
    project.images && project.images.length > 0 ? project.images : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const resolveSrc = (img: string) =>
    img.startsWith("http") ? img : `${BASE_URL}/images/${img.replace(/^\/?images\//, "")}`;

  return (
    <div className="group ">
      {/* Main image */}
      <div className="rounded-lg overflow-hidden border border-border mb-3">
        <img
          src={resolveSrc(images[currentIndex])}
          alt={project.title}
          className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mb-3">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => {
                setCurrentIndex(index);
                setIsPaused(true); // pause auto-slide when user clicks
                setTimeout(() => setIsPaused(false), 5000); // resume after 5s
              }}
              className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${
                currentIndex === index
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border"
              }`}
            >
              <img
                src={resolveSrc(img)}
                alt={`${project.title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Title and details */}
      <h3 className="font-body text-lg text-foreground">{project.title}</h3>
      {project.detail && (
        <p className="text-muted-foreground text-sm mt-1">{project.detail}</p>
      )}
    </div>
  );
};

const ProjectSection = ({
  title,
  projects,
  id,
}: {
  title: string;
  projects: Project[];
  id?: string;
}) => (
  <section id={id} className="pb-16 mt-16 bg-background">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-heading text-3xl font-bold text-primary uppercase mb-8">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-x-52 gap-y-10 justify-center max-w-5xl mx-auto">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => {
  const [projects, setProjects] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await apiGet<ProjectsResponse>("/api/projects", {
          signal: controller.signal,
        });

        if (data.message === "successful") {
          setProjects({
            ...data,
            constructionProjects: data.constructionProjects || [],
            easabilityProjects: data.easabilityProjects || [],
            parkingProjects: data.parkingProjects || [],
            supportProjects: data.supportProjects || [],
            telecomProjects: data.telecomProjects || [],
            wasteProjects: data.wasteProjects || [],
          });
        } else {
          console.warn("Unexpected projects API response", data);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    // Scroll to hash after projects are loaded
    if (!loading && projects) {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [loading, projects]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg">Loading projects...</div>
      </Layout>
    );
  }

  if (!projects) {
    return (
      <Layout>
        <div className="text-center py-20 text-lg">Failed to load projects</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-10 pb-6 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
            Our Projects
          </h1>
          <p className="text-muted-foreground text-2xl">
            See how we've helped our clients!
          </p>
        </div>
      </section>

      <ProjectSection
        title="Construction Projects"
        projects={projects.constructionProjects}
        id="construction"
      />

      <ProjectSection
        title="Easability management & Maintenance Operations Projects"
        projects={projects.easabilityProjects}
        id="easability"
      />

      <ProjectSection
        title="Parking Management Projects"
        projects={projects.parkingProjects}
        id="parking"
      />

      <ProjectSection
        title="Support Services Projects"
        projects={projects.supportProjects}
        id="support"
      />

      <ProjectSection
        title="Telecom & Electronics Projects"
        projects={projects.telecomProjects}
        id="telecom"
      />

      <ProjectSection
        title="Waste Management Projects"
        projects={projects.wasteProjects}
        id="waste"
      />
    </Layout>
  );
};

export default Projects;