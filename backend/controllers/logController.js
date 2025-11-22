import AuditLog from '../models/AuditLog.js';

// Controller to fetch paginated audit logs
export const getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // Current page
    const limit = parseInt(req.query.limit) || 5; // Number of logs per page

    const total = await AuditLog.countDocuments(); // Total number of logs
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })                     // Most recent logs first
      .skip((page - 1) * limit)                   // Skip logs for previous pages
      .limit(limit);                               // Limit logs per page

    res.json({
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit)         // Total pages calculation
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
};
