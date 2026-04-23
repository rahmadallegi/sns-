import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import * as adminApi from "@/lib/adminApi";
import { API_BASE_URL } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  category: string;
  detail?: string;
  image?: string;
}

const columns = [
  { key: "title" as const, label: "Project Name" },
  {
    key: "category" as const,
    label: "Category",
    render: (item: Project) => <Badge variant="secondary" className="rounded-pill">{item.category}</Badge>,
  },
  { key: "detail" as const, label: "Details" },
  {
    key: "image" as const,
    label: "Image",
    render: (item: Project) =>
      item.image ? (
        <img
          src={
            item.image.startsWith("http")
              ? item.image
              : `${API_BASE_URL}${item.image}`
          }
          alt={item.title}
          className="h-10 w-10 rounded-md object-cover border border-border"
        />
      ) : (
        "-"
      ),
  },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getProjects();
      setProjects(response.data);
    } catch (err: any) {
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const openNewDialog = () => {
    setEditingProject(null);
    setForm({});
    setDialogOpen(true);
  };

  const handleEdit = (item: Project) => {
    setEditingProject(item);
    setForm(item);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category) {
      toast.error("Title and category are required");
      return;
    }

    try {
      setIsSaving(true);
      if (editingProject) {
        await adminApi.updateProject(editingProject.id, {
          title: form.title,
          detail: form.detail,
          image: form.image,
          category: form.category,
        });
        toast.success("Project updated");
      } else {
        await adminApi.createProject({
          title: form.title,
          detail: form.detail,
          image: form.image,
          category: form.category,
        });
        toast.success("Project created");
      }
      setDialogOpen(false);
      await loadProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: Project) => {
    try {
      await adminApi.deleteProject(item.id);
      setProjects(projects.filter((p) => p.id !== item.id));
      toast.success("Project deleted");
    } catch (err: any) {
      toast.error("Failed to delete project");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage construction, waste management, and telecom projects</p>
        <Button size="sm" onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Category</Label>
              <Input
                value={form.category ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Detail</Label>
              <Textarea
                value={form.detail ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Image URL</Label>
              <Input
                value={form.image ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {editingProject ? "Save changes" : "Create project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
