interface TicketWidgetProps {
  no: string;
  nama: string;
  poli: string;
}

export default function TicketWidget({ no, nama, poli }: TicketWidgetProps) {
  return (
    <div 
      className="p-6 rounded-3xl shadow-lg"
      style={{ background: 'linear-gradient(135deg, var(--green-deep), #0D7A4E)' }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-white/70 text-xs mb-1">{poli}</p>
          <h3 className="text-white text-lg font-bold">{nama}</h3>
        </div>
        <div className="text-right">
          <p className="text-[var(--green-soft)] text-4xl font-bold leading-none mb-1">{no}</p>
          <p className="text-white/50 text-[10px]">No. Antrian</p>
        </div>
      </div>
      
      <div className="h-[1px] w-full bg-white/20 mb-6" />
      
      <div className="flex justify-between items-center text-white text-xs">
        <p>Status: Menunggu Dipanggil</p>
        <div className="w-2 h-2 rounded-full bg-[var(--green-soft)]" />
      </div>
    </div>
  );
}
