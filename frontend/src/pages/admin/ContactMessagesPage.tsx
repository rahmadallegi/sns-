import { Mail, Eye, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  type ContactMessage,
} from "@/lib/adminApi";
import { useToast } from "@/hooks/use-toast";

const statusConfig = {
  unread: { label: "Unread", className: "bg-primary/10 text-primary border-primary/20" },
  read: { label: "Read", className: "bg-muted text-muted-foreground border-border" },
  replied: { label: "Replied", className: "bg-success/10 text-success border-success/20" },
};

const ContactMessagesPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContactMessages();
        if (res.data) setMessages(res.data);
      } catch (e) {
        toast({ title: "Error", description: "Failed to load messages.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const handleMarkAsRead = async (msg: ContactMessage) => {
    if (msg.status === "read") return;
    try {
      await updateContactMessageStatus(msg.id, "read");
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, status: "read" as const } : m)));
      if (selectedMessage?.id === msg.id) setSelectedMessage((m) => (m ? { ...m, status: "read" } : null));
    } catch {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    }
  };

  const handleDelete = async (e: React.MouseEvent, msg: ContactMessage) => {
    e.stopPropagation();
    try {
      await deleteContactMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      if (selectedMessage?.id === msg.id) setSelectedMessage(null);
      toast({ title: "Message deleted" });
    } catch {
      toast({ title: "Error", description: "Failed to delete message.", variant: "destructive" });
    }
  };

  const filtered = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Manage contact form submissions
          </p>
          {unreadCount > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-pill">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-60"
            />
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-pill p-0.5">
            {(["all", "unread", "read", "replied"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-medium px-3 py-1.5 rounded-pill transition-all duration-150 capitalize ${
                  filter === f
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="admin-card overflow-hidden divide-y divide-border">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`px-5 py-4 flex items-start gap-4 admin-table-row-hover cursor-pointer transition-all duration-150 ${
              msg.status === "unread" ? "bg-primary/[0.02]" : ""
            }`}
            onClick={() => setSelectedMessage(msg)}
          >
            <div
              className={`mt-1 h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-xs font-heading font-bold ${
                msg.status === "unread"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-medium text-foreground ${msg.status === "unread" ? "font-semibold" : ""}`}>
                  {msg.name}
                </span>
                <Badge variant="outline" className={`text-[10px] px-2 py-0 rounded-pill ${statusConfig[msg.status].className}`}>
                  {statusConfig[msg.status].label}
                </Badge>
              </div>
              <p className={`text-sm ${msg.status === "unread" ? "text-foreground font-medium" : "text-foreground"}`}>
                {msg.subject}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.message}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">{new Date(msg.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
              <div className="flex items-center gap-1 mt-2 justify-end">
                <button
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  onClick={(e) => { e.stopPropagation(); setSelectedMessage(msg); }}
                >
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button
                  className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                  onClick={(e) => handleDelete(e, msg)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">No messages found.</div>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-base">{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">From</p>
                  <p className="font-medium text-foreground">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedMessage.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="font-medium text-primary">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                  <p className="font-medium text-foreground">{selectedMessage.phone}</p>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-1.5">Message</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}>
                    <Mail className="mr-2 h-4 w-4" /> Reply via Email
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedMessage && handleMarkAsRead(selectedMessage)}
                  disabled={selectedMessage?.status === "read"}
                >
                  Mark as Read
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessagesPage;
