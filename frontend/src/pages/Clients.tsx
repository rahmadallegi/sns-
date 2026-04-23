import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroClients from "@/assets/hero-clients.png";
import { useState, useEffect } from "react";
import { apiGet, API_BASE_URL as BASE_URL } from "@/lib/api";

interface Client {
  name: string;
  logo: string;
}

interface ComplianceSection {
  title: string;
  image?: string;
  content: string;
  list?: string[];
  extras?: string[];
}

// Fallback default data
const defaultClients: Client[] = [
  { name: "SEAPA\nSaudi Ports Authority", logo: "clients/seapa.png" },
  { name: "RSNF\nRoyal Saudi Navy", logo: "clients/rsnf.png" },
  { name: "Ministry of Water &\nElectricity", logo: "clients/ministry-water.png" },
  { name: "GACA - General Authority\nof Civil Aviation", logo: "clients/gaca.png" },
];

const defaultCompliance: ComplianceSection[] = [
  {
    title: "Corporate Social Responsibility (CSR)",
    image: "clients/compliance-csr.jpg",
    content:
      "SNS believes and acts socially responsible. It has reorganized its business goals to not only benefit business but also help society.",
    list: [
      "Has improved local hiring to boost Saudization",
      "Hiring more Saudi women into workforce",
      "Offer more incentives and on-the-job training to develop productive Saudi workforce",
      "Allow college students to be trained at office campus to support their projects",
    ],
  },
  {
    title: "Sustainability",
    image: "clients/compliance-sustainability.jpg",
    content:
      "Our Waste Management stands for Sustainability. SNS employs methodologies for protecting environment:",
    list: [
      "Reduce Waste",
      "Recycle",
      "Maximize recyclable content in procurement",
      "Minimize single-use materials/tools/equipment",
      "Maintain separate components for recyclable process",
      "Employee awareness and training on sustainable methods",
    ],
  },
  {
    title: "Health Safety Environment (HSE)",
    image: "clients/compliance-hse.jpg",
    content:
      "SNS believes its employees are true assets. It performs regular auditing to ensure health and safety compliance, and has an HSE plan and manual ready.",
  },
];

// Renders text with bullet lines like WhoWeAre page
const RenderContent = ({
  text,
  className = "",
  textColor = "text-foreground",
}: {
  text: string;
  className?: string;
  textColor?: string;
}) => {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let keyCounter = 0;

  const flushBullets = () => {
    if (!bulletBuffer.length) return;
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

const Clients = () => {
  const [clientsData, setClientsData] = useState<Client[]>(defaultClients);
  const [complianceData, setComplianceData] = useState<ComplianceSection[]>(defaultCompliance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await apiGet<{
          message: string;
          clients?: Client[];
          compliance?: ComplianceSection[];
        }>("/api/clients", { signal: controller.signal });

        if (data.message === "successful") {
          if (Array.isArray(data.clients) && data.clients.length > 0) setClientsData(data.clients);
          if (Array.isArray(data.compliance) && data.compliance.length > 0) setComplianceData(data.compliance);
        } else {
          setError("Unexpected response from clients API");
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error fetching clients data:", err);
          setError("Unable to load client data. Using fallback content.");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchClients();
    return () => controller.abort();
  }, []);

  return (
    <Layout>
      <Tabs defaultValue="client" className="w-full">
        {/* Tabs Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 flex justify-center py-3">
            <TabsList className="bg-transparent gap-2">
              <TabsTrigger
                value="client"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6"
              >
                Client
              </TabsTrigger>
              <TabsTrigger
                value="compliance"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6"
              >
                Compliance
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Client Tab */}
        <TabsContent value="client" className="mt-0">
          <div className="relative h-[35vh] min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroClients})` }} />
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="relative z-10 text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-background mb-3">
                OUR PRESTIGIOUS CLIENTS
              </h1>
              <p className="text-background/80 text-lg">
                Building strong partnerships with leading organizations.
              </p>
            </div>
          </div>

          <section className="section-padding bg-background">
            <div className="container mx-auto px-4">
              {loading ? (
                <p>Loading clients...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-20 max-w-6xl mx-auto">
                  {clientsData.map((client) => (
                    <div
                      key={client.name}
                      className="bg-foreground border-4 border-foreground overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-52 flex items-center justify-center p-4 bg-background">
                        <img
                          src={
                            client.logo.startsWith("http")
                              ? client.logo
                              : `${BASE_URL}/images/${client.logo.replace(/^\/?images\//, "")}`
                          }
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="bg-foreground/85 text-background px-3 py-3 text-center">
                        <p className="text-xs font-medium whitespace-pre-line leading-tight">
                          {client.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {error && <p className="mt-4 text-destructive">{error}</p>}
            </div>
          </section>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="mt-0">
          <section className="section-padding bg-background">
            <div className="container mx-auto px-4 max-w-4xl space-y-14">
              {complianceData.map((section, secIndex) => (
                <div key={secIndex}>

                  {/* Image */}
                  {section.image && (
                    <div className="relative mb-4">
                      {/* Image */}
                      <img
                        src={
                          section.image.startsWith("http")
                            ? section.image
                            : `/images/${section.image.replace(/^\/?images\//, "")}`
                        }
                        alt={section.title}
                        className="w-full h-44 object-cover rounded-md border border-border"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />

                      <h2 className="absolute inset-y-0 left-6 flex items-center font-heading text-2xl md:text-3xl font-bold text-background text-shadow px-4 py-2 text-left">
                        {section.title}
                      </h2>
                    </div>
                  )}

                  {/* Content */}
                  {section.content && <RenderContent text={section.content} className="mb-3" />}

                  {/* Bullet list */}
                  {section.list?.length && (
                    <ul className="list-none space-y-1.5 mt-2 mb-3">
                      {section.list.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-foreground text-base leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Optional extras */}
                  {section.extras?.length && (
                    <ul className="list-none space-y-1.5 mt-2">
                      {section.extras.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-foreground text-base leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Clients;