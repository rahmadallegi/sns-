import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";
import * as adminApi from "@/lib/adminApi";

interface Contact {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  fax: string;
}

const ContactPage = () => {
  const [contact, setContact] = useState<Contact>({
    address: "",
    phone1: "",
    phone2: "",
    email: "",
    fax: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Fetch contact from DB
  useEffect(() => {
    const loadContact = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getContactInfo(); // you need to add this endpoint in adminApi
        setContact(res.data);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, []);

  const handleChange = (field: keyof Contact, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!contact.address || !contact.phone1 || !contact.email) {
      toast.error("Address, Phone 1, and Email are required");
      return;
    }

    try {
      setSaving(true);
      await adminApi.updateContactInfo(contact); // you need to add this endpoint in adminApi
      toast.success("Contact info saved successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to save contact info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-sm text-muted-foreground">
        Manage contact information displayed on the website
      </p>

      <div className="admin-card p-5 space-y-4">
        <h2 className="font-heading text-sm font-semibold text-foreground">
          Head Office
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <Label className="text-xs">Address</Label>
            <Input
              value={contact.address}
              onChange={e => handleChange("address", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Phone 1</Label>
            <Input
              value={contact.phone1}
              onChange={e => handleChange("phone1", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Phone 2</Label>
            <Input
              value={contact.phone2}
              onChange={e => handleChange("phone2", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Email</Label>
            <Input
              value={contact.email}
              onChange={e => handleChange("email", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Fax</Label>
            <Input
              value={contact.fax}
              onChange={e => handleChange("fax", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;