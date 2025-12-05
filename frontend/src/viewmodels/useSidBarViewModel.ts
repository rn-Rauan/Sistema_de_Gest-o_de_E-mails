import { useEffect, useState } from "react";
import { emailService } from "../model/services/email.service";

export function useSidebarViewModel() {
  const [pendingCount, setPendingCount] = useState(0);

  async function loadPendingCount() {
    try {
      const pendentes = await emailService.getEmailPending();
      setPendingCount(pendentes.length);
    } catch {
      setPendingCount(0);
    }
  }

  useEffect(() => {
    loadPendingCount();
  }, []);

  return { pendingCount };
}
