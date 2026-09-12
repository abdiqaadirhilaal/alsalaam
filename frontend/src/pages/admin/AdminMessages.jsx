import { useEffect, useState } from "react";
import { Trash2, Search, Mail, MailOpen, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "../../components/admin/AdminUI";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { EmptyState } from "../../components/ui/Common";
import { fetchMessages, fetchMessage, markMessageStatus, deleteMessage, replyToMessage } from "../../services/contactService";

const statusStyles = {
  unread: "bg-red-100 text-red-600",
  read: "bg-navy-100 text-navy-500",
  replied: "bg-green-100 text-green-700",
};

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () =>
    fetchMessages({ search, status: statusFilter }).then((r) => setMessages(r.items)).finally(() => setLoading(false));

  useEffect(() => { load(); }, [search, statusFilter]);

  const openMessage = async (id) => {
    const { message, replies } = await fetchMessage(id);
    setSelected(message);
    setReplies(replies);
    if (message.status === "unread") {
      await markMessageStatus(id, "read");
      load();
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await replyToMessage(selected._id, replyText);
      toast.success("Reply sent");
      setReplyText("");
      const { message, replies } = await fetchMessage(selected._id);
      setSelected(message);
      setReplies(replies);
      load();
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage(confirmId);
      toast.success("Message deleted");
      setConfirmId(null);
      if (selected?._id === confirmId) setSelected(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <PageHeader title="Messages" subtitle="View and reply to contact form submissions." />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={16} />
          <input
            className="w-full border border-navy-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-navy-200 rounded-xl px-4 py-2.5 text-sm">
          <option value="">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
          {loading ? (
            <p className="p-6 text-navy-400 text-sm">Loading...</p>
          ) : messages.length === 0 ? (
            <div className="p-6"><EmptyState title="No messages" /></div>
          ) : (
            <div className="divide-y divide-navy-100 max-h-[600px] overflow-y-auto">
              {messages.map((m) => (
                <button
                  key={m._id}
                  onClick={() => openMessage(m._id)}
                  className={`w-full text-left p-4 hover:bg-navy-50 transition-colors ${selected?._id === m._id ? "bg-navy-50" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-navy-900 truncate">{m.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyles[m.status]}`}>{m.status}</span>
                  </div>
                  <p className="text-xs text-navy-500 truncate">{m.subject || m.message}</p>
                  <p className="text-[11px] text-navy-400 mt-1">{new Date(m.createdAt).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-navy-100 p-6">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-navy-400 text-sm py-16">
              Select a message to view details
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-display font-semibold text-lg text-navy-900">{selected.subject || "No subject"}</p>
                  <p className="text-sm text-navy-500">{selected.name} · {selected.email} {selected.phone && `· ${selected.phone}`}</p>
                </div>
                <button onClick={() => setConfirmId(selected._id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-navy-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {selected.message}
              </div>

              {replies.length > 0 && (
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-semibold text-navy-400 uppercase">Reply History</p>
                  {replies.map((r) => (
                    <div key={r._id} className="bg-navy-800 text-white rounded-xl p-4 text-sm">
                      <p className="whitespace-pre-line">{r.reply}</p>
                      <p className="text-[11px] text-white/50 mt-2">
                        {new Date(r.sentAt).toLocaleString()} · {r.status === "sent" ? "Sent" : "Failed to send"}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-navy-700 mb-2">Reply to {selected.email}</p>
                <textarea
                  rows={4}
                  className="w-full border border-navy-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 mb-3"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button onClick={handleReply} disabled={sending} className="btn-primary !py-2.5">
                  <Send size={16} /> {sending ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog open={!!confirmId} message="This message and its reply history will be permanently removed." onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
