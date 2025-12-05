import type { TopDestination } from "../model/types/dashboard";

type TopDestinationsProps = {
  lista: TopDestination[];
};

export function TopDestinations({ lista }: TopDestinationsProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-bold text-lg mb-4">Top 3 Destinatários</h3>

      <ul className="space-y-4">
        {lista.map((email, index) => (
          <TopItem
            key={email.destinatario}
            pos={index + 1}
            name={email.destinatario}
            count={email.count}
          />
        ))}

        {lista.length == 0 && (
          <li className="text-gray-500 text-sm">
            Nenhum destinatário principal encontrado.
          </li>
        )}
      </ul>
    </div>
  );
}

function TopItem({
  pos,
  name,
  count,
}: {
  pos: number;
  name: string;
  count: number;
}) {
  return (
    <li className="flex justify-between items-center border-b pb-2 last:border-none">
      <div className="flex items-center">
        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 font-bold mr-3">
          {pos}
        </div>
        <span>{name}</span>
      </div>
      <span className="font-bold text-gray-600">{count}</span>
    </li>
  );
}
