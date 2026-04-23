import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";

interface ServiceTab {
  id: string;
  label: string;
  title: string;
  desc: string;
  longDesc?: string;
  image?: string;
  images?: string[];
}

// Renders text with support for bullet lines (lines starting with -, •, or *)
const RenderContent = ({ text, className = "" }: { text: string; className?: string }) => {
  const lines = text.split("\n");

  const blocks: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let keyCounter = 0;

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${keyCounter++}`} className="list-none space-y-1.5 mb-3">
        {bulletBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-foreground text-base leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)/);
    if (bulletMatch) {
      bulletBuffer.push(bulletMatch[1]);
    } else {
      flushBullets();
      if (trimmed !== "") {
        blocks.push(
          <p key={`p-${keyCounter++}`} className="text-foreground text-base leading-relaxed mb-2">
            {trimmed}
          </p>
        );
      }
    }
  }
  flushBullets();

  return <div className={className}>{blocks}</div>;
};

const getProjectSectionId = (serviceName: string) => {
  const normalized = serviceName.toLowerCase();
  if (normalized.includes("construction")) return "construction";
  if (normalized.includes("easability")) return "easability";
  if (normalized.includes("parking")) return "parking";
  if (normalized.includes("support")) return "support";
  if (normalized.includes("telecom") || normalized.includes("electronics")) return "telecom";
  if (normalized.includes("waste")) return "waste";
  return "";
};

const Services = () => {
  const [serviceTabs, setServiceTabs] = useState<ServiceTab[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiGet<{
          message: string;
          serviceTabs: ServiceTab[];
        }>("/api/services");

        if (data.message === "successful") {
          setServiceTabs(data.serviceTabs);

          if (data.serviceTabs.length > 0) {
            setActiveTab(data.serviceTabs[0].id);
          }
        } else {
          console.error("Unexpected response from services API", data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    void fetchServices();
  }, []);

  useEffect(() => {
    if (!serviceTabs.length) return;

    const activeService =
      serviceTabs.find((s) => s.id === activeTab) || serviceTabs[0];

    const galleryImages =
      activeService.images && activeService.images.length > 0
        ? activeService.images
        : activeService.image
          ? [activeService.image]
          : [];

    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => {
        const currentIndex = prev[activeService.id] ?? 0;
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        return {
          ...prev,
          [activeService.id]: nextIndex,
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab, serviceTabs]);

  const activeService =
    serviceTabs.find((s) => s.id === activeTab) || serviceTabs[0];

  if (!activeService) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg">Loading services...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Tab Navigation */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto pt-8 pb-4">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center rounded-full bg-card/60 px-1 py-1">
                {serviceTabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2 text-[11px] md:text-xs font-body uppercase tracking-[0.2em] transition-all rounded-full ${isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground/90 hover:text-foreground hover:bg-background/60"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Service Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 max-w-6xl mx-auto items-center">
            {/* Image side */}
            <div>
              <div className="mb-4">
                <p className="text-foreground font-title text-2xl">SNS</p>
                <h2 className="font-title font-bold text-2xl text-primary">
                  {activeService.title.replace("SNS ", "")}
                </h2>
              </div>

              {(() => {
                const galleryImages =
                  activeService.images && activeService.images.length > 0
                    ? activeService.images
                    : activeService.image
                      ? [activeService.image]
                      : [];

                const currentIndex =
                  selectedImageIndex[activeService.id] ?? 0;

                const currentImage = galleryImages[currentIndex];

                if (!currentImage) {
                  return (
                    <div className="rounded-lg border border-dashed border-border h-[300px] flex items-center justify-center text-muted-foreground text-sm">
                      No image available
                    </div>
                  );
                }

                return (
                  <>
                    <div className="rounded-lg overflow-hidden border border-border mb-3">
                      <img
                        src={currentImage}
                        alt={activeService.title}
                        className="w-full h-[450px] object-cover"
                      />
                    </div>

                    {galleryImages.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {galleryImages.map((img, index) => (
                          <button
                            key={img + index}
                            type="button"
                            onClick={() =>
                              setSelectedImageIndex((prev) => ({
                                ...prev,
                                [activeService.id]: index,
                              }))
                            }
                            className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${currentIndex === index
                                ? "border-primary ring-2 ring-primary/40"
                                : "border-border"
                              }`}
                          >
                            <img
                              src={img}
                              alt={`${activeService.title} thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Text side */}
            <div>
              <RenderContent text={activeService.desc} className="mb-4" />

              {activeService.longDesc && (
                <RenderContent text={activeService.longDesc} className="mb-6" />
              )}

              <Link to={`/projects${getProjectSectionId(activeService.label || activeService.title) ? `#${getProjectSectionId(activeService.label || activeService.title)}` : ""}`}>
                <Button variant="secondary" className="font-bold uppercase tracking-wider">
                  See Projects
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;