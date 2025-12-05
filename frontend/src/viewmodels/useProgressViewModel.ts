import { useMemo } from 'react';
import type { EmailsByState, StateProgressItem } from "../model/types/dashboard";

export function useProgressViewModel(estadosBrutos: EmailsByState[]) {

    const estadosProcessados = useMemo(() => {
        const totalEmails = estadosBrutos.reduce((sum, item) => sum + item.count, 0);
        const colors = ['bg-indigo-600', 'bg-blue-500', 'bg-sky-400', 'bg-teal-400', 'bg-green-500', 'bg-lime-600'];

        return estadosBrutos.map((item, index) => {
            const percent = totalEmails > 0 ? Math.round((item.count / totalEmails) * 100) : 0;
            return {
                ...item,
                percent,
                colorClass: colors[index % colors.length],
            } as StateProgressItem; 
        });
    }, [estadosBrutos]); 

    return {
        estadosProcessados,
        totalGeral: estadosBrutos.reduce((sum, item) => sum + item.count, 0)
    };
}
