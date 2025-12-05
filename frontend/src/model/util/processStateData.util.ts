import type { EmailsByState, StateProgressItem } from "../types/dashboard";

/**
 * Processa dados brutos de estados em itens prontos para exibição na UI.
 */
export function processStateData(data: EmailsByState[]): StateProgressItem[] {
  const totalEmails = data.reduce((sum, item) => sum + item.count, 0);
  const colors = [
    'bg-indigo-600',
    'bg-blue-500',
    'bg-sky-400',
    'bg-cyan-300',
    'bg-teal-400',
    'bg-green-500'
  ];

  return data.map((item, index) => {
    const percent = totalEmails > 0 ? Math.round((item.count / totalEmails) * 100) : 0;
    return {
      ...item,
      percent,
      colorClass: colors[index % colors.length],
    };
  });
}
