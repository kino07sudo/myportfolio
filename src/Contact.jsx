import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import contact from "./assets/contact.png";

// ✅ Vite env variables (from .env)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = ({ darkMode }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: "", msg: "" });

  // ✅ Phone state (controlled input)
  const [phone, setPhone] = useState("");

  // ✅ Only allow international phone input while typing
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // allow digits, spaces, and leading +
    value = value.replace(/[^\d+\s]/g, "");

    // only one + and only at the start
    value = value.replace(/(?!^)\+/g, "");

    // enforce max 15 digits (E.164)
    const digits = value.replace(/\D/g, "");
    if (digits.length > 15) return;

    setPhone(value);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // ✅ Honeypot check (spam bots)
    const data = new FormData(formRef.current);
    if (data.get("website")) return;

    // ✅ Rate limit (1 message per minute)
    const now = Date.now();
    const lastSend = Number(localStorage.getItem("lastContactSend") || 0);
    if (now - lastSend < 60_000) {
      setStatus({
        type: "error",
        msg: "Please wait a minute before sending another message.",
      });
      return;
    }

    // ✅ Normalize phone before HTML validation / sending (remove spaces)
    const phoneInput = formRef.current.elements.namedItem("phone");
    if (phoneInput) {
      phoneInput.value = phone.replace(/\s+/g, "");
    }

    // ✅ HTML5 validation
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    // ✅ Env safety check
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        type: "error",
        msg: "Email service is not configured.",
      });
      return;
    }

    setStatus({ type: "loading", msg: "Sending..." });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

      localStorage.setItem("lastContactSend", String(now));
      setStatus({ type: "success", msg: "Message sent successfully!" });

      formRef.current.reset();
      setPhone(""); // ✅ clear controlled phone field too
    } catch (err) {
      setStatus({ type: "error", msg: "Failed to send. Please try again." });
    }
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            Get In{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Touch
            </span>
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            Let's discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-start" data-aos="fade-up">
            <img
              src={contact}
              alt="Contact"
              className="w-full max-w-sm lg:max-w-md object-contain"
            />
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            data-aos="fade-left"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom right, #1f2937, #111827)"
                : "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
            }}
            className="rounded-2xl p-6 md:p-8 border shadow-lg"
          >
            {/* Honeypot (hidden) */}
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                minLength={2}
                className="input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                minLength={2}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="input"
              />

              {/* ✅ Updated Phone Input (International / E.164) */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (e.g. +14155552671)"
                required
                value={phone}
                onChange={handlePhoneChange}
                inputMode="tel"
                pattern="^\+?[1-9]\d{9,14}$"
                title="Enter a valid international phone number (example: +14155552671)"
                className="input"
              />
            </div>

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              minLength={20}
              className="input mt-4 resize-none"
            />

            <button
              type="submit"
              disabled={status.type === "loading"}
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                opacity: status.type === "loading" ? 0.85 : 1,
              }}
              className="w-full mt-6 py-3 text-white font-semibold rounded-lg
                hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02]
                transition-all disabled:cursor-not-allowed"
            >
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status.msg && (
              <p
                className="mt-3 text-sm"
                style={{
                  color:
                    status.type === "success"
                      ? "#22c55e"
                      : status.type === "error"
                      ? "#ef4444"
                      : darkMode
                      ? "#d1d5db"
                      : "#6b7280",
                }}
              >
                {status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
