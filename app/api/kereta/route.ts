import { NextResponse } from 'next/server';
// @ts-ignore
import jadwalData from '../../../data/jadwal_krl_full.json';

// --- DATA TOPOLOGI & MATRIX (DI BACKEND) ---
const TOPOLOGI = {
  BOGOR: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'JAY', y: 4, nama: 'Jayakarta' }, { id: 'MGB', y: 8, nama: 'Mangga Besar' }, { id: 'SW', y: 12, nama: 'Sawah Besar' }, { id: 'JUA', y: 16, nama: 'Juanda' }, { id: 'GMR', y: 20, nama: 'Gambir' }, { id: 'GDD', y: 24, nama: 'Gondangdia' }, { id: 'CKI', y: 28, nama: 'Cikini' }, { id: 'MRI', y: 32, nama: 'Manggarai' }, { id: 'TEB', y: 36, nama: 'Tebet' }, { id: 'CW', y: 40, nama: 'Cawang' }, { id: 'DRN', y: 44, nama: 'Duren Kalibata' }, { id: 'PSMB', y: 48, nama: 'Ps. Minggu Baru' }, { id: 'PSM', y: 52, nama: 'Pasar Minggu' }, { id: 'TNT', y: 56, nama: 'Tanjung Barat' }, { id: 'LNA', y: 60, nama: 'Lenteng Agung' }, { id: 'UP', y: 64, nama: 'Univ. Pancasila' }, { id: 'UI', y: 68, nama: 'Univ. Indonesia' }, { id: 'POC', y: 72, nama: 'Pondok Cina' }, { id: 'DPB', y: 76, nama: 'Depok Baru' }, { id: 'DP', y: 80, nama: 'Depok' }, { id: 'CTA', y: 85, nama: 'Citayam' }, { id: 'BJD', y: 90, nama: 'Bojong Gede' }, { id: 'CLT', y: 95, nama: 'Cilebut' }, { id: 'BOO', y: 100, nama: 'Bogor' } ],
  NAMBO: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'JAY', y: 4, nama: 'Jayakarta' }, { id: 'MGB', y: 8, nama: 'Mangga Besar' }, { id: 'SW', y: 12, nama: 'Sawah Besar' }, { id: 'JUA', y: 16, nama: 'Juanda' }, { id: 'GMR', y: 20, nama: 'Gambir' }, { id: 'GDD', y: 24, nama: 'Gondangdia' }, { id: 'CKI', y: 28, nama: 'Cikini' }, { id: 'MRI', y: 32, nama: 'Manggarai' }, { id: 'TEB', y: 36, nama: 'Tebet' }, { id: 'CW', y: 40, nama: 'Cawang' }, { id: 'DRN', y: 44, nama: 'Duren Kalibata' }, { id: 'PSMB', y: 48, nama: 'Ps. Minggu Baru' }, { id: 'PSM', y: 52, nama: 'Pasar Minggu' }, { id: 'TNT', y: 56, nama: 'Tanjung Barat' }, { id: 'LNA', y: 60, nama: 'Lenteng Agung' }, { id: 'UP', y: 64, nama: 'Univ. Pancasila' }, { id: 'UI', y: 68, nama: 'Univ. Indonesia' }, { id: 'POC', y: 72, nama: 'Pondok Cina' }, { id: 'DPB', y: 76, nama: 'Depok Baru' }, { id: 'DP', y: 80, nama: 'Depok' }, { id: 'CTA', y: 85, nama: 'Citayam' }, { id: 'PDRG', y: 90, nama: 'Pondok Rajeg' }, { id: 'CBN', y: 95, nama: 'Cibinong' }, { id: 'NMO', y: 100, nama: 'Nambo' } ],
  CIKARANG: [ { id: 'KPB', y: 0, nama: 'Kampung Bandan' }, { id: 'AK', y: 4, nama: 'Angke' }, { id: 'DU', y: 8, nama: 'Duri' }, { id: 'THB', y: 12, nama: 'Tanah Abang' }, { id: 'KAT', y: 16, nama: 'Karet' }, { id: 'SUD', y: 20, nama: 'Sudirman' }, { id: 'SUDB', y: 24, nama: 'BNI City' }, { id: 'MRI', y: 28, nama: 'Manggarai' }, { id: 'MTR', y: 32, nama: 'Matraman' }, { id: 'JNG', y: 36, nama: 'Jatinegara' }, { id: 'POK', y: 40, nama: 'Pondok Jati' }, { id: 'KMT', y: 44, nama: 'Kramat' }, { id: 'GST', y: 48, nama: 'Gang Sentiong' }, { id: 'PSE', y: 52, nama: 'Pasar Senen' }, { id: 'KMO', y: 56, nama: 'Kemayoran' }, { id: 'RJW', y: 60, nama: 'Rajawali' }, { id: 'KLD', y: 65, nama: 'Klender' }, { id: 'BUA', y: 70, nama: 'Buaran' }, { id: 'KLDB', y: 75, nama: 'Klender Baru' }, { id: 'CUK', y: 80, nama: 'Cakung' }, { id: 'KRI', y: 85, nama: 'Kranji' }, { id: 'BKS', y: 90, nama: 'Bekasi' }, { id: 'BKST', y: 93, nama: 'Bekasi Timur' }, { id: 'TB', y: 95, nama: 'Tambun' }, { id: 'CIT', y: 97, nama: 'Cibitung' }, { id: 'TLM', y: 99, nama: 'Telaga Murni' }, { id: 'CKR', y: 100, nama: 'Cikarang' } ],
  RANGKAS: [ { id: 'THB', y: 0, nama: 'Tanah Abang' }, { id: 'PLM', y: 7, nama: 'Palmerah' }, { id: 'KBY', y: 14, nama: 'Kebayoran' }, { id: 'PDJ', y: 21, nama: 'Pondok Ranji' }, { id: 'JMU', y: 28, nama: 'Jurangmangu' }, { id: 'SDM', y: 35, nama: 'Sudimara' }, { id: 'RU', y: 42, nama: 'Rawa Buntu' }, { id: 'SRP', y: 49, nama: 'Serpong' }, { id: 'CSK', y: 56, nama: 'Cisauk' }, { id: 'CC', y: 63, nama: 'Cicayur' }, { id: 'PRP', y: 70, nama: 'Parung Panjang' }, { id: 'CJT', y: 76, nama: 'Cilejit' }, { id: 'DAR', y: 82, nama: 'Daru' }, { id: 'TEJ', y: 88, nama: 'Tenjo' }, { id: 'TGS', y: 92, nama: 'Tigaraksa' }, { id: 'CKY', y: 94, nama: 'Cikoya' }, { id: 'CTR', y: 97, nama: 'Citeras' }, { id: 'RK', y: 100, nama: 'Rangkasbitung' } ],
  TANGERANG: [ { id: 'DU', y: 0, nama: 'Duri' }, { id: 'GRG', y: 10, nama: 'Grogol' }, { id: 'PSG', y: 20, nama: 'Pesing' }, { id: 'TKO', y: 30, nama: 'Taman Kota' }, { id: 'BOI', y: 40, nama: 'Bojong Indah' }, { id: 'RW', y: 50, nama: 'Rawa Buaya' }, { id: 'KDS', y: 60, nama: 'Kalideres' }, { id: 'PI', y: 70, nama: 'Poris' }, { id: 'BPR', y: 80, nama: 'Batu Ceper' }, { id: 'THI', y: 90, nama: 'Tanah Tinggi' }, { id: 'TNG', y: 100, nama: 'Tangerang' } ],
  PRIOK: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'KPB', y: 25, nama: 'Kampung Bandan' }, { id: 'RJW', y: 50, nama: 'Rajawali' }, { id: 'AC', y: 75, nama: 'Ancol' }, { id: 'TPK', y: 100, nama: 'Tanjung Priok' } ]
};

// ==========================================
// KECERDASAN BUATAN BFS (Pencari Jalur Hub Transit Tercepat)
// Kita mendefinisikan Stasiun Pertemuan (Interchange) secara absolut di memori.
// ==========================================
const NETWORK_GRAPH: Record<string, string[]> = {
  'JAKK': ['BOGOR', 'NAMBO', 'PRIOK'],
  'MRI': ['BOGOR', 'NAMBO', 'CIKARANG'],
  'KPB': ['CIKARANG', 'PRIOK'],
  'THB': ['CIKARANG', 'RANGKAS'],
  'DU': ['CIKARANG', 'TANGERANG'],
  'JNG': ['CIKARANG'] // Khusus Cikarang Putaran Kanan/Kiri
};

const getLinesForStation = (stId: string): string[] => {
  if (['PDRG', 'CBN', 'NMO'].includes(stId)) return ['NAMBO'];
  const lines: string[] = [];
  for (const [line, stations] of Object.entries(TOPOLOGI)) {
    if (stations.some(s => s.id === stId)) lines.push(line);
  }
  return lines;
};

// Breadth-First Search untuk menemukan rute HUB tercepat
const findTransitPath = (stAsal: string, stTujuan: string) => {
  const linesAsal = getLinesForStation(stAsal);
  const linesTujuan = getLinesForStation(stTujuan);

  // 1. Direct (Satu Jalur)
  const commonLine = linesAsal.find(l => linesTujuan.includes(l));
  if (commonLine) {
    // Khusus Cikarang Line, jika nyebrang wilayah (Manggarai ke Pasar Senen), paksa transit di JNG!
    if (commonLine === 'CIKARANG') {
        const isKiri = (id: string) => ['KPB','AK','DU','THB','KAT','SUD','SUDB','MRI','MTR','JNG'].includes(id);
        const isKanan = (id: string) => ['JNG','POK','KMT','GST','PSE','KMO','RJW','KPB'].includes(id);
        if ((isKiri(stAsal) && isKanan(stTujuan)) || (isKanan(stAsal) && isKiri(stTujuan))) {
             return { isDirect: false, nodes: ['JNG'], linePlan: ['CIKARANG', 'CIKARANG'] };
        }
    }
    return { isDirect: true, nodes: [], linePlan: [commonLine] };
  }

  // 2. Butuh 1x Transit
  for (const [hub, connectedLines] of Object.entries(NETWORK_GRAPH)) {
      const canReachFromAsal = linesAsal.some(l => connectedLines.includes(l));
      const canReachTujuan = linesTujuan.some(l => connectedLines.includes(l));
      if (canReachFromAsal && canReachTujuan) {
          return { 
              isDirect: false, 
              nodes: [hub], 
              linePlan: [linesAsal.find(l => connectedLines.includes(l)), linesTujuan.find(l => connectedLines.includes(l))]
          };
      }
  }

  // 3. Butuh 2x Transit (Contoh: Bogor -> Tangerang via MRI -> DU)
  for (const [hub1, linesHub1] of Object.entries(NETWORK_GRAPH)) {
      for (const [hub2, linesHub2] of Object.entries(NETWORK_GRAPH)) {
          if (hub1 === hub2) continue;
          const canReachFromAsal = linesAsal.some(l => linesHub1.includes(l));
          const canReachTujuan = linesTujuan.some(l => linesHub2.includes(l));
          const commonHubLine = linesHub1.find(l => linesHub2.includes(l));

          if (canReachFromAsal && canReachTujuan && commonHubLine) {
              return { 
                  isDirect: false, 
                  nodes: [hub1, hub2], 
                  linePlan: [linesAsal.find(l => linesHub1.includes(l)), commonHubLine, linesTujuan.find(l => linesHub2.includes(l))]
              };
          }
      }
  }

  return { isDirect: false, nodes: [], linePlan: [] }; // Buntu
};

// --- UTILITIES ---
const getNomorKA = (k: any) => k['NOMOR KA'] || k['Kolom_1'] || k['NO'] || '-';
const getRelasiKA = (k: any) => k['RELASI'] || k['Kolom_2'] || k['RUTE'] || 'Tpk-Line';
const timeToMins = (time: string) => { const [h,m] = time.split(':').map(Number); return (h * 60) + m; };
const minsToTime = (mins: number) => `${Math.floor(mins/60).toString().padStart(2,'0')}:${(mins%60).toString().padStart(2,'0')}`;

// =========================================================================================
// MAIN API ROUTE
// =========================================================================================
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  const now = new Date();
  const wib = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  const isWeekend = wib.getDay() === 0 || wib.getDay() === 6;
  const menitGlobalSekarang = (wib.getUTCHours() * 60) + wib.getUTCMinutes();
  const strJamSekarang = `${wib.getUTCHours().toString().padStart(2, '0')}:${wib.getUTCMinutes().toString().padStart(2, '0')}`;

  // ==========================================
  // ACTION 1: HACK STASIUN
  // ==========================================
  if (action === 'station') {
    const stasiunAsal = searchParams.get('stasiun') || 'DP';
    const keretaTersedia = jadwalData.filter((k: any) => k[stasiunAsal] && k[stasiunAsal] !== "Ls" && k[stasiunAsal] >= strJamSekarang);

    const hasil = keretaTersedia.map((k: any) => {
      const relasi = getRelasiKA(k);
      const stAwal = relasi !== '-' ? relasi.split('-')[0].toUpperCase() : '';
      const isBatal = JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend;
      const waktuTiba = k[stasiunAsal];

      let selisih = timeToMins(waktuTiba) - menitGlobalSekarang;
      if (selisih < -1000) selisih += 1440; 
      let persen = 0, statusText = '';
      if (selisih <= 0) { persen = 100; statusText = 'Tiba!'; } 
      else if (selisih >= 20) { persen = 5; statusText = `${selisih} mnt lagi`; } 
      else { persen = 100 - ((selisih / 20) * 100); statusText = `Tiba dlm ${selisih} mnt`; }

      return { nomor: getNomorKA(k), relasi, waktu: waktuTiba, isKosong: (stAwal === stasiunAsal || (stAwal === 'DP' && stasiunAsal === 'DP')), isBatal, persen, statusText, selisihMenit: selisih };
    });
    hasil.sort((a: any, b: any) => a.waktu.localeCompare(b.waktu));
    return NextResponse.json({ data: hasil.slice(0, 6) });
  }

  // ==========================================
  // ACTION 2: NETWORK MAP
  // ==========================================
  if (action === 'network') {
    const activeLine = searchParams.get('line') || 'BOGOR';
    const aktif: any[] = [];
    const jalurDipilih = TOPOLOGI[activeLine as keyof typeof TOPOLOGI];

    jadwalData.forEach((kereta: any) => {
      if (JSON.stringify(kereta).toUpperCase().includes('BATAL') && isWeekend) return; 
      if (activeLine === 'NAMBO') {
         const relasi = getRelasiKA(kereta).toUpperCase();
         if (!relasi.includes('NMO') && !relasi.includes('NAMBO')) return;
      }
      for (let i = 0; i < jalurDipilih.length - 1; i++) {
        const st1 = jalurDipilih[i], st2 = jalurDipilih[i+1];
        const w1 = kereta[st1.id], w2 = kereta[st2.id];
        if (!w1 || w1 === 'Ls' || !w2 || w2 === 'Ls') continue;
        let m1 = timeToMins(w1), m2 = timeToMins(w2);
        if (m1 < 180) m1 += 1440; if (m2 < 180) m2 += 1440;
        let wSkrg = menitGlobalSekarang; if (wSkrg < 180) wSkrg += 1440;

        let stTerlewat = null, stTujuan = null, isDown = true;
        if (m1 < m2 && wSkrg >= m1 && wSkrg <= m2) { stTerlewat = st1; stTujuan = st2; isDown = true; } 
        else if (m1 > m2 && wSkrg <= m1 && wSkrg >= m2) { stTerlewat = st2; stTujuan = st1; isDown = false; }

        if (stTerlewat && stTujuan) {
          const persentase = Math.abs(m1 - m2) === 0 ? 0 : (wSkrg - Math.min(m1, m2)) / Math.abs(m1 - m2);
          let yPos = isDown ? stTerlewat.y + (persentase * (stTujuan.y - stTerlewat.y)) : stTerlewat.y - (persentase * (stTerlewat.y - stTujuan.y));
          aktif.push({ nomor: getNomorKA(kereta), y: yPos, isDown, tujuan: stTujuan.nama });
          break;
        }
      }
    });
    return NextResponse.json({ data: aktif });
  }

  // ==========================================
  // ACTION 3: TRANSIT CALCULATOR (MURNI TANPA BATASAN JALUR)
  // ==========================================
  if (action === 'transit') {
    const stAsal = searchParams.get('asal') || 'DP';
    const stTujuan = searchParams.get('tujuan') || 'SDM';
    
    // Mesin Pencari Kereta Universal
    const cariKeretaUniversal = (asal: string, tujuan: string, minMenit: number) => {
      let keretaDitemukan = null, waktuTercepat = 9999, waktuTibaTujuan = '';

      for (let k of jadwalData) {
        if (JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend) continue;
        
        // Pengecekan krusial: Kereta harus BERHENTI di asal dan tujuan
        if (!k[asal] || k[asal] === 'Ls' || !k[tujuan] || k[tujuan] === 'Ls') continue;
  
        let wAsal = timeToMins(k[asal]); 
        let wTujuan = timeToMins(k[tujuan]);
        
        // Fix lintas malam
        if (wAsal < 180) wAsal += 1440; 
        if (wTujuan < 180) wTujuan += 1440;
  
        // 1. Kereta belum lewat
        if (wAsal < minMenit) continue;

        let waktuPerjalanan = wTujuan - wAsal;
        
        // 2. Lintas Malam Fix
        if (waktuPerjalanan < 0) {
            waktuPerjalanan += 1440;
            wTujuan += 1440;
        }

        // 3. Batas waktu tempuh logika KRL (Max 3 Jam antar ujung)
        if (waktuPerjalanan > 180) continue; 

        // 4. Ambil yang tercepat
        if (wAsal < waktuTercepat) {
          waktuTercepat = wAsal; 
          keretaDitemukan = k; 
          waktuTibaTujuan = minsToTime(wTujuan > 1440 ? wTujuan - 1440 : wTujuan);
        }
      }
      return { kereta: keretaDitemukan, strTiba: waktuTibaTujuan };
    };

    // 1. BUAT RENCANA PERJALANAN MENGGUNAKAN BFS GRAPH
    const plan = findTransitPath(stAsal, stTujuan);
    
    if (!plan.linePlan || plan.linePlan.length === 0) {
        return NextResponse.json({ data: [] }); // Gagal / Buntu
    }

    let wktBerangkat = menitGlobalSekarang;
    let stasiunSekarang = stAsal;
    let rute: any[] = [];
    const titikPerjalanan = [...plan.nodes, stTujuan];
    let ruteValid = true;

    // 2. EKSEKUSI PERJALANAN (Step-by-Step)
    for (let i = 0; i < titikPerjalanan.length; i++) {
        const tujuanLeg = titikPerjalanan[i];
        
        // Cari kereta (Sistem tidak lagi peduli nama jalurnya apa, ia hanya mencari di tabel JSON!)
        const leg = cariKeretaUniversal(stasiunSekarang, tujuanLeg, wktBerangkat);

        if (!leg.kereta) { ruteValid = false; break; }

        const namaJalur = plan.linePlan[i] || 'LANJUTAN';

        rute.push({ 
            tipe: 'naik', stasiun: stasiunSekarang, wkt: leg.kereta[stasiunSekarang], 
            ka: getNomorKA(leg.kereta), line: namaJalur 
        });
        
        const isAkhir = i === titikPerjalanan.length - 1;
        rute.push({ 
            tipe: isAkhir ? 'turun' : 'transit', stasiun: tujuanLeg, 
            wkt: leg.strTiba, line: isAkhir ? namaJalur : 'Pindah Peron' 
        });

        // Waktu tunggu minimal pindah peron = 5 Menit
        wktBerangkat = timeToMins(leg.strTiba) + 5; 
        stasiunSekarang = tujuanLeg;
    }

    if(stAsal === stTujuan) ruteValid = false; 
    return NextResponse.json({ data: ruteValid ? rute : [] });
  }

  return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
}