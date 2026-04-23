import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { apiGet } from "@/lib/api";

interface Contact {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  fax: string;
}

const Footer = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await apiGet<{ message: string; data: Contact }>("/api/contact");
        setContact(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <footer className="footer-section">
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading contact info...</p>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="footer-section">
        <div className="container mx-auto px-4 py-16 text-center text-red-600">
          <p>{error}</p>
        </div>
      </footer>
    );
  }

  if (!contact) return null;

  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-body text-4xl mb-2">CONTACT US</h2>
          <p className="text-xl opacity-70">Head Office</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
            {/* Logo */}
            <img src={logo} alt="SNS" className="h-40 w-56 mx-auto object-contain" />

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-8 flex-1">
              <div className="space-y-4">
                <div>
                  <p className="font-title text-lg mb-1">Address :</p>
                  <p className="font-heading text-base opacity-70">
                    {contact.address.split("\n").map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <p className="font-title text-lg mb-1">Customer Care email :</p>
                  <p className="font-heading text-base opacity-70">{contact.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-title text-lg mb-1">Phone :</p>
                  <p className="font-heading text-base opacity-70">
                    {contact.phone1}
                    <br />
                    {contact.phone2}
                  </p>
                </div>
                <div>
                  <p className="font-title text-lg mb-1">Fax :</p>
                  <p className="font-heading text-base opacity-70">{contact.fax}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;