import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.png";
import { API_BASE_URL } from "@/lib/api";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast({ title: "Message sent!", description: "We'll get back to you shortly." });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ title: "Error", description: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({ title: "Error", description: "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Split Hero: Contact Info + Form */}
      <section className="min-h-[80vh] grid lg:grid-cols-2">
        {/* Left - Image with contact info overlay */}
        <div
          className="relative flex items-center p-8 md:p-12 min-h-[400px]"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative z-10 text-background space-y-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5 shrink-0" style={{ color: "#fbfbfb" }} />
              <div>
                <p className="font-title text-lg">Address :</p>
                <p className="font-heading text-base opacity-80">
                  Bldg. No.13,<br />
                  Mohammad Bin Dakheel Street,<br />
                  Al Aqiq District, Riyadh, Saudi Arabia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="shrink-0 mt-0.5" style={{ color: "#fbfbfb" }} />
              <div>
                <p className="font-title text-lg">Phone :</p>
                <p className="font-heading text-base opacity-80">
                  +966 (0)11-482-7933<br />
                  +966 (0)11-294-3200
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="shrink-0 mt-0.5" style={{ color: "#fbfbfb" }} />
              <div>
                <p className="font-title text-lg">Fax :</p>
                <p className="font-heading text-base opacity-80">+966 (011-492-8079)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="shrink-0 mt-0.5" style={{ color: "#fbfbfb" }} />
              <div>
                <p className="font-title text-lg">Customer Care email :</p>
                <p className="font-heading text-base opacity-80">sns@snscl.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center p-8 md:p-12 bg-background">
          <div className="w-full max-w-xl mx-auto">
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="font-body text-5xl md:text-5xl  text-foreground">
                Send Us A Message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input name="name" placeholder="Name" required className="border-border" />
              <Input name="email" type="email" placeholder="Email" required className="border-border" />
              <Input name="phone" placeholder="Phone" className="border-border" />
              <Input name="subject" placeholder="Subject" required className="border-border" />
              <Textarea name="message" placeholder="Message" rows={5} required className="border-border" />
              <Button type="submit" variant="secondary" disabled={loading} className="font-semibold">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
