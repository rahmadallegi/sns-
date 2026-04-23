const db = require("../config/database");

const logger = require("../utils/logger");

// helper to send consistent success responses
const sendSuccess = (res, data) => res.json({ message: "successful", ...data });

// fallback static data for pages that may not yet be in DB
// Text aligned with the approved "Who We Are" page content
const fallbackWhoWeAre = {
  overview: {
    title: "Who We Are",
    shortDescription:
      "With more than 30 years of experience in delivering highly complex projects, we operate with the highest levels of quality, safety and technical expertise, and integrate closely with clients and local supply chains. " +
      "SNS is among the most diversified companies in the Kingdom and has expanded to meet the different challenges and requirements of clients. We are a leading player in executing projects in construction, operations and maintenance, professional support services, and telecommunications and electronics, fulfilling national and public missions alongside our commercial activity. " +
      "Today SNS is involved in large-scale projects in the Kingdom and abroad, with proven achievements in international project development. Our clients are more than projects; our reputation relies on the continued satisfaction of each one across the wide range of market fields and technology-driven engineering projects we deliver.",
    strengths: [
      "30+ years delivering complex projects",
      "High standards of quality, safety and technical expertise",
      "Diverse portfolio across construction, O&M, support services and telecom",
      "Strong track record in large-scale and international projects",
    ],
  },
  sections: [
    {
      key: "vision",
      title: "Vision",
      content:
        "To be a leading firm in the Construction, Operations & Maintenance and Waste Management sector while maintaining international standards to provide the highest levels of customer satisfaction.\n\n" +
        "SNS aims to use the latest technology tools and bring creative ideas to become a national and international partner to customers who seek real value from their services.",
    },
    {
      key: "mission",
      title: "Mission",
      content:
        "To be a leading company in the MENA region for Construction, Operations & Maintenance, Support Services and Waste Management.",
      list: [
        "Construction",
        "Operations & Maintenance",
        "Support Services",
        "Waste Management",
      ],
      extras: [
        "Maximize customer satisfaction through continuous process improvements",
        "Adopt state-of-the-art technology tools to improve productivity and cost effectiveness",
        "Employ the latest safety measures to achieve a zero-accident culture",
        "Use green methods and technologies to reduce environmental impact",
      ],
    },
    {
      key: "values",
      title: "Values",
      content:
        "Since its inception, SNS’s culture has thrived on strong principles that have been passed from generation to generation through the hands of our leaders and workforce. Today, these core values remain the cornerstone of our company.",
      list: [
        "Transparency",
        "Integrity",
        "Environmentally friendly materials to achieve sustainable development",
        "Creativity and innovation",
        "Collaborative and empowered work teams",
        "Company social responsibility (CSR)",
        "Maintaining the highest standards of safety and security",
      ],
    },
    {
      key: "strategy",
      title: "Strategy",
      content:
        "The company believes that our future depends on how we care for our planet and has placed sustainability at the core of its strategy.",
      list: [
        "Expansion with biodiversity inclusiveness",
        "Promoting green projects",
        "Capitalizing waste management experience to acquire green projects",
        "Leveraging airport management experience to develop new opportunities",
      ],
    },
  ],
  governance: {
    // frontend builds full URL as `${BASE_URL}/images/${value}`
    governanceStructureImage: "who-we-are/new-governance-structure-thumb.jpg",
    organizationalChartImage: "who-we-are/new-organizational-structure-thumb.jpg",
  },
  certificates: [
    // frontend expects relative paths that it prefixes with `${BASE_URL}/images/`
    { title: "Command Control and Tactical", image: "certificates/cert-1.jpg" },
    { title: "166th Area Support Group", image: "certificates/cert-2.jpg" },
    { title: "Task Force Mountain", image: "certificates/cert-3.jpg" },
    { title: "16th Engineering Brigade", image: "certificates/cert-4.jpg" },
    { title: "BAE Systems", image: "certificates/cert-5.jpg" },
  ],
};

const fallbackClients = {
  clients: [
    // frontend prefixes these with `${BASE_URL}/images/`
    { name: "SEAPA - Saudi Ports Authority", logo: "clients/seapa.png" },
    { name: "Royal Saudi Navy", logo: "clients/rsnf.png" },
    { name: "Ministry of Water & Electricity", logo: "clients/ministry-water.png" },
    { name: "GACA", logo: "clients/gaca.png"},
    { name: "USMTM", logo: "clients/usmtm.png" },
    { name: "King Abdulaziz International Airport", logo: "clients/jeddah-airport.png" },
  ],
  compliance: [
    {
      title: "Corporate Social Responsibility (CSR)",
      image: "clients/compliance-csr.jpg",
      content:
        "SNS takes deliberate action to improve social outcomes by empowering local talent and supporting sustainable community growth.",
    },
    {
      title: "Sustainability",
      image: "clients/compliance-sustainability.jpg",
      content:
        "SNS embeds sustainability in waste management and energy-efficient operations across its value chain.",
    },
    {
      title: "Health Safety Environment (HSE)",
      image: "clients/compliance-hse.jpg",
      content:
        "The company maintains a comprehensive HSE program with regular audits and workforce training.",
    },
  ],
};

// GET /api/index
const getIndex = async (req, res, next) => {
  try {
    const [aboutCards] = await db.query("SELECT title, description AS `desc` FROM about_cards");
    const [coreServiceRows] = await db.query(
      "SELECT s.id, s.title, s.description AS `desc`, i.image_url FROM core_services s LEFT JOIN core_service_images i ON s.id = i.service_id"
    );

    const coreServices = Object.values(
      coreServiceRows.reduce((acc, row) => {
        if (!acc[row.id]) {
          acc[row.id] = {
            title: row.title,
            desc: row.desc,
            images: [],
          };
        }

        if (row.image_url) {
          acc[row.id].images.push(row.image_url);
        }

        return acc;
      }, {})
    );

    const [recentProjects] = await db.query("SELECT title, image FROM projects WHERE category='recent'");

    sendSuccess(res, { aboutCards: aboutCards || [], coreServices, recentProjects: recentProjects || [] });
  } catch (err) {
    if (err?.code === "ER_NO_SUCH_TABLE") {
      logger.warn("Index tables missing, returning empty data");
      return sendSuccess(res, { aboutCards: [], coreServices: [], recentProjects: [] });
    }
    next(err);
  }
};

// GET /api/services
const getServices = async (req, res, next) => {
  try {
    // Try to load services with optional multiple images
    const [serviceRows] = await db.query(
      `SELECT
         s.id,
         s.label,
         s.title,
         s.description,
         s.long_description,
         s.image AS primary_image,
         si.image_url AS extra_image
       FROM services s
       LEFT JOIN service_images si ON s.id = si.service_id
       ORDER BY s.display_order, s.id`
    );

    const [features] = await db.query("SELECT * FROM service_features");

    const servicesById = serviceRows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: String(row.id),
          label: row.label,
          title: row.title,
          desc: row.description,
          longDesc: row.long_description,
          image: row.primary_image,
          images: [],
        };
      }

      const imagesSet = new Set(acc[row.id].images);
      if (row.primary_image && !imagesSet.has(row.primary_image)) {
        imagesSet.add(row.primary_image);
      }
      if (row.extra_image && !imagesSet.has(row.extra_image)) {
        imagesSet.add(row.extra_image);
      }
      acc[row.id].images = Array.from(imagesSet);

      return acc;
    }, {});

    const serviceTabs = Object.values(servicesById).map((service) => ({
      ...service,
      features: features
        .filter((f) => String(f.service_id) === String(service.id))
        .map((f) => ({
          name: f.name,
          detail: f.detail,
        })),
    }));

    return sendSuccess(res, { serviceTabs });
  } catch (err) {
    if (err?.code === "ER_NO_SUCH_TABLE") {
      // Fallback to original single-image implementation if service_images does not exist
      logger.warn("service_images table missing, falling back to single-image services");
      const [services] = await db.query("SELECT * FROM services");
      const [features] = await db.query("SELECT * FROM service_features");
      const serviceTabs = services.map((service) => ({
        id: String(service.id),
        label: service.label,
        title: service.title,
        desc: service.description,
        longDesc: service.long_description,
        image: service.image,
        images: service.image ? [service.image] : [],
        features: features
          .filter((f) => f.service_id === service.id)
          .map((f) => ({
            name: f.name,
            detail: f.detail,
          })),
      }));

      return sendSuccess(res, { serviceTabs });
    }

    next(err);
  }
};

// GET /api/projects
// Supports multiple images per project via optional `project_images` table.
const getProjects = async (req, res, next) => {
  try {
    // Try to load projects with any extra images from project_images
    const [rows] = await db.query(
      `SELECT
         p.id,
         p.title,
         p.detail,
         p.category,
         p.image AS primary_image,
         pi.image_url AS extra_image,
         pi.is_primary
       FROM projects p
       LEFT JOIN project_images pi ON p.id = pi.project_id
       ORDER BY p.category, p.id`
    );

    const byCategory = {
      construction: [],
      easability: [],
      parking: [],
      support: [],
      telecom: [],
      waste: [],
    };

    const byId = {};

    for (const row of rows) {
      if (!byId[row.id]) {
        const initialImages = [];
        if (row.primary_image) initialImages.push(row.primary_image);

        byId[row.id] = {
          title: row.title,
          detail: row.detail,
          image: row.primary_image || null,
          images: initialImages,
          category: row.category,
        };
      }

      const project = byId[row.id];
      const imagesSet = new Set(project.images);

      if (row.extra_image && !imagesSet.has(row.extra_image)) {
        imagesSet.add(row.extra_image);
        project.images = Array.from(imagesSet);

        // If this image is flagged primary at image level, use it
        if (row.is_primary && row.extra_image) {
          project.image = row.extra_image;
        }
      }
    }

    Object.values(byId).forEach((project) => {
      const list = byCategory[project.category] || [];
      list.push({
        title: project.title,
        detail: project.detail,
        image: project.image || project.images[0] || "",
        images: project.images,
      });
      byCategory[project.category] = list;
    });

    return sendSuccess(res, {
      constructionProjects: byCategory.construction || [],
      easabilityProjects: byCategory.easability || [],
      parkingProjects: byCategory.parking || [],
      supportProjects: byCategory.support || [],
      telecomProjects: byCategory.telecom || [],
      wasteProjects: byCategory.waste || [],
    });
  } catch (err) {
    if (err?.code === "ER_NO_SUCH_TABLE") {
      // If project_images table does not exist, fall back to single-image behaviour
      try {
        const [constructionProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='construction'"
        );
        const [easabilityProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='easability'"
        );
        const [parkingProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='parking'"
        );
        const [supportProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='support'"
        );
        const [telecomProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='telecom'"
        );
        const [wasteProjects] = await db.query(
          "SELECT title, detail, image FROM projects WHERE category='waste'"
        );

        return sendSuccess(res, {
          constructionProjects,
          easabilityProjects,
          parkingProjects,
          supportProjects,
          telecomProjects,
          wasteProjects,
        });
      } catch (fallbackErr) {
        return next(fallbackErr);
      }
    }

    return next(err);
  }
};

// GET /api/who-we-are
const getWhoWeAre = async (req, res, next) => {
  try {
    const [whoRows] = await db.query(
      "SELECT title, short_description AS shortDescription, key_section AS keySection, content, image FROM who_we_are ORDER BY display_order"
    );

    if (whoRows && whoRows.length) {
      // Use a dedicated overview row when available, otherwise fall back to the first row
      const overviewRow =
        whoRows.find((row) => row.keySection === "overview") ?? whoRows[0];

      const sections = whoRows
        .filter((row) => row !== overviewRow)
        .map((row) => ({
          key: row.keySection || row.title.toLowerCase().replace(/\s+/g, "-"),
          title: row.title,
          content: row.content,
          image: row.image,
        }));

      

      return sendSuccess(res, {
        overview: overviewRow,
        sections,
        governance: fallbackWhoWeAre.governance,
        certificates: fallbackWhoWeAre.certificates,
      });
    }

    sendSuccess(res, fallbackWhoWeAre);
  } catch (err) {
    if (err?.code === "ER_NO_SUCH_TABLE") {
      logger.warn("WhoWeAre table missing, returning fallback data");
      return sendSuccess(res, fallbackWhoWeAre);
    }
    next(err);
  }
};

// GET /api/clients
const getClients = async (req, res, next) => {
  try {
    // Fetch clients
    const [clientsRows] = await db.query(
      "SELECT name, logo_url AS logo FROM clients ORDER BY name"
    );

    // Fetch compliance sections
    const [complianceRows] = await db.query(
      "SELECT title, content, image FROM compliance ORDER BY display_order"
    );

    // Map clients
    const clientsList = clientsRows.map((c) => ({
      name: c.name,
      logo: c.logo,
    }));

    const complianceSections = complianceRows.length
      ? complianceRows
      : fallbackClients.compliance;

    // Return results
    return sendSuccess(res, {
      clients: clientsList.length ? clientsList : fallbackClients.clients,
      compliance: complianceSections,
    });
  } catch (err) {
    if (err?.code === "ER_NO_SUCH_TABLE") {
      logger.warn("Clients or compliance table missing, returning fallback data");
      return sendSuccess(res, {
        clients: fallbackClients.clients,
        compliance: fallbackClients.compliance,
      });
    }
    next(err);
  }
};

// GET /api/contact
const getContact = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact WHERE id = 1");
    return res.json({ message: "successful", data: rows[0] });
  } catch (err) {
    logger.error("Get public contact error: %o", err);
    next(err);
  }
};

// POST /api/contact
const postContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    logger.info("Contact form submission: %o", { name, email, phone, subject, message });
    await db.query(
      "INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, subject, message]
    );
    res.json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIndex,
  getServices,
  getProjects,
  getWhoWeAre,
  getClients,
  getContact,
  postContact,
};