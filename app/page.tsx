"use client";
import { useState, useEffect, useMemo } from 'react';
import { Train, Clock, MapPin, AlertTriangle, ShieldCheck, Share2, Activity, Map as MapIcon, Crosshair, Route, ArrowRight, Search, Moon, XCircle, ChevronDown } from 'lucide-react';

// @ts-ignore
import jadwalData from '../data/jadwal_krl_full.json';

// --- TOPOLOGI 6 JALUR KRL JABODETABEK FULL ---
const TOPOLOGI = {
  BOGOR: [ { id: 'JAKK', nama: 'Jakarta Kota', y: 0 }, { id: 'JAY', nama: 'Jayakarta', y: 4 }, { id: 'MGB', nama: 'Mangga Besar', y: 8 }, { id: 'SW', nama: 'Sawah Besar', y: 12 }, { id: 'JUA', nama: 'Juanda', y: 16 }, { id: 'GMR', nama: 'Gambir (Ls)', y: 20 }, { id: 'GDD', nama: 'Gondangdia', y: 24 }, { id: 'CKI', nama: 'Cikini', y: 28 }, { id: 'MRI', nama: 'Manggarai', y: 32 }, { id: 'TEB', nama: 'Tebet', y: 36 }, { id: 'CW', nama: 'Cawang', y: 40 }, { id: 'DRN', nama: 'Duren Kalibata', y: 44 }, { id: 'PSMB', nama: 'Ps. Minggu Baru', y: 48 }, { id: 'PSM', nama: 'Pasar Minggu', y: 52 }, { id: 'TNT', nama: 'Tanjung Barat', y: 56 }, { id: 'LNA', nama: 'Lenteng Agung', y: 60 }, { id: 'UP', nama: 'Univ. Pancasila', y: 64 }, { id: 'UI', nama: 'Univ. Indonesia', y: 68 }, { id: 'POC', nama: 'Pondok Cina', y: 72 }, { id: 'DPB', nama: 'Depok Baru', y: 76 }, { id: 'DP', nama: 'Depok', y: 80 }, { id: 'CTA', nama: 'Citayam', y: 85 }, { id: 'BJD', nama: 'Bojong Gede', y: 90 }, { id: 'CLT', nama: 'Cilebut', y: 95 }, { id: 'BOO', nama: 'Bogor', y: 100 } ],
  NAMBO: [ { id: 'JAKK', nama: 'Jakarta Kota', y: 0 }, { id: 'JAY', nama: 'Jayakarta', y: 4 }, { id: 'MGB', nama: 'Mangga Besar', y: 8 }, { id: 'SW', nama: 'Sawah Besar', y: 12 }, { id: 'JUA', nama: 'Juanda', y: 16 }, { id: 'GMR', nama: 'Gambir (Ls)', y: 20 }, { id: 'GDD', nama: 'Gondangdia', y: 24 }, { id: 'CKI', nama: 'Cikini', y: 28 }, { id: 'MRI', nama: 'Manggarai', y: 32 }, { id: 'TEB', nama: 'Tebet', y: 36 }, { id: 'CW', nama: 'Cawang', y: 40 }, { id: 'DRN', nama: 'Duren Kalibata', y: 44 }, { id: 'PSMB', nama: 'Ps. Minggu Baru', y: 48 }, { id: 'PSM', nama: 'Pasar Minggu', y: 52 }, { id: 'TNT', nama: 'Tanjung Barat', y: 56 }, { id: 'LNA', nama: 'Lenteng Agung', y: 60 }, { id: 'UP', nama: 'Univ. Pancasila', y: 64 }, { id: 'UI', nama: 'Univ. Indonesia', y: 68 }, { id: 'POC', nama: 'Pondok Cina', y: 72 }, { id: 'DPB', nama: 'Depok Baru', y: 76 }, { id: 'DP', nama: 'Depok', y: 80 }, { id: 'CTA', nama: 'Citayam', y: 85 }, { id: 'PDRG', nama: 'Pondok Rajeg', y: 90 }, { id: 'CBN', nama: 'Cibinong', y: 95 }, { id: 'NMO', nama: 'Nambo', y: 100 } ],
  CIKARANG: [ { id: 'KPB', nama: 'Kampung Bandan', y: 0 }, { id: 'AK', nama: 'Angke', y: 4 }, { id: 'DU', nama: 'Duri', y: 8 }, { id: 'THB', nama: 'Tanah Abang', y: 12 }, { id: 'KAT', nama: 'Karet', y: 16 }, { id: 'SUD', nama: 'Sudirman', y: 20 }, { id: 'SUDB', nama: 'BNI City', y: 24 }, { id: 'MRI', nama: 'Manggarai', y: 28 }, { id: 'MTR', nama: 'Matraman', y: 32 }, { id: 'JNG', nama: 'Jatinegara', y: 36 }, { id: 'POK', nama: 'Pondok Jati', y: 40 }, { id: 'KMT', nama: 'Kramat', y: 44 }, { id: 'GST', nama: 'Gang Sentiong', y: 48 }, { id: 'PSE', nama: 'Pasar Senen', y: 52 }, { id: 'KMO', nama: 'Kemayoran', y: 56 }, { id: 'RJW', nama: 'Rajawali', y: 60 }, { id: 'KLD', nama: 'Klender', y: 65 }, { id: 'BUA', nama: 'Buaran', y: 70 }, { id: 'KLDB', nama: 'Klender Baru', y: 75 }, { id: 'CUK', nama: 'Cakung', y: 80 }, { id: 'KRI', nama: 'Kranji', y: 85 }, { id: 'BKS', nama: 'Bekasi', y: 90 }, { id: 'BKST', nama: 'Bekasi Timur', y: 93 }, { id: 'TB', nama: 'Tambun', y: 95 }, { id: 'CIT', nama: 'Cibitung', y: 97 }, { id: 'TLM', nama: 'Telaga Murni', y: 99 }, { id: 'CKR', nama: 'Cikarang', y: 100 } ],
  RANGKAS: [ { id: 'THB', nama: 'Tanah Abang', y: 0 }, { id: 'PLM', nama: 'Palmerah', y: 7 }, { id: 'KBY', nama: 'Kebayoran', y: 14 }, { id: 'PDJ', nama: 'Pondok Ranji', y: 21 }, { id: 'JMU', nama: 'Jurangmangu', y: 28 }, { id: 'SDM', nama: 'Sudimara', y: 35 }, { id: 'RU', nama: 'Rawa Buntu', y: 42 }, { id: 'SRP', nama: 'Serpong', y: 49 }, { id: 'CSK', nama: 'Cisauk', y: 56 }, { id: 'CC', nama: 'Cicayur', y: 63 }, { id: 'PRP', nama: 'Parung Panjang', y: 70 }, { id: 'CJT', nama: 'Cilejit', y: 76 }, { id: 'DAR', nama: 'Daru', y: 82 }, { id: 'TEJ', nama: 'Tenjo', y: 88 }, { id: 'TGS', nama: 'Tigaraksa', y: 92 }, { id: 'CKY', nama: 'Cikoya', y: 94 }, { id: 'CTR', nama: 'Citeras', y: 97 }, { id: 'RK', nama: 'Rangkasbitung', y: 100 } ],
  TANGERANG: [ { id: 'DU', nama: 'Duri', y: 0 }, { id: 'GRG', nama: 'Grogol', y: 10 }, { id: 'PSG', nama: 'Pesing', y: 20 }, { id: 'TKO', nama: 'Taman Kota', y: 30 }, { id: 'BOI', nama: 'Bojong Indah', y: 40 }, { id: 'RW', nama: 'Rawa Buaya', y: 50 }, { id: 'KDS', nama: 'Kalideres', y: 60 }, { id: 'PI', nama: 'Poris', y: 70 }, { id: 'BPR', nama: 'Batu Ceper', y: 80 }, { id: 'THI', nama: 'Tanah Tinggi', y: 90 }, { id: 'TNG', nama: 'Tangerang', y: 100 } ],
  PRIOK: [ { id: 'JAKK', nama: 'Jakarta Kota', y: 0 }, { id: 'KPB', nama: 'Kampung Bandan', y: 25 }, { id: 'RJW', nama: 'Rajawali', y: 50 }, { id: 'AC', nama: 'Ancol', y: 75 }, { id: 'TPK', nama: 'Tanjung Priok', y: 100 } ]
};

const LINE_COLORS: Record<keyof typeof TOPOLOGI, any> = {
  BOGOR: { bg: 'bg-red-500', text: 'text-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]', track: 'bg-red-600/30' },
  NAMBO: { bg: 'bg-rose-500', text: 'text-rose-500', shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.8)]', track: 'bg-rose-600/30' },
  CIKARANG: { bg: 'bg-blue-500', text: 'text-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.8)]', track: 'bg-blue-600/30' },
  RANGKAS: { bg: 'bg-green-500', text: 'text-green-500', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.8)]', track: 'bg-green-600/30' },
  TANGERANG: { bg: 'bg-orange-500', text: 'text-orange-500', shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.8)]', track: 'bg-orange-600/30' },
  PRIOK: { bg: 'bg-pink-500', text: 'text-pink-500', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.8)]', track: 'bg-pink-600/30' }
};

// ==========================================
// KOMPONEN: AUTOCOMPLETE SEARCHABLE SELECT
// ==========================================
function SearchableSelect({ value, onChange, options, icon: Icon, iconColor, placeholder }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selectedObj = options.find((o: any) => o.id === value);
  const filteredOptions = options.filter((o: any) => o.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative w-full">
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
      <div onClick={() => setIsOpen(!isOpen)} className="w-full bg-transparent text-white font-bold text-[15px] p-3 flex justify-between items-center cursor-pointer">
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon size={20} className={`${iconColor} shrink-0`} />}
          <span className="truncate">{selectedObj ? selectedObj.nama : placeholder}</span>
        </div>
        <ChevronDown size={18} className="text-gray-500 shrink-0" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#1c2128] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 border-b border-gray-700 flex items-center gap-2 bg-[#161920]">
            <Search size={16} className="text-gray-400" />
            <input type="text" autoFocus placeholder="Cari stasiun..." className="bg-transparent text-white w-full outline-none text-sm font-medium" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="max-h-60 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden">
            {filteredOptions.length === 0 ? (
              <p className="p-4 text-center text-gray-500 text-sm">Stasiun tidak ditemukan.</p>
            ) : (
              filteredOptions.map((opt: any) => (
                <div key={opt.id} onClick={() => { onChange(opt.id); setIsOpen(false); setSearch(''); }} className={`p-3 text-sm cursor-pointer hover:bg-gray-800 border-b border-gray-800/50 last:border-0 ${value === opt.id ? 'bg-gray-800 font-bold text-yellow-400' : 'text-gray-300'}`}>
                  {opt.nama}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [viewMode, setViewMode] = useState<'station' | 'network' | 'transit'>('station');
  const [activeLine, setActiveLine] = useState<keyof typeof TOPOLOGI>('BOGOR');
  
  const [stasiun, setStasiun] = useState('DP'); 
  const [stAsal, setStAsal] = useState('DP');   
  const [stTujuan, setStTujuan] = useState('SDM'); 
  
  const [jadwalStasiun, setJadwalStasiun] = useState<any[]>([]);
  const [ruteTransit, setRuteTransit] = useState<any[] | null>(null);
  const [keretaAktifGlobal, setKeretaAktifGlobal] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [hasSearchedStation, setHasSearchedStation] = useState(false);
  const [hasSearchedTransit, setHasSearchedTransit] = useState(false);
  
  const [waktuSaatIni, setWaktuSekarang] = useState('');
  const [isNightTime, setIsNightTime] = useState(false);

  // 1. Clock UI 
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setWaktuSekarang(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' }));
      setIsNightTime(now.getHours() >= 23 || now.getHours() <= 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch Network Map (Polling Server every 5 seconds)
  useEffect(() => {
    if (viewMode !== 'network') return;
    const fetchNetwork = async () => {
      try {
        const res = await fetch(`/api/kereta?action=network&line=${activeLine}`);
        const json = await res.json();
        setKeretaAktifGlobal(json.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNetwork(); 
    const intervalId = setInterval(fetchNetwork, 5000); 
    return () => clearInterval(intervalId);
  }, [viewMode, activeLine]);

  // 3. Action Calls to Backend
  const cariJadwal = async (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    setLoading(true); setHasSearchedStation(true);
    try {
      const res = await fetch(`/api/kereta?action=station&stasiun=${stasiun}`);
      const json = await res.json();
      setJadwalStasiun(json.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const hitungTransit = async (e: React.FormEvent) => {
    if(e) e.preventDefault();
    setLoading(true); setHasSearchedTransit(true);
    try {
      const res = await fetch(`/api/kereta?action=transit&asal=${stAsal}&tujuan=${stTujuan}`);
      const json = await res.json();
      setRuteTransit(json.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const stasiunList = Object.values(TOPOLOGI).flat().sort((a,b) => a.nama.localeCompare(b.nama));
  const uniqueStasiunList = stasiunList.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
  const findNamaStasiun = (id: string) => uniqueStasiunList.find(s => s.id === id)?.nama || id;
  const currentLineColor = LINE_COLORS[activeLine];

  return (
    <main className="min-h-screen bg-[#0f1115] pb-24 font-sans text-white selection:bg-yellow-400 selection:text-black">
      {/* 1. TOP NAVBAR */}
      <nav className="border-b border-gray-800 bg-[#161920]/90 backdrop-blur-md px-4 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-lg text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]">
              <Train size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black tracking-tighter">ANKER NINJA</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-black/50 border border-gray-700 px-3 py-1 rounded-full text-sm font-mono font-bold text-gray-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 relative"></div>
            {waktuSaatIni || '00:00:00'}
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 mt-6">
        
        {/* 2. TAB CONTROLLER */}
        <div className="flex bg-[#161920] rounded-xl p-1.5 mb-6 border border-gray-800 gap-1 overflow-x-auto pb-1 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button onClick={() => setViewMode('station')} className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 px-4 rounded-lg font-bold text-[12px] whitespace-nowrap transition-all ${viewMode === 'station' ? 'bg-yellow-400 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
            <Crosshair size={14} /> HACK STASIUN
          </button>
          <button onClick={() => setViewMode('transit')} className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 px-4 rounded-lg font-bold text-[12px] whitespace-nowrap transition-all ${viewMode === 'transit' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'text-gray-400 hover:text-white'}`}>
            <Route size={14} /> TRANSIT CALC
          </button>
          <button onClick={() => setViewMode('network')} className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 px-4 rounded-lg font-bold text-[12px] whitespace-nowrap transition-all ${viewMode === 'network' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-gray-400 hover:text-white'}`}>
            <MapIcon size={14} /> GLOBAL RADAR
          </button>
        </div>

        {/* ========================================= */}
        {/* VIEW 1: STATION HACKER                    */}
        {/* ========================================= */}
        {viewMode === 'station' && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-5 text-black mb-6 shadow-[0_4px_20px_rgba(250,204,21,0.15)]">
              <h2 className="font-black text-2xl uppercase leading-none mb-1">Hack Jadwalmu.</h2>
              <p className="font-medium text-sm text-yellow-950">Pantau kereta berangkat awal. Berhenti jadi sadboy/sadgirl karena berdiri sampai Kota.</p>
            </div>

            <form onSubmit={cariJadwal} className="mb-8 relative z-30">
              <div className="bg-[#161920] border border-gray-700 p-1.5 rounded-2xl flex items-center shadow-lg focus-within:border-yellow-400 transition-all">
                <SearchableSelect value={stasiun} onChange={setStasiun} options={uniqueStasiunList} icon={MapPin} iconColor="text-gray-400" placeholder="Pilih Stasiun..." />
                <button type="submit" className="bg-white text-black px-6 py-3 mr-1 rounded-xl font-black hover:bg-gray-200 transition-all">CARI</button>
              </div>
            </form>

            {loading && <div className="flex justify-center my-10"><div className="animate-spin h-10 w-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div></div>}

            {!loading && hasSearchedStation && jadwalStasiun.length === 0 && (
              <div className="text-center py-16 bg-[#161920] rounded-3xl border border-gray-800 animate-in fade-in">
                {isNightTime ? (
                  <>
                    <Moon size={48} className="mx-auto mb-4 text-blue-400 opacity-50" />
                    <p className="font-bold text-lg text-white mb-1">Zzz... KRL Udah Tidur</p>
                    <p className="text-sm text-gray-500 px-6">Udah lewat tengah malam bosku. Kereta udah di Depo, gaskeun pesen ojol aja ya!</p>
                  </>
                ) : (
                  <>
                    <XCircle size={48} className="mx-auto mb-4 text-red-400 opacity-50" />
                    <p className="font-bold text-lg text-white mb-1">Yah, Jadwal Kosong</p>
                    <p className="text-sm text-gray-500 px-6">Tidak ada jadwal kereta terdekat yang tersedia untuk stasiun ini. Coba cek lagi nanti.</p>
                  </>
                )}
              </div>
            )}

            {!loading && jadwalStasiun.length > 0 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-5">
                <div className="flex items-center gap-2 px-1">
                  <Activity size={16} className="text-yellow-400" /> <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Radar Tracker</p>
                </div>
                {jadwalStasiun.map((kereta, idx) => (
                  <div key={idx} className="relative overflow-hidden border border-gray-700 rounded-2xl bg-[#161920] shadow-xl">
                    <div className={`p-5 ${kereta.isKosong ? 'bg-green-900/20' : kereta.isBatal ? 'bg-red-900/20' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-4xl font-black font-mono tracking-tighter text-white">{kereta.waktu}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-black border border-gray-600 text-gray-300 text-xs font-bold px-2 py-1 rounded-md">KA {kereta.nomor}</span>
                            <span className="text-sm font-medium text-gray-400 truncate max-w-[150px] inline-block">{kereta.relasi}</span>
                          </div>
                        </div>
                        {kereta.isBatal && <div className="bg-red-500/10 text-red-500 flex flex-col items-end gap-1 text-[10px] font-black px-2 py-1 rounded border border-red-500/30"><AlertTriangle size={16} /> BTL HARI INI</div>}
                      </div>
                      {kereta.isKosong && <div className="mt-3 inline-flex items-center gap-1.5 text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg border border-green-400/20"><ShieldCheck size={16} /> <span className="font-bold text-xs uppercase tracking-wider">Berangkat Kosong dr Sini</span></div>}
                    </div>

                    {!kereta.isBatal && (
                      <div className="bg-[#0f1115] p-5 border-t border-gray-800 relative">
                        <div className="relative h-1 bg-gray-800 rounded-full w-full mb-8 mt-2">
                          <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-[2000ms] ease-linear" style={{ left: `${kereta.persen}%`, transform: `translate(-${kereta.persen}%, -50%)` }}>
                            <div className={`absolute -inset-2 rounded-full blur-sm opacity-50 animate-pulse ${kereta.selisihMenit <= 0 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
                            <div className={`relative text-black p-1.5 rounded-full z-10 ${kereta.selisihMenit <= 0 ? 'bg-green-500' : 'bg-yellow-400'}`}><Train size={14} strokeWidth={3} /></div>
                          </div>
                          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-gray-600 rounded-full border-2 border-[#0f1115]"></div>
                          <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 rounded-full border-4 border-[#0f1115] ${kereta.selisihMenit <= 0 ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}></div>
                        </div>
                        <div className={`text-center text-xs font-medium py-1.5 rounded-md ${kereta.selisihMenit <= 0 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400/80 bg-yellow-400/10 animate-pulse'}`}>{kereta.statusText}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 2: THE TRANSIT CALCULATOR            */}
        {/* ========================================= */}
        {viewMode === 'transit' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-5 text-white mb-6 shadow-lg">
              <h2 className="font-black text-2xl uppercase leading-none mb-1">Transit Engine.</h2>
              <p className="font-medium text-sm text-blue-100">Cari rute tercepat antar jalur. Nggak perlu pusing ngapalin peta Manggarai lagi.</p>
            </div>

            <form onSubmit={hitungTransit} className="mb-6 space-y-3 relative z-30">
              <div className="bg-[#161920] border border-gray-700 p-1.5 rounded-xl flex items-center shadow-lg">
                <SearchableSelect value={stAsal} onChange={setStAsal} options={uniqueStasiunList} icon={MapPin} iconColor="text-gray-400" placeholder="Stasiun Awal..." />
              </div>
              <div className="flex justify-center -my-4 relative z-10 pointer-events-none"><div className="bg-gray-800 p-2 rounded-full border border-gray-700"><ArrowRight size={16} className="rotate-90 text-blue-400"/></div></div>
              <div className="bg-[#161920] border border-gray-700 p-1.5 rounded-xl flex items-center shadow-lg">
                <SearchableSelect value={stTujuan} onChange={setStTujuan} options={uniqueStasiunList} icon={MapPin} iconColor="text-blue-400" placeholder="Stasiun Tujuan..." />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 mt-2 rounded-xl font-black hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">HITUNG RUTE</button>
            </form>

            {loading && <div className="flex justify-center my-10"><div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>}

            {!loading && hasSearchedTransit && ruteTransit && ruteTransit.length === 0 && (
              <div className="text-center py-16 bg-[#161920] rounded-3xl border border-gray-800 animate-in fade-in">
                 <AlertTriangle size={48} className="mx-auto mb-4 text-orange-400 opacity-50" />
                 <p className="font-bold text-lg text-white mb-1">Rute Buntu</p>
                 <p className="text-sm text-gray-500 px-6">Butuh keajaiban buat nyampe sana jam segini. Keretanya udah habis atau rutenya nggak nyambung.</p>
              </div>
            )}

            {!loading && ruteTransit && ruteTransit.length > 0 && (
              <div className="bg-[#161920] p-6 rounded-3xl border border-gray-700 shadow-xl relative ml-2 animate-in slide-in-from-bottom-5">
                <div className="absolute left-6 top-10 bottom-10 w-1 bg-gray-800 rounded-full"></div>
                {ruteTransit.map((step, idx) => {
                   const isNaik = step.tipe === 'naik';
                   const isTransit = step.tipe === 'transit';
                   const colorClass = isNaik ? 'bg-blue-500' : isTransit ? 'bg-orange-500' : 'bg-green-500';
                   return (
                     <div key={idx} className="relative flex mb-8 last:mb-0">
                       <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-4 border-[#161920] z-10 ${colorClass}`}></div>
                       <div className="ml-8">
                         <div className="flex items-center gap-2">
                           <h4 className="text-xl font-black font-mono">{step.wkt}</h4>
                           {isNaik && <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700">KA {step.ka}</span>}
                         </div>
                         <p className={`text-sm font-bold mt-0.5 ${isTransit ? 'text-orange-400' : 'text-white'}`}>
                           {isNaik ? `Naik dr ${findNamaStasiun(step.stasiun)}` : isTransit ? `Transit di ${findNamaStasiun(step.stasiun)}` : `Tiba di ${findNamaStasiun(step.stasiun)}`}
                         </p>
                         
                         {/* FIX BUG KOSMETIK: Jangan cetak tulisan "LINE" ganda pada transit */}
                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                           {step.tipe === 'naik' ? `${step.line} LINE` : step.line}
                         </p>
                       </div>
                     </div>
                   )
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* VIEW 3: GLOBAL NETWORK                    */}
        {/* ========================================= */}
        {viewMode === 'network' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {(Object.keys(TOPOLOGI) as Array<keyof typeof TOPOLOGI>).map(line => (
                <button 
                  key={line} onClick={() => setActiveLine(line)}
                  className={`px-4 py-2 flex-shrink-0 rounded-full text-[11px] font-black tracking-wider transition-all border ${activeLine === line ? `${LINE_COLORS[line].bg} text-white border-transparent ${LINE_COLORS[line].shadow}` : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-700'}`}
                >
                  {line} LINE
                </button>
              ))}
            </div>

            <div className="bg-[#161920] border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden h-[70vh] flex flex-col">
              <div className="sticky top-0 z-40 bg-[#161920]/95 backdrop-blur-md border-b border-gray-800 px-6 py-4 shadow-sm flex-shrink-0">
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <span className="truncate w-1/3">{TOPOLOGI[activeLine][0].nama}</span>
                  <span className={`${currentLineColor.text} bg-gray-800/50 px-2 py-1 rounded-full whitespace-nowrap border border-gray-700`}>↕ 2 Arah</span>
                  <span className="truncate w-1/3 text-right">{TOPOLOGI[activeLine][TOPOLOGI[activeLine].length-1].nama}</span>
                </div>
              </div>

              <div className="relative w-full flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden px-6 pt-6 pb-20">
                <div className="relative w-full" style={{ height: `${TOPOLOGI[activeLine].length * 45}px` }}>
                  <div className={`absolute left-1/2 top-0 bottom-0 w-2 ${currentLineColor.track} rounded-full -translate-x-1/2`}></div>
                  <div className={`absolute left-1/2 top-0 bottom-0 w-0.5 ${currentLineColor.bg} ${currentLineColor.shadow} -translate-x-1/2`}></div>

                  {TOPOLOGI[activeLine].map((stasiun, idx) => (
                    <div key={`st-${idx}`} className="absolute w-full flex items-center justify-center" style={{ top: `${stasiun.y}%`, transform: 'translateY(-50%)' }}>
                      <div className="w-3 h-3 rounded-full bg-black border-2 border-white shadow-md z-10"></div>
                      <div className="absolute left-[55%] text-[10px] font-bold text-gray-400 whitespace-nowrap drop-shadow-md">{stasiun.nama}</div>
                    </div>
                  ))}

                  {keretaAktifGlobal.map((kereta, idx) => {
                    const alignClass = kereta.isDown ? 'left-[53%] flex-row' : 'right-[53%] flex-row-reverse text-right';
                    return (
                      <div key={`trn-${idx}`} className={`absolute transition-all duration-[5000ms] ease-linear z-20 flex items-center gap-2 ${alignClass}`} style={{ top: `${kereta.y}%`, transform: 'translateY(-50%)' }}>
                        <div className={`w-3.5 h-3.5 rounded-full ${currentLineColor.bg} ${currentLineColor.shadow} border-2 border-white animate-pulse`}></div>
                        <div className="bg-black/90 backdrop-blur-md border border-gray-700 px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none">
                          <p className={`text-[10px] font-black ${currentLineColor.text} leading-none`}>KA {kereta.nomor}</p>
                          <p className="text-[9px] font-bold text-gray-300 mt-0.5 truncate max-w-[70px]">Ke {kereta.tujuan}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center bg-[#161920] border border-gray-800 p-4 rounded-xl shadow-lg">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Beroperasi</p>
                <p className="text-2xl font-black text-white leading-none">{keretaAktifGlobal.length} <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rangkaian</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}