import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import * as adminApi from "@/lib/adminApi";
import { API_BASE_URL } from "@/lib/api";

interface Client {
  id: number;
  name: string;
  logo?: string;
}

const columns = [
  {
    key: "name" as const,
    label: "Client Name",
    render: (item: Client) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-heading font-bold">
          {item.name.charAt(0)}
        </div>
        <span className="font-medium">{item.name}</span>
      </div>
    ),
  },
];

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form, setForm] = useState<Partial<Client>>({});
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getClients();
      setClients(response.data);
    } catch (err: any) {
      toast.error("Failed to load clients");
    } finally {
      setIsLoading(false);
    }
  };

  const openNewDialog = () => {
    setEditingClient(null);
    setForm({});
    setDialogOpen(true);
  };

  const handleEdit = (item: Client) => {
    setEditingClient(item);
    setForm(item);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name) {
      toast.error("Client name is required");
      return;
    }

    try {
      setIsSaving(true);
      if (editingClient) {
        await adminApi.updateClient(editingClient.id, {
          name: form.name,
          logo: form.logo,
        });
        toast.success("Client updated");
      } else {
        await adminApi.createClient({
          name: form.name,
          logo: form.logo,
        });
        toast.success("Client created");
      }
      setDialogOpen(false);
      await loadClients();
    } catch (err: any) {
      toast.error(err.message || "Failed to save client");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: Client) => {
    try {
      await adminApi.deleteClient(item.id);
      setClients(clients.filter((c) => c.id !== item.id));
      toast.success("Client deleted");
    } catch (err: any) {
      toast.error("Failed to delete client");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage client listings displayed on the website</p>
        <Button size="sm" onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Name</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Logo</Label>
              <div className="space-y-2">
                {form.logo && (
                  <img
                    src={form.logo.startsWith("http") ? form.logo : `${API_BASE_URL}${form.logo}`}
                    alt={form.name || "Client logo"}
                    className="h-12 w-12 rounded-md object-contain border border-border"
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  disabled={uploadingLogo}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setUploadingLogo(true);
                      const fd = new FormData();
                      fd.append("logo", file);
                      const res = await adminApi.uploadClientLogo(fd);
                      setForm((f) => ({ ...f, logo: res.url }));
                    } catch (err: any) {
                      toast.error(err.message || "Failed to upload logo");
                    } finally {
                      setUploadingLogo(false);
                    }
                  }}
                />
                <p className="text-[11px] text-muted-foreground">
                  Upload an image file; it will be stored on the server and linked to this client.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {editingClient ? "Save changes" : "Create client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsPage;
