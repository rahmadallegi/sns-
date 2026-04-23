import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as adminApi from "@/lib/adminApi";

interface AboutCard {
  id: number;
  title: string;
  desc: string;
}

const AboutPage = () => {
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAboutCards();
  }, []);

  const loadAboutCards = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getAboutCards();
      setAboutCards(response.data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load about cards");
      toast.error("Failed to load about cards");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async () => {
    if (!newCardTitle || !newCardDesc) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSaving(true);
      await adminApi.createAboutCard({ title: newCardTitle, desc: newCardDesc });
      setNewCardTitle("");
      setNewCardDesc("");
      await loadAboutCards();
      toast.success("About card added successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to add about card");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateCard = async (id: number, title: string, desc: string) => {
    try {
      setIsSaving(true);
      await adminApi.updateAboutCard(id, { title, desc });
      await loadAboutCards();
      toast.success("About card updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update about card");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      setIsSaving(true);
      await adminApi.deleteAboutCard(id);
      await loadAboutCards();
      toast.success("About card deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete about card");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-sm text-muted-foreground">Edit company information shown on the About page</p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Existing About Cards */}
      <div className="admin-card p-5 space-y-4">
        <h2 className="font-heading text-sm font-semibold text-foreground">About Cards</h2>
        <div className="space-y-4">
          {aboutCards.map((card) => (
            <div key={card.id} className="border border-border rounded-lg p-4 space-y-3">
              <div>
                <Label className="text-xs">Title</Label>
                <Input
                  defaultValue={card.title}
                  className="mt-1"
                  onChange={(_e) => {
                    // Handle updates
                  }}
                />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  className="mt-1 min-h-[80px]"
                  defaultValue={card.desc}
                  onChange={(_e) => {
                    // Handle updates
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateCard(card.id, card.title, card.desc)}
                  disabled={isSaving}
                >
                  <Save className="mr-1 h-3 w-3" /> Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCard(card.id)}
                  disabled={isSaving}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New About Card */}
      <div className="admin-card p-5 space-y-4">
        <h2 className="font-heading text-sm font-semibold text-foreground">Add New About Card</h2>
        <div className="space-y-3">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              placeholder="Enter card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Description</Label>
            <Textarea
              placeholder="Enter card description"
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
              className="mt-1 min-h-[80px]"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddCard} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> Add Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
