// Espera o tipo já processado
import type { StateProgressItem } from "../model/types/dashboard";

type StateProgressProps = {
  dados: StateProgressItem[] 
}

export function StateProgress({dados} : StateProgressProps) {
  const emailsProcessados = dados; 

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
      <h3 className="font-bold text-lg mb-4">E-mails por Estado</h3>

      <div className="space-y-4">
        {emailsProcessados.map((item) => (
            <ProgressBar 
                key={item.estado} 
                state={item.estado} 
                percent={item.percent} 
                color={item.colorClass}
            />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ state, percent, color }: { state: string; percent: number; color: string }) {
  return (
    <div className="flex items-center">
      <span className="w-8 font-bold text-gray-500">{state}</span>
      <div className="w-full bg-gray-200 rounded-full h-4 ml-2">
        <div className={`${color} h-4 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
      <span className="ml-2 text-sm">{percent}%</span>
    </div>
  );
}
