export default function About() {
  const styles = {
    container: {
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      minHeight: "100vh",
      padding: "60px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    hero: {
      textAlign: "center",
      marginBottom: "80px",
      animation: "fadeIn 0.8s ease-in",
    },
    heroTitle: {
      fontSize: "3.5em",
      color: "#15803d",
      marginBottom: "15px",
      fontWeight: "700",
      textShadow: "2px 2px 4px rgba(0,0,0,0.05)",
    },
    heroSubtitle: {
      fontSize: "1.3em",
      color: "#4b5563",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.8",
      fontWeight: "500",
    },
    section: {
      marginBottom: "60px",
    },
    sectionTitle: {
      fontSize: "2.2em",
      color: "#16a34a",
      marginBottom: "30px",
      paddingBottom: "15px",
      borderBottom: "3px solid #86efac",
      fontWeight: "700",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
      marginBottom: "40px",
    },
    featureCard: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.1)",
      border: "2px solid #dcfce7",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    featureCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 25px rgba(34, 197, 94, 0.2)",
    },
    featureIcon: {
      fontSize: "2.5em",
      marginBottom: "15px",
    },
    featureTitle: {
      fontSize: "1.3em",
      color: "#15803d",
      marginBottom: "12px",
      fontWeight: "700",
    },
    featureText: {
      color: "#64748b",
      lineHeight: "1.6",
    },
    dataFlowBox: {
      background: "white",
      padding: "40px",
      borderRadius: "12px",
      border: "2px solid #22c55e",
      marginBottom: "40px",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.1)",
    },
    dataFlow: {
      background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
      color: "#dcfce7",
      padding: "30px",
      borderRadius: "8px",
      fontFamily: "monospace",
      fontSize: "1em",
      lineHeight: "1.8",
      overflowX: "auto",
      textAlign: "center",
    },
    uniqueList: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      border: "2px solid #dcfce7",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.1)",
    },
    listItem: {
      padding: "12px 0",
      borderBottom: "1px solid #dcfce7",
      display: "flex",
      alignItems: "center",
      color: "#334155",
      fontSize: "1.05em",
    },
    listItemIcon: {
      color: "#22c55e",
      fontSize: "1.3em",
      marginRight: "15px",
      fontWeight: "bold",
    },
    useCaseGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },
    useCaseCard: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      textAlign: "center",
      border: "2px solid #dcfce7",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.08)",
      transition: "all 0.3s ease",
    },
    useCaseTitle: {
      fontSize: "1.2em",
      color: "#16a34a",
      fontWeight: "700",
      marginTop: "10px",
    },
    futureList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
    },
    futureBadge: {
      background: "linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)",
      color: "#15803d",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
      fontWeight: "600",
      border: "2px solid #22c55e",
    },
    statsSection: {
      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      color: "white",
      padding: "50px 30px",
      borderRadius: "12px",
      marginBottom: "60px",
      boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "30px",
      textAlign: "center",
    },
    statNumber: {
      fontSize: "2.5em",
      fontWeight: "700",
      marginBottom: "10px",
    },
    statLabel: {
      fontSize: "1em",
      opacity: "0.95",
    },
  };

  const features = [
    {
      icon: "🚗",
      title: "Mobile IoT Rover",
      desc: "Street-level environmental monitoring with advanced sensors",
    },
    {
      icon: "📡",
      title: "Real-time Connectivity",
      desc: "Wireless data transmission for instant climate insights",
    },
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      desc: "Machine learning detects disasters before they happen",
    },
    {
      icon: "🗺️",
      title: "Smart Mapping",
      desc: "Visualize climate data geographically in real-time",
    },
    {
      icon: "⚡",
      title: "Instant Alerts",
      desc: "Get notified immediately of critical climate events",
    },
    {
      icon: "♻️",
      title: "Eco-Friendly Impact",
      desc: "Protect the planet through data-driven sustainability",
    },
  ];

  const useCases = [
    { icon: "🚨", title: "Disaster Management" },
    { icon: "🏙️", title: "Smart Cities" },
    { icon: "🔬", title: "Environmental Research" },
    { icon: "🏭", title: "Industrial Safety" },
  ];

  const future = [
    "🛸 Drone-Based Monitoring",
    "🏙️ City-Wide Rover Fleet",
    "📈 Predictive Climate AI",
    "🌾 Agricultural Advisory",
    "🏛️ Government Dashboards",
    "🌍 Global Climate Network",
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>🌱 TRINETRA</h1>
          <p style={styles.heroSubtitle}>
            AI-Powered Climate Intelligence Platform for a Sustainable Future
          </p>
          <p style={{ fontSize: "1.1em", color: "#22c55e", marginTop: "15px", fontWeight: "600" }}>
            Real-time Environmental Monitoring • Street-Level Precision • Disaster Prevention
          </p>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          <div style={styles.statGrid}>
            <div>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Live Monitoring</div>
            </div>
            <div>
              <div style={styles.statNumber}>AI</div>
              <div style={styles.statLabel}>Predictive Detection</div>
            </div>
            <div>
              <div style={styles.statNumber}>100%</div>
              <div style={styles.statLabel}>Green Energy Ready</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✨ Core Features</h2>
          <div style={styles.featureGrid}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(34, 197, 94, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.1)";
                }}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureText}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Flow Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔄 System Architecture</h2>
          <div style={styles.dataFlowBox}>
            <div style={styles.dataFlow}>
              📊 Sensors → 📡 ESP32 Rover<br />
              ↓<br />
              🌐 Live Data Stream<br />
              ↓<br />
              💻 Backend Processing<br />
              ↓<br />
              🤖 AI Analysis & Storage<br />
              ↓<br />
              📱 Dashboard Visualization
            </div>
          </div>
        </div>

        {/* Why Unique Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🎯 Why Trinetra is Unique</h2>
          <div style={styles.uniqueList}>
            {[
              "Mobile & street-level monitoring (not just static stations)",
              "Real-time disaster alerts and predictive analysis",
              "Advanced AI detection for fire, smoke, and flood risks",
              "Affordable, scalable, and sustainable solution",
              "Smart-city ready architecture",
              "Data-driven climate action for a greener planet",
            ].map((item, idx) => (
              <div key={idx} style={styles.listItem}>
                <span style={styles.listItemIcon}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🌍 Real-World Applications</h2>
          <div style={styles.useCaseGrid}>
            {useCases.map((useCase, idx) => (
              <div key={idx} style={styles.useCaseCard}>
                <div style={{ fontSize: "2.5em" }}>{useCase.icon}</div>
                <div style={styles.useCaseTitle}>{useCase.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Scope Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🚀 Future Roadmap</h2>
          <div style={styles.futureList}>
            {future.map((item, idx) => (
              <div key={idx} style={styles.futureBadge}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: "white",
            padding: "50px 30px",
            borderRadius: "12px",
            textAlign: "center",
            border: "2px solid #22c55e",
            marginTop: "60px",
          }}
        >
          <h2 style={{ fontSize: "2em", color: "#15803d", marginBottom: "15px" }}>
            🌱 Join the Green AI Climate Revolution
          </h2>
          <p style={{ fontSize: "1.1em", color: "#64748b", maxWidth: "600px", margin: "0 auto", lineHeight: "1.8" }}>
            Together, we can build a sustainable future through intelligent environmental monitoring and data-driven climate action.
          </p>
        </div>
      </div>
    </div>
  );
}
