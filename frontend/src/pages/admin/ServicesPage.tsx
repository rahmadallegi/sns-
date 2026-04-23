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

interface Service {
  id: number;
  label: string;
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  display_order?: number;
}

const columns = [
  { key: "title" as const, label: "Service Name" },
  {
    key: "label" as const,
    label: "Category",
    render: (item: Service) => (
      <Badge variant="secondary" className="font-medium rounded-pill">{item.label}</Badge>
    ),
  },
  { key: "description" as const, label: "Description" },
  {
    key: "image" as const,
    label: "Image",
    render: (item: Service) =>
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

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getServices();
      setServices(response.data);
    } catch (err: any) {
      toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  const openNewDialog = () => {
    setEditingService(null);
    setForm({});
    setDialogOpen(true);
  };

  const handleEdit = (item: Service) => {
    setEditingService(item);
    setForm(item);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.label || !form.title || !form.description) {
      toast.error("Label, title and description are required");
      return;
    }

    try {
      setIsSaving(true);
      if (editingService) {
        await adminApi.updateService(editingService.id, {
          label: form.label,
          title: form.title,
          description: form.description,
          long_description: form.long_description,
          image: form.image,
          display_order: form.display_order,
        });
        toast.success("Service updated");
      } else {
        await adminApi.createService({
          label: form.label,
          title: form.title,
          description: form.description,
          long_description: form.long_description,
          image: form.image,
          display_order: form.display_order,
        });
        toast.success("Service created");
      }
      setDialogOpen(false);
      await loadServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to save service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: Service) => {
    try {
      await adminApi.deleteService(item.id);
      setServices(services.filter((s) => s.id !== item.id));
      toast.success("Service deleted");
    } catch (err: any) {
      toast.error("Failed to delete service");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage your website service listings</p>
        <Button size="sm" onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Label (category)</Label>
              <Input
                value={form.label ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Short Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Long Description</Label>
              <Textarea
                value={form.long_description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Image URL</Label>
              <Input
                value={form.image ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Display Order</Label>
              <Input
                type="number"
                value={form.display_order ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, display_order: e.target.value ? Number(e.target.value) : undefined }))
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {editingService ? "Save changes" : "Create service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
