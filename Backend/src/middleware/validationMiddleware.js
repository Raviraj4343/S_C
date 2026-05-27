const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  return [];
};

export const validateVolunteerPayload = (req, res, next) => {
  const { fullName, email, phone, skills, interests, message } = req.body;

  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ success: false, message: "Valid full name is required." });
  }

  if (!email || !emailPattern.test(String(email).trim())) {
    return res.status(400).json({ success: false, message: "Valid email is required." });
  }

  if (!phone || String(phone).trim().length < 7) {
    return res.status(400).json({ success: false, message: "Valid phone number is required." });
  }

  if (!message || String(message).trim().length < 10) {
    return res.status(400).json({ success: false, message: "Message should be at least 10 characters." });
  }

  req.cleanedBody = {
    fullName: String(fullName).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    skills: normalizeList(skills),
    interests: normalizeList(interests),
    message: String(message).trim()
  };

  return next();
};

export const validateContactPayload = (req, res, next) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ success: false, message: "Valid full name is required." });
  }

  if (!email || !emailPattern.test(String(email).trim())) {
    return res.status(400).json({ success: false, message: "Valid email is required." });
  }

  if (!subject || String(subject).trim().length < 4) {
    return res.status(400).json({ success: false, message: "Subject should be at least 4 characters." });
  }

  if (!message || String(message).trim().length < 10) {
    return res.status(400).json({ success: false, message: "Message should be at least 10 characters." });
  }

  req.cleanedBody = {
    fullName: String(fullName).trim(),
    email: String(email).trim().toLowerCase(),
    subject: String(subject).trim(),
    message: String(message).trim()
  };

  return next();
};
