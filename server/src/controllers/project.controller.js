import sanitize from "mongo-sanitize";
import Project from "../models/Project.js";

/**
 * GET /api/projects
 * Item 6: category query param validated in route; mongo-sanitize applied here.
 */
export async function listProjects(req, res, next) {
  try {
    const { category } = sanitize(req.query);
    const filter = category ? { category } : {};
    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    return res.json(projects);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/projects/:slug
 * Item 2: Fetch a single project by slug for case study pages.
 */
export async function getProjectBySlug(req, res, next) {
  try {
    const { slug } = sanitize(req.params);
    const project = await Project.findOne({ slug });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(project);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/projects
 * Item 6: validated via express-validator in route file.
 */
export async function createProject(req, res, next) {
  try {
    const project = await Project.create(sanitize(req.body));
    return res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/projects/:id
 */
export async function updateProject(req, res, next) {
  try {
    const { id } = sanitize(req.params);
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      sanitize(req.body),
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json(updatedProject);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/projects/:id
 */
export async function deleteProject(req, res, next) {
  try {
    const { id } = sanitize(req.params);
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found." });
    }
    return res.json({ message: "Project deleted successfully." });
  } catch (err) {
    next(err);
  }
}
