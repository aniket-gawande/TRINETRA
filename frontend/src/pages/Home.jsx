import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  // Animation variants
  const roverAnimation = {
    initial: { x: -1000, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1.5, ease: "easeOut" },
  };

  const pulseAnimation = {
    animate: {
      boxShadow: ["0 0 20px rgba(34, 197, 94, 0.4)", "0 0 40px rgba(34, 197, 94, 0.8)", "0 0 20px rgba(34, 197, 94, 0.4)"],
    },
    transition: { duration: 2, repeat: Infinity },
  };

  const floatAnimation = {
    animate: { y: [0, -20, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.8 },
  };

  const slideInRight = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.8 },
  };

  const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 0.6 },
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", color: "#1f2937", minHeight: "100vh" }}>
      {/* ================= ANIMATED HERO SECTION ================= */}
      <section style={heroStyle}>
        {/* Animated Background Elements */}
        <motion.div style={{ position: "absolute", top: "5%", left: "5%", width: 100, height: 100, borderRadius: "50%", background: "rgba(34, 197, 94, 0.1)", filter: "blur(40px)" }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div style={{ position: "absolute", bottom: "10%", right: "5%", width: 150, height: 150, borderRadius: "50%", background: "rgba(34, 197, 94, 0.1)", filter: "blur(50px)" }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 5, repeat: Infinity }} />

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", zIndex: 2 }}
        >
          <motion.h1 style={{ ...heroTitle, marginBottom: 10 }} animate={{ textShadow: ["0 0 20px rgba(34, 197, 94, 0.4)", "0 0 40px rgba(34, 197, 94, 0.8)"] }} transition={{ duration: 2, repeat: Infinity }}>
            🌱 TRINETRA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ ...heroSubtitle, fontSize: "24px", color: "#16a34a", fontWeight: 600 }}
          >
            AI-Powered Mobile Climate Intelligence Platform
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontSize: "16px", color: "#4b5563", marginTop: 15, maxWidth: 500, margin: "15px auto 0" }}
          >
            Real-time environmental monitoring for a sustainable future
          </motion.p>
        </motion.div>

        {/* Animated Rover Coming In */}
        <motion.div style={{ marginTop: 60, textAlign: "center", zIndex: 2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <motion.div style={{ fontSize: "120px", display: "inline-block" }} {...roverAnimation}>
            🚗
          </motion.div>
          <motion.p
            style={{ fontSize: "18px", color: "#22c55e", marginTop: 15, fontWeight: 600 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Rover Deployment Active
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          style={{ marginTop: 40, display: "flex", gap: 20, justifyContent: "center", zIndex: 2, flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/planner" style={primaryBtn}>
              🗺️ Live Map
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/dashboard" style={secondaryBtn}>
              📊 Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" style={tertiaryBtn}>
              ℹ️ Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)" }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p style={{ fontSize: "30px", color: "#22c55e" }}>↓</p>
        </motion.div>
      </section>

      {/* ================= PROBLEM SECTION ================= */}
      <Section title="🌍 The Climate Challenge">
        <Grid>
          <motion.div {...slideInLeft} viewport={{ once: false }}>
            <InfoCard title="🌫️ Air Pollution">
              Stationary sensors fail to capture real-time street-level pollution variation.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInLeft} transition={{ delay: 0.1 }} viewport={{ once: false }}>
            <InfoCard title="🔥 Delayed Detection">
              Satellite systems detect fires and hazards too late for rapid response.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInLeft} transition={{ delay: 0.2 }} viewport={{ once: false }}>
            <InfoCard title="💧 Urban Flooding">
              No real-time water level monitoring in critical urban areas.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInLeft} transition={{ delay: 0.3 }} viewport={{ once: false }}>
            <InfoCard title="📍 Data Gaps">
              Cities lack hyperlocal climate intelligence for decision-making.
            </InfoCard>
          </motion.div>
        </Grid>
      </Section>

      {/* ================= SOLUTION SECTION ================= */}
      <motion.section style={{ padding: "80px 10%", background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", color: "white" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
        <motion.h2 style={{ fontSize: "42px", marginBottom: 30, textAlign: "center" }} {...slideInRight}>
          🚀 Our Green AI Solution
        </motion.h2>
        <motion.div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", maxWidth: 1200, margin: "0 auto" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
          <motion.div {...floatAnimation}>
            <p style={{ fontSize: "20px", lineHeight: 1.8, opacity: 0.95 }}>
              <strong>TRINETRA</strong> deploys an AI-enabled mobile rover equipped with advanced environmental sensors and computer vision to monitor air quality, fire risks, floods, and micro-climate conditions in real time.
              <br />
              <br />
              ✅ <strong>24/7 Street-Level Monitoring</strong>
              <br />
              ✅ <strong>Predictive AI Detection</strong>
              <br />
              ✅ <strong>Instant Alerts & Analytics</strong>
              <br />
              ✅ <strong>Climate-Positive Impact</strong>
            </p>
          </motion.div>
          <motion.div style={{ fontSize: "100px", textAlign: "center" }} animate={{ y: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            🌱
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <Section title="⚙️ How TRINETRA Works">
        <Grid>
          <motion.div {...scaleIn} viewport={{ once: false }}>
            <InfoCard icon="🚗" title="Mobile Rover Deployment">
              AI-enabled rover with 10+ sensors moves through city streets.
            </InfoCard>
          </motion.div>
          <motion.div {...scaleIn} transition={{ delay: 0.1 }} viewport={{ once: false }}>
            <InfoCard icon="🧠" title="Real-Time AI Analysis">
              ML models instantly detect fire, smoke, and environmental hazards.
            </InfoCard>
          </motion.div>
          <motion.div {...scaleIn} transition={{ delay: 0.2 }} viewport={{ once: false }}>
            <InfoCard icon="☁️" title="Cloud Processing">
              Data processed in real-time with edge computing capabilities.
            </InfoCard>
          </motion.div>
          <motion.div {...scaleIn} transition={{ delay: 0.3 }} viewport={{ once: false }}>
            <InfoCard icon="🖥️" title="Live Dashboard">
              Web platform visualizes alerts, heat maps, and real-time analytics.
            </InfoCard>
          </motion.div>
        </Grid>
      </Section>

      {/* ================= FEATURES SECTION ================= */}
      <motion.section
        style={{ padding: "80px 10%", background: "#fff" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        <h2 style={{ fontSize: "42px", color: "#16a34a", marginBottom: 50, textAlign: "center" }}>🌟 Key Features</h2>
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {[
            { emoji: "📊", title: "Real-Time Data", desc: "Live sensor streaming" },
            { emoji: "🤖", title: "AI Detection", desc: "Advanced machine learning" },
            { emoji: "🗺️", title: "Heat Maps", desc: "Geographic visualization" },
            { emoji: "🚨", title: "Smart Alerts", desc: "Instant notifications" },
            { emoji: "♻️", title: "Green Impact", desc: "Sustainability focused" },
            { emoji: "📈", title: "Analytics", desc: "Predictive insights" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              {...scaleIn}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05, y: -10 }}
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                padding: 30,
                borderRadius: 12,
                textAlign: "center",
                border: "2px solid #86efac",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: 15 }}>{feature.emoji}</div>
              <h3 style={{ color: "#16a34a", fontSize: "18px", marginBottom: 10 }}>{feature.title}</h3>
              <p style={{ color: "#64748b", fontSize: "14px" }}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ================= IMPACT SECTION ================= */}
      <Section title="🌍 Real-World Applications">
        <Grid>
          <motion.div {...slideInRight} viewport={{ once: false }}>
            <InfoCard icon="🏙️" title="Smart Cities">
              Real-time climate monitoring for urban planning.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInRight} transition={{ delay: 0.1 }} viewport={{ once: false }}>
            <InfoCard icon="🚨" title="Disaster Management">
              Early warning system for floods and fires.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInRight} transition={{ delay: 0.2 }} viewport={{ once: false }}>
            <InfoCard icon="🔬" title="Environmental Research">
              Comprehensive climate data collection.
            </InfoCard>
          </motion.div>
          <motion.div {...slideInRight} transition={{ delay: 0.3 }} viewport={{ once: false }}>
            <InfoCard icon="🏭" title="Industrial Safety">
              Air quality and hazard monitoring.
            </InfoCard>
          </motion.div>
        </Grid>
      </Section>

      {/* ================= STATS SECTION ================= */}
      <motion.section
        style={{
          padding: "80px 10%",
          background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
          color: "white",
          textAlign: "center",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        <h2 style={{ fontSize: "42px", marginBottom: 50 }}>📈 Our Impact</h2>
        <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 30 }}>
          {[
            { value: "24/7", label: "Live Monitoring" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "<100ms", label: "Alert Response" },
            { value: "10+", label: "Sensor Types" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              {...scaleIn}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: false }}
            >
              <motion.div
                style={{ fontSize: "40px", fontWeight: "bold", marginBottom: 10 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <p style={{ fontSize: "16px", opacity: 0.9 }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ================= FINAL CTA ================= */}
      <motion.section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
      >
        <motion.h2 style={{ fontSize: "42px", color: "#16a34a", marginBottom: 20 }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          🌱 Join the Green Revolution
        </motion.h2>
        <p style={{ fontSize: "18px", color: "#4b5563", maxWidth: 700, margin: "0 auto 40px", lineHeight: 1.8 }}>
          TRINETRA empowers communities, governments, and organizations to build climate-resilient futures through intelligent, real-time environmental data.
        </p>
        <motion.div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/planner" style={primaryBtn}>
              Get Started Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" style={secondaryBtn}>
              Learn Architecture
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <motion.section
      style={{ padding: "80px 10%", background: "white", borderTop: "2px solid #dcfce7" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      <motion.h2 style={sectionTitle} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: false }}>
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}

function Grid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        marginTop: 30,
      }}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <motion.div whileHover={{ scale: 1.08, y: -8 }} style={cardStyle}>
      {icon && <div style={{ fontSize: "40px", marginBottom: 15 }}>{icon}</div>}
      <h3 style={{ color: "#16a34a", fontSize: "18px", marginBottom: 12, fontWeight: 600 }}>{title}</h3>
      <p style={{ opacity: 0.7, color: "#4b5563", lineHeight: 1.6 }}>{children}</p>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 20px",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
};

const heroTitle = {
  fontSize: "72px",
  fontWeight: "bold",
  color: "#15803d",
  textShadow: "0 2px 10px rgba(34, 197, 94, 0.2)",
  marginBottom: 10,
};

const heroSubtitle = {
  fontSize: "20px",
  marginTop: 10,
  maxWidth: 600,
};

const sectionTitle = {
  fontSize: "42px",
  color: "#16a34a",
  fontWeight: 700,
  marginBottom: 10,
};

const paragraph = {
  maxWidth: 800,
  fontSize: "18px",
  lineHeight: 1.6,
};

const cardStyle = {
  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  border: "2px solid #86efac",
  padding: 25,
  borderRadius: 12,
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const primaryBtn = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "white",
  padding: "14px 32px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
  border: "none",
  cursor: "pointer",
  display: "inline-block",
  transition: "all 0.3s ease",
};

const secondaryBtn = {
  background: "white",
  color: "#16a34a",
  padding: "14px 32px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
  border: "2px solid #22c55e",
  cursor: "pointer",
  display: "inline-block",
  transition: "all 0.3s ease",
};

const tertiaryBtn = {
  background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
  color: "#15803d",
  padding: "14px 32px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
  border: "2px solid #86efac",
  cursor: "pointer",
  display: "inline-block",
  transition: "all 0.3s ease",
};

const ctaStyle = {
  padding: "100px 20px",
  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  textAlign: "center",
};
