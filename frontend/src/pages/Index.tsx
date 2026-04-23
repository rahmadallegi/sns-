import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";
import { useState, useEffect } from "react";
import { apiGet, API_BASE_URL } from "@/lib/api";

interface AboutCard {
  title: string;
  desc: string;
}

interface CoreService {
  title: string;
  images: string[];
  desc: string;
}

interface RecentProject {
  title: string;
  image: string;
}

const Index = () => {
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([]);
  const [coreServices, setCoreServices] = useState<CoreService[]>([]);
  const [selectedServiceImage, setSelectedServiceImage] = useState<Record<string, number>>({});
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const BASE_URL = API_BASE_URL;

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    const fetchIndexData = async () => {
      try {
        const data = await apiGet<{
          message: string;
          aboutCards: AboutCard[];
          coreServices: CoreService[];
          recentProjects: RecentProject[];
        }>("/api/index");

        if (data.message === "successful") {
          setAboutCards(data.aboutCards);
          setCoreServices(data.coreServices);
          setSelectedServiceImage(
            Object.fromEntries(data.coreServices.map((s) => [s.title, 0]))
          );
          setRecentProjects(data.recentProjects);
        } else {
          console.error("Unexpected response from index API", data);
        }
      } catch (error) {
        console.error("Error fetching index data:", error);
      }
    };

    void fetchIndexData();
  }, []);

  interface AutoSlideProps {
    coreServices: CoreService[];
    selectedServiceImage: Record<string, number>;
    setSelectedServiceImage: React.Dispatch<
      React.SetStateAction<Record<string, number>>
    >;
  }

  const AutoSlideCoreServices = ({
    coreServices,
    setSelectedServiceImage,
  }: AutoSlideProps) => {
    useEffect(() => {
      const intervals: ReturnType<typeof setInterval>[] = [];
      coreServices.forEach((s) => {
        if (!s.images || s.images.length <= 1) return;

        const interval = setInterval(() => {
          setSelectedServiceImage((prev) => ({
            ...prev,
            [s.title]: ((prev[s.title] ?? 0) + 1) % s.images.length,
          }));
        }, 4000);

        intervals.push(interval);
      });

      return () => intervals.forEach((i) => clearInterval(i));
    }, [coreServices, setSelectedServiceImage]);

    return null; // this component doesn't render anything
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="font-body text-xl md:text-2xl lg:text-5xl font-bold text-background leading-[100px] mb-6 max-w-5xl">
              Integrated Solutions for Construction, Logistics & Technology
            </h1>
            <p className="font-body text-background/80 lg:text-[17px] md:text-xl mb-8 leading-relaxed">
              We provide construction, fleet management, telecom and operational support solutions with efficiency and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button size="lg" variant="outline">
                  Our Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-background font-body text-5xl mb-3">
              About Our Company
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aboutCards.map((card) => (
              <div
                key={card.title}
                className="bg-secondary rounded-lg p-1 hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300"
              >
                <h3 className="font-title text-center text-xl mb-3 text-background">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Core Services Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="font-body text-5xl text-foreground">
              Our Core Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {coreServices.map((s) => {
              const selectedIndex = selectedServiceImage[s.title] ?? 0;
              const selectedImage = s.images?.[selectedIndex];
              const imageKey = `${s.title}-${selectedIndex}`;
              const hasError = imageErrors[imageKey];

              return (
                <div
                  key={s.title}
                  className="bg-background rounded-lg p-8 hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300 group"
                >
                  {/* Titles */}
                  <h3 className="font-title font-semibold text-2xl mb-2 text-foreground">
                    SNS
                  </h3>
                  <h3 className="font-title font-semibold text-2xl mb-4 text-primary">
                    {s.title}
                  </h3>

                  {/* Main Image */}
                  {selectedImage && !hasError ? (
                    <div className="relative h-64 overflow-hidden  mb-4">
                      <img
                        src={`${BASE_URL}/images/${selectedImage}`}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => handleImageError(imageKey)}
                      />
                    </div>
                  ) : (
                    <div className="h-64 rounded-lg mb-4 bg-muted flex items-center justify-center text-muted-foreground">
                      No image available
                    </div>
                  )}

                  {/* Thumbnails */}
                  {s.images && s.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto mb-4">
                      {s.images.map((img, i) => {
                        const thumbKey = `${s.title}-thumb-${i}`;
                        const thumbError = imageErrors[thumbKey];
                        const isSelected = selectedIndex === i;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedServiceImage((prev) => ({
                                ...prev,
                                [s.title]: i,
                              }));
                            }}
                            className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${isSelected
                                ? "border-primary ring-2 ring-primary/40"
                                : "border-border"
                              }`}
                          >
                            {!thumbError ? (
                              <img
                                src={`${BASE_URL}/images/${img}`}
                                alt={`${s.title} thumbnail ${i + 1}`}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(thumbKey)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                No img
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto-slide logic outside map */}
        {coreServices.length > 0 && (
          <AutoSlideCoreServices
            coreServices={coreServices}
            selectedServiceImage={selectedServiceImage}
            setSelectedServiceImage={setSelectedServiceImage}
          />
        )}
      </section>

      {/* Recent Projects */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-background font-body text-5xl md:text-5xl mb-3">
              SNS Notable Projects
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {recentProjects.map((p) => (
              <div
                key={p.title}
                className="bg-secondary overflow-hidden hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 group"
              >

                <div className="p-6">
                  <h3 className="font-body text-lg mb-2 text-background leading-relaxed">
                    {p.title}
                  </h3>
                </div>
                <div className="h-96 overflow-hidden">
                  <img
                    src={`${BASE_URL}/images/${p.image}`}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="secondary" className="border border-background hover:bg-secondary/80">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */} <section className="section-padding bg-background">
        <div className="container mx-auto px-4 ">
          <div className="max-w-xl text-center">
            <h2 className="font-heading text-2xl md:text-4xl lg:text-6xl font-bold text-primary mb-8 ">
              Ready to Start Your Project?
            </h2>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8" >
                Request a Quote </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;