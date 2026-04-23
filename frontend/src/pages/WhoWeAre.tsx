import Layout from "@/components/Layout";
import { Target, Eye, Heart, TrendingUp } from "lucide-react";
import hero from "@/assets/hero.png";
import hero_certif from "@/assets/hero-certif.png";
import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";

interface WhoWeAreSection {
  key: string;
  title: string;
  content: string;
  list?: string[];
  extras?: string[];
  image?: string;
}

interface GovernanceData {
  governanceStructureImage: string;
  organizationalChartImage: string;
}

interface Certificate {
  title: string;
  image: string;
}

interface WhoWeAreOverview {
  title: string;
  shortDescription: string;
  strengths?: string[];
}

import { API_BASE_URL } from '@/lib/api';

const BASE_URL = API_BASE_URL;

const defaultData = {
  overview: {
    title: "Who We Are",
    shortDescription:
      "SNS is a leading Construction, Operations & Maintenance, and Waste Management company with 30+ years of experience in the MENA region.",
    strengths: [
      "Customer-centric project delivery",
      "Strong local and international partnerships",
      "Commitment to safety and sustainability",
    ],
  } as WhoWeAreOverview,
  sections: [
    {
      key: "vision",
      title: "Vision",
      content:
        "To be a leading firm in the Construction, Operations & Maintenance and Waste Management sector while maintaining international standards to provide highest customer satisfaction.\n\nSNS wants to use latest technology tools and bring creative ideas to become a national and international partner to its customers who seek value for their services.",
    },
    {
      key: "mission",
      title: "Mission",
      content:
        "To be a leading company in the MENA region for:",
      list: ["Construction", "Operations & Maintenance", "Support Services", "Waste Management"],
      extras: [
        "Maximize customer satisfaction through process improvements",
        "Adopt state-of-the-art technology tools and improve productivity and cost effectiveness",
        "Employ latest safety measures and make zero accidents company",
        "Use green methods and technologies to have reduced environmental impact",
      ],
    },
    {
      key: "values",
      title: "Values",
      content:
        "Since its inception, SNS's culture has thrived on strong principles. From generation to generation, the torch has been passed down and carried by the hands of our leaders and workforce. Today, our core values remain our company's cornerstone.",
      list: [
        "Transparency",
        "Integrity",
        "Environmentally friendly materials to achieve sustainable development",
        "Creativity and innovation",
        "Work team",
        "Company social responsibility (CSR)",
        "Maintain highest standard of safety and security",
      ],
    },
    {
      key: "strategy",
      title: "Strategy",
      content:
        "The company believes that our future depends on how we care for our planet. It has kept planet sustainability at the core of its strategy:",
      list: [
        "Expansion with biodiversity inclusiveness",
        "Promoting green projects",
        "Capitalize waste management experience to acquire green projects",
        "Utilize airports management experience to improve opportunities",
      ],
    },
  ] as WhoWeAreSection[],
  governance: {
    governanceStructureImage: "who-we-are/new-governance-structure-thumb.jpg",
    organizationalChartImage: "who-we-are/new-organizational-structure-thumb.jpg",
  } as GovernanceData,
  certificates: [
    { title: "Command Control and Tactical", image: "certificates/cert-1.jpg" },
    { title: "166th Area Support Group", image: "certificates/cert-2.jpg" },
    { title: "Task Force Mountain", image: "certificates/cert-3.jpg" },
    { title: "16th Engineering Brigade", image: "certificates/cert-4.jpg" },
    { title: "BAE Systems", image: "certificates/cert-5.jpg" },
  ] as Certificate[],
};


// Renders text with support for bullet lines (lines starting with -, •, or *)
const RenderContent = ({ text, className = "", textColor = "text-foreground" }: { text: string; className?: string; textColor?: string }) => {
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
          // ✅ CHANGED: was text-background, now text-foreground for Vision/Mission/etc. sections
          <p key={`p-${keyCounter++}`} className={`${textColor} font-body text-base leading-relaxed mb-2`}>
            {trimmed}
          </p>
        );
      }
    }
  }
  flushBullets();

  return <div className={className}>{blocks}</div>;
};

const WhoWeAre = () => {
  const [overview, setOverview] = useState<WhoWeAreOverview>(defaultData.overview);
  const [sections, setSections] = useState<WhoWeAreSection[]>(defaultData.sections);
  const [governance, setGovernance] = useState<GovernanceData>(defaultData.governance);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultData.certificates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchWhoWeAre = async () => {
      setLoading(true);
      try {
        const data = await apiGet<{
          message: string;
          overview?: WhoWeAreOverview;
          sections?: WhoWeAreSection[];
          governance?: GovernanceData;
          certificates?: Certificate[];
        }>("/api/who-we-are", { signal: controller.signal });

        if (data.message === "successful") {
          if (data.overview) setOverview(data.overview);
          if (Array.isArray(data.sections) && data.sections.length > 0) setSections(data.sections);
          if (data.governance) setGovernance(data.governance);
          if (Array.isArray(data.certificates) && data.certificates.length > 0) setCertificates(data.certificates);
        } else {
          setError("Unexpected response from who-we-are API");
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("WhoWeAre fetch error", err);
          setError("Unable to load section details. Using fallback content.");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchWhoWeAre();
    return () => controller.abort();
  }, []);

  return (
    <Layout>
      <section className="relative h-[40vh] min-h-[280px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
        </div>
      </section>

      {error && (
        <section className="section-padding bg-accent/10 text-accent">
          <p>{error}</p>
        </section>
      )}

      {loading ? (
        <section className="section-padding bg-secondary">
          <div className="container mx-auto px-4">Loading Who We Are content...</div>
        </section>
      ) : (
        <>
          <section className="section-padding bg-secondary">
            <div className="container mx-auto px-4 max-w-5xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-background mb-8">About Us</h1>
              {/* ✅ CHANGED: was text-muted-foreground, now text-background */}
              <div className="space-y-5 text-background text-lg leading-relaxed">
                <RenderContent text={overview.shortDescription} textColor="text-background" />
                {overview.strengths?.length ? (
                  <ul className="list-disc list-inside">
                    {overview.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-heading text-xl text-background text-center mb-6">Governance Structure</h2>
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    
                    <img
                      src={`${BASE_URL}/images/${governance.governanceStructureImage}`}
                      alt="SNS Governance Structure"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-xl text-background text-center mb-6">Organizational Chart</h2>
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <img
                      src={`${BASE_URL}/images/${governance.organizationalChartImage}`}
                      alt="SNS Organizational Chart"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-14">
                {sections.map((section) => {
                  const icon =
                    section.key === "vision"
                      ? Eye
                      : section.key === "mission"
                        ? Target
                        : section.key === "values"
                          ? Heart
                          : TrendingUp;
                  const IconComponent = icon;

                  return (
                    <div key={section.key}>
                      {/* Title row: icon left + title */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="text-primary" size={20} />
                        </div>
                        <h2 className="font-body text-2xl md:text-3xl font-bold text-primary">{section.title}</h2>
                      </div>

                      {/* Full-width content */}
                      <RenderContent text={section.content} className="mb-1" />

                      {section.list?.length ? (
                        <ul className="list-none space-y-1.5 mt-2 mb-2">
                          {section.list.map((item, index) => (
                            <li key={item} className="flex items-start gap-2 text-foreground text-base leading-relaxed">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <span>
                                {section.key === "mission"
                                  ? `${String.fromCharCode(97 + index)}) ${item}`
                                  : item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {section.extras?.length ? (
                        <ul className="list-none space-y-1.5 mt-2">
                          {section.extras.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-foreground text-base leading-relaxed">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-background">
            <div className="relative h-72 min-h-[200px] flex items-center justify-center overflow-hidden mb-12"
              style={{ backgroundImage:`url(${hero_certif})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-foreground/10" />
              <div className="relative z-10 text-center">
                <h2 className="font-heading text-5xl md:text-4xl font-bold text-background mb-2">CERTIFICATE AWARDS</h2>
                <p className="text-background/80 text-3xl">Achievements That Reflect Our Expertise</p>
              </div>
            </div>
            <div className="container mx-auto px-4 pb-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {certificates.map((cert) => (
                  <div key={cert.title} className="text-center">
                    <h3 className="font-heading text-xl text-background mb-4">{cert.title}</h3>
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                      <img
                        src={`${BASE_URL}/images/${cert.image}`}
                        alt={cert.title}
                        className="w-full h-auto"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default WhoWeAre;