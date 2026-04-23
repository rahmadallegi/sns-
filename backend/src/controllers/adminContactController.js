const db = require("../config/database");
const logger = require("../utils/logger");

// GET /api/admin/contact-messages - list contact form submissions
const getContactMessages = async (req, res, next) => {
  try {
    let rows;
    try {
      [rows] = await db.query(
        "SELECT id, name, email, phone, subject, message, COALESCE(status, 'unread') AS status, created_at FROM messages ORDER BY created_at DESC"
      );
    } catch (colErr) {
      if (colErr?.code === "ER_BAD_FIELD_ERROR") {
        const [plain] = await db.query(
          "SELECT id, name, email, phone, subject, message, created_at FROM messages ORDER BY created_at DESC"
        );
        rows = plain.map((r) => ({ ...r, status: "unread" }));
      } else throw colErr;
    }
    const data = rows.map((r) => ({
      id: String(r.id),
      name: r.name,
      email: r.email,
      phone: r.phone || "",
      subject: r.subject || "",
      message: r.message,
      date: r.created_at ? new Date(r.created_at).toISOString().slice(0, 10) : "",
      status: r.status || "unread",
    }));
    res.json({ message: "successful", data });
  } catch (err) {
    logger.error("Get contact messages error: %o", err);
    next(err);
  }
};

// PATCH /api/admin/contact-messages/:id - mark as read/replied
const updateContactMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["unread", "read", "replied"].includes(status)) {
      return res.status(400).json({ message: "Valid status (unread, read, replied) is required" });
    }
    const [result] = await db.query("UPDATE messages SET status = ? WHERE id = ?", [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    logger.info("Contact message %s status updated to %s", id, status);
    res.json({ message: "Status updated" });
  } catch (err) {
    logger.error("Update contact message status error: %o", err);
    next(err);
  }
};

// DELETE /api/admin/contact-messages/:id
const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM messages WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    logger.info("Contact message deleted: ID %s", id);
    res.json({ message: "Contact message deleted" });
  } catch (err) {
    logger.error("Delete contact message error: %o", err);
    next(err);
  }
};

module.exports = {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
};
