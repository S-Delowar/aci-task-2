export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Section */}
        <div className="bg-blue-800 text-white p-10 md:w-1/2 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-4 tracking-wide">
            CHIMERA Mission Console
          </h1>

          <p className="text-blue-100 mb-8 text-sm leading-relaxed">
            The CHIMERA system is an advanced multimodal AI designed to support deep-space 
            missions. It provides real-time diagnostics, visual analysis, contextual reasoning, 
            and adaptive guidance to astronauts operating far beyond Earth.
          </p>

          <div className="space-y-6">
            <Feature
              icon="🚀"
              title="Mission-Grade Intelligence"
              desc="Built to operate autonomously in critical environments with high-stakes decision making."
            />

            <Feature
              icon="🖼️"
              title="Multimodal Perception"
              desc="Understands both text and visual inputs to analyze spacecraft systems and anomalies."
            />

            <Feature
              icon="🧠"
              title="Persistent Memory Engine"
              desc="Maintains full conversation history to ensure seamless guidance without repetition."
            />

            <Feature
              icon="⚡"
              title="Real-Time Diagnostics"
              desc="Provides fast, accurate interpretations of system failures and on-board scenarios."
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          {children}
        </div>

      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </div>
  );
}
