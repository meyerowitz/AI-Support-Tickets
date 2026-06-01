import { BrainCircuit, Target, Settings, Bell, Database, CheckCircle2,BarChart3 } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    { title: "Real-Time Priority", icon: <BarChart3 size={20} />, description: "AI classifies by sentiment/criteria." },
    { title: "Smart Agent Routing", icon: <Target size={20} />, description: "Actionable routes and history." },
    { title: "Workflow Tracking", icon: <Settings size={20} />, description: "Live data sync automatically." },
    { title: "SLA Alerts", icon: <Bell size={20} />, description: "Smart triggers for risk escalations." },
    { title: "Integrated Models", icon: <BrainCircuit size={20} />, description: "Custom AI models embedded." },
    { title: "Ticket Closure", icon: <CheckCircle2 size={20} />, description: "One-click templates approved." }
  ];

  return (
    <section className="bg-gray-50 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#050b24]">{feature.title}</h3>
              <p className="mt-2 text-xs text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}