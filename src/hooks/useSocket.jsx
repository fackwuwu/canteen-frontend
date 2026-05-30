import { useEffect } from "react";
import socket from "../utils/socket";
import toast from 'react-hot-toast';


const useSocket = (userId) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
      socket.emit("join", userId); // join user room
    });

    socket.on("order-status-updated", (data) => {
      console.log("📦 Order Status Updated:", data);
      const statusColors = {
        pending: "⏳",
        preparing: "👨‍🍳",
        ready: "✅",
        completed: "🎉",
        cancelled: "❌"
      };

      const emoji = statusColors[data.status] || "🔔";

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full glass shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-white/10 overflow-hidden`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5 text-3xl">
                {emoji}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-black text-text uppercase tracking-widest">
                  Order Update
                </p>
                <p className="mt-1 text-base font-medium text-text-muted">
                  Your order <span className="text-primary font-bold">#{data.tokenNumber}</span> is now <span className="text-secondary font-black capitalize">{data.status}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-white/5">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-primary hover:text-primary/80 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-right',
      });
    });

    return () => {
      socket.off("order-status-updated");
      socket.disconnect();
    };
  }, [userId]);
};

export default useSocket;
