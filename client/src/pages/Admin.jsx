import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    category: "AI",
    description: "",
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Test auth by fetching messages
    try {
      const res = await fetch(`${API_URL}/contact`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) {
        throw new Error("Invalid password or server error");
      }
      const data = await res.json();
      setMessages(data);
      setIsAuthenticated(true);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/contact`, {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`); // GET is public
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects([data, ...projects]);
        setNewProject({ title: "", slug: "", category: "AI", description: "" });
      } else {
        alert("Failed to create project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-6 font-sans">
        <form onSubmit={handleAuth} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-sm w-full">
          <h1 className="font-mono text-xl text-slate-900 mb-6">Admin Login</h1>
          {error && <p className="text-rust-600 text-sm mb-4">{error}</p>}
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-2 mb-4 focus:outline-none focus:border-rust-600 focus:ring-1 focus:ring-rust-600"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink-950 text-white rounded py-2 hover:bg-ink-900 transition-colors"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-slate-900">
      <style>{`
        @media (prefers-color-scheme: dark) {
          .admin-select option {
            background-color: #1E293B;
            color: #F1F5F9;
          }
          /* Ensure inputs don't have invisible text if browser auto-fills white background */
          input, textarea, select {
            background-color: #1E293B !important;
            color: #F1F5F9 !important;
          }
        }
      `}</style>
      {/* Header */}
      <header className="bg-ink-950 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-mono text-lg">FLOWSTATE Admin</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-slate-400 hover:text-white">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-6 flex gap-6">
        <button
          className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "messages" ? "border-rust-600 text-rust-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
          onClick={() => { setActiveTab("messages"); fetchMessages(); }}
        >
          Messages
        </button>
        <button
          className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "projects" ? "border-rust-600 text-rust-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
          onClick={() => { setActiveTab("projects"); fetchProjects(); }}
        >
          Projects
        </button>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6 mt-6">
        {activeTab === "messages" && (
          <div>
            <h2 className="text-xl font-medium mb-6">Contact Submissions</h2>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-mono text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Sender</th>
                    <th className="px-6 py-3 font-medium">Project Type</th>
                    <th className="px-6 py-3 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No messages found.</td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m._id} className="hover:bg-slate-50 align-top">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{m.name}</p>
                          <a href={`mailto:${m.email}`} className="text-rust-600 hover:underline">{m.email}</a>
                        </td>
                        <td className="px-6 py-4">
                          <p>{m.projectType || "N/A"}</p>
                          {m.budget && <p className="text-xs text-slate-500 mt-1">Budget: {m.budget}</p>}
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-slate-600 whitespace-pre-wrap">{m.message}</p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Project List */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-medium mb-6">Portfolio Projects</h2>
              <div className="flex flex-col gap-4">
                {projects.map((p) => (
                  <div key={p._id} className="bg-white border border-slate-200 rounded-lg p-5 flex justify-between items-start shadow-sm">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium">{p.title}</h3>
                        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{p.category}</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">Slug: /{p.slug}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{p.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(p._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors shrink-0 ml-4"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Project Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-medium mb-4">Add Project</h2>
              <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-rust-600 focus:ring-1 focus:ring-rust-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Slug</label>
                  <input
                    type="text"
                    required
                    value={newProject.slug}
                    onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-rust-600 focus:ring-1 focus:ring-rust-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="admin-select w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-rust-600 focus:ring-1 focus:ring-rust-600"
                  >
                    <option value="AI">AI</option>
                    <option value="ML">ML</option>
                    <option value="DL">DL</option>
                    <option value="WEB">WEB</option>
                    <option value="APP">APP</option>
                    <option value="RPA">RPA</option>
                    <option value="WEB3">WEB3</option>
                    <option value="OPS">OPS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-rust-600 focus:ring-1 focus:ring-rust-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-rust-600 text-white rounded py-2 text-sm font-medium hover:bg-rust-700 transition-colors mt-2"
                >
                  Add Project
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
