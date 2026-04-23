const db = require("../config/database");
const logger = require("../utils/logger");

// ========== ABOUT CARDS ==========
const getAboutCards = async (req, res, next) => {
  try {
    const [cards] = await db.query("SELECT id, title, description AS `desc` FROM about_cards");
    res.json({ message: "successful", data: cards });
  } catch (err) {
    logger.error("Get about cards error: %o", err);
    next(err);
  }
};

const createAboutCard = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const [result] = await db.query(
      "INSERT INTO about_cards (title, description) VALUES (?, ?)",
      [title, desc]
    );

    logger.info(`About card created: ID ${result.insertId}`);
    res.status(201).json({ message: "About card created", id: result.insertId });
  } catch (err) {
    logger.error("Create about card error: %o", err);
    next(err);
  }
};

const updateAboutCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const [result] = await db.query(
      "UPDATE about_cards SET title = ?, description = ? WHERE id = ?",
      [title, desc, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "About card not found" });
    }

    logger.info(`About card updated: ID ${id}`);
    res.json({ message: "About card updated" });
  } catch (err) {
    logger.error("Update about card error: %o", err);
    next(err);
  }
};

const deleteAboutCard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM about_cards WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "About card not found" });
    }

    logger.info(`About card deleted: ID ${id}`);
    res.json({ message: "About card deleted" });
  } catch (err) {
    logger.error("Delete about card error: %o", err);
    next(err);
  }
};

// ========== SERVICES ==========
const getServices = async (req, res, next) => {
  try {
    const [services] = await db.query(
      "SELECT id, label, title, description, long_description, image, display_order FROM services ORDER BY display_order"
    );
    const [features] = await db.query("SELECT * FROM service_features");

    const servicesWithFeatures = services.map((service) => ({
      ...service,
      features: features.filter((f) => f.service_id === service.id),
    }));

    res.json({ message: "successful", data: servicesWithFeatures });
  } catch (err) {
    logger.error("Get services error: %o", err);
    next(err);
  }
};

const createService = async (req, res, next) => {
  try {
    const { label, title, description, long_description, image, display_order } = req.body;

    if (!label || !title || !description) {
      return res.status(400).json({ message: "Label, title, and description are required" });
    }

    const [result] = await db.query(
      "INSERT INTO services (label, title, description, long_description, image, display_order) VALUES (?, ?, ?, ?, ?, ?)",
      [label, title, description, long_description || null, image || null, display_order || 0]
    );

    logger.info(`Service created: ID ${result.insertId}`);
    res.status(201).json({ message: "Service created", id: result.insertId });
  } catch (err) {
    logger.error("Create service error: %o", err);
    next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { label, title, description, long_description, image, display_order } = req.body;

    if (!label || !title || !description) {
      return res.status(400).json({ message: "Label, title, and description are required" });
    }

    const [result] = await db.query(
      "UPDATE services SET label = ?, title = ?, description = ?, long_description = ?, image = ?, display_order = ? WHERE id = ?",
      [label, title, description, long_description || null, image || null, display_order || 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    logger.info(`Service updated: ID ${id}`);
    res.json({ message: "Service updated" });
  } catch (err) {
    logger.error("Update service error: %o", err);
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete service features first
    await db.query("DELETE FROM service_features WHERE service_id = ?", [id]);

    const [result] = await db.query("DELETE FROM services WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    logger.info(`Service deleted: ID ${id}`);
    res.json({ message: "Service deleted" });
  } catch (err) {
    logger.error("Delete service error: %o", err);
    next(err);
  }
};

// ========== SERVICE FEATURES ==========
const createServiceFeature = async (req, res, next) => {
  try {
    const { service_id, name, detail } = req.body;

    if (!service_id || !name || !detail) {
      return res.status(400).json({ message: "Service ID, name, and detail are required" });
    }

    const [result] = await db.query(
      "INSERT INTO service_features (service_id, name, detail) VALUES (?, ?, ?)",
      [service_id, name, detail]
    );

    logger.info(`Service feature created: ID ${result.insertId}`);
    res.status(201).json({ message: "Service feature created", id: result.insertId });
  } catch (err) {
    logger.error("Create service feature error: %o", err);
    next(err);
  }
};

const deleteServiceFeature = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM service_features WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service feature not found" });
    }

    logger.info(`Service feature deleted: ID ${id}`);
    res.json({ message: "Service feature deleted" });
  } catch (err) {
    logger.error("Delete service feature error: %o", err);
    next(err);
  }
};

// ========== PROJECTS ==========
const getProjects = async (req, res, next) => {
  try {
    const [projects] = await db.query("SELECT id, title, detail, image, category FROM projects ORDER BY category");
    res.json({ message: "successful", data: projects });
  } catch (err) {
    logger.error("Get projects error: %o", err);
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { title, detail, image, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }

    const [result] = await db.query(
      "INSERT INTO projects (title, detail, image, category) VALUES (?, ?, ?, ?)",
      [title, detail || null, image || null, category]
    );

    logger.info(`Project created: ID ${result.insertId}`);
    res.status(201).json({ message: "Project created", id: result.insertId });
  } catch (err) {
    logger.error("Create project error: %o", err);
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, detail, image, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }

    const [result] = await db.query(
      "UPDATE projects SET title = ?, detail = ?, image = ?, category = ? WHERE id = ?",
      [title, detail || null, image || null, category, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    logger.info(`Project updated: ID ${id}`);
    res.json({ message: "Project updated" });
  } catch (err) {
    logger.error("Update project error: %o", err);
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    logger.info(`Project deleted: ID ${id}`);
    res.json({ message: "Project deleted" });
  } catch (err) {
    logger.error("Delete project error: %o", err);
    next(err);
  }
};

// ========== CLIENTS ==========
const getClients = async (req, res, next) => {
  try {
    const [clients] = await db.query("SELECT id, name, logo_url AS logo FROM clients ORDER BY name");
    res.json({ message: "successful", data: clients });
  } catch (err) {
    logger.error("Get clients error: %o", err);
    next(err);
  }
};

const createClient = async (req, res, next) => {
  try {
    const { name, logo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Client name is required" });
    }

    const [result] = await db.query("INSERT INTO clients (name, logo_url) VALUES (?, ?)", [
      name,
      logo || null,
    ]);

    logger.info(`Client created: ID ${result.insertId}`);
    res.status(201).json({ message: "Client created", id: result.insertId });
  } catch (err) {
    logger.error("Create client error: %o", err);
    next(err);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, logo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Client name is required" });
    }

    const [result] = await db.query(
      "UPDATE clients SET name = ?, logo_url = ? WHERE id = ?",
      [name, logo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    logger.info(`Client updated: ID ${id}`);
    res.json({ message: "Client updated" });
  } catch (err) {
    logger.error("Update client error: %o", err);
    next(err);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM clients WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    logger.info(`Client deleted: ID ${id}`);
    res.json({ message: "Client deleted" });
  } catch (err) {
    logger.error("Delete client error: %o", err);
    next(err);
  }
};

// ========== CLIENT LOGO UPLOAD ==========
const uploadClientLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Public URL path served by /uploads static route
    const uploadsUrlPrefix = process.env.UPLOADS_URL_PREFIX || "/uploads";
    const urlPath = `${uploadsUrlPrefix}/clients/${req.file.filename}`;
    res.status(201).json({ message: "Logo uploaded", url: urlPath });
  } catch (err) {
    logger.error("Upload client logo error: %o", err);
    next(err);
  }
};

// ========== CONTACT ==========
const getContact = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact WHERE id = 1");

    res.json({
      message: "successful",
      data: rows[0], // 👈 important (not array)
    });
  } catch (err) {
    logger.error("Get contact error: %o", err);
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { address, phone1, phone2, email, fax } = req.body;

    const [result] = await db.query(
      `UPDATE contact 
       SET address = ?, phone1 = ?, phone2 = ?, email = ?, fax = ?
       WHERE id = 1`,
      [address, phone1, phone2, email, fax]
    );

    logger.info("Contact updated");
    res.json({ message: "Contact updated" });
  } catch (err) {
    logger.error("Update contact error: %o", err);
    next(err);
  }
};

module.exports = {
  // About cards
  getAboutCards,
  createAboutCard,
  updateAboutCard,
  deleteAboutCard,
  // Services
  getServices,
  createService,
  updateService,
  deleteService,
  // Service features
  createServiceFeature,
  deleteServiceFeature,
  // Projects
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  // Clients
  getClients,
  createClient,
  updateClient,
  deleteClient,
  uploadClientLogo,
  getContact,
  updateContact,
};
