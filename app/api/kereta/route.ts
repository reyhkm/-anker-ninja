import { NextResponse } from 'next/server';
// @ts-ignore
import jadwalData from '../../../data/jadwal_krl_full.json';

// ==========================================
// 1. DATA TOPOLOGI MURNI
// ==========================================
const TOPOLOGI = {
  BOGOR: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'JAY', nama: 'Jayakarta' }, { id: 'MGB', nama: 'Mangga Besar' }, { id: 'SW', nama: 'Sawah Besar' }, { id: 'JUA', nama: 'Juanda' }, { id: 'GMR', nama: 'Gambir' }, { id: 'GDD', nama: 'Gondangdia' }, { id: 'CKI', nama: 'Cikini' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'TEB', nama: 'Tebet' }, { id: 'CW', nama: 'Cawang' }, { id: 'DRN', nama: 'Duren Kalibata' }, { id: 'PSMB', nama: 'Ps. Minggu Baru' }, { id: 'PSM', nama: 'Pasar Minggu' }, { id: 'TNT', nama: 'Tanjung Barat' }, { id: 'LNA', nama: 'Lenteng Agung' }, { id: 'UP', nama: 'Univ. Pancasila' }, { id: 'UI', nama: 'Univ. Indonesia' }, { id: 'POC', nama: 'Pondok Cina' }, { id: 'DPB', nama: 'Depok Baru' }, { id: 'DP', nama: 'Depok' }, { id: 'CTA', nama: 'Citayam' }, { id: 'BJD', nama: 'Bojong Gede' }, { id: 'CLT', nama: 'Cilebut' }, { id: 'BOO', nama: 'Bogor' } ],
  NAMBO: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'JAY', nama: 'Jayakarta' }, { id: 'MGB', nama: 'Mangga Besar' }, { id: 'SW', nama: 'Sawah Besar' }, { id: 'JUA', nama: 'Juanda' }, { id: 'GMR', nama: 'Gambir' }, { id: 'GDD', nama: 'Gondangdia' }, { id: 'CKI', nama: 'Cikini' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'TEB', nama: 'Tebet' }, { id: 'CW', nama: 'Cawang' }, { id: 'DRN', nama: 'Duren Kalibata' }, { id: 'PSMB', nama: 'Ps. Minggu Baru' }, { id: 'PSM', nama: 'Pasar Minggu' }, { id: 'TNT', nama: 'Tanjung Barat' }, { id: 'LNA', nama: 'Lenteng Agung' }, { id: 'UP', nama: 'Univ. Pancasila' }, { id: 'UI', nama: 'Univ. Indonesia' }, { id: 'POC', nama: 'Pondok Cina' }, { id: 'DPB', nama: 'Depok Baru' }, { id: 'DP', nama: 'Depok' }, { id: 'CTA', nama: 'Citayam' }, { id: 'PDRG', nama: 'Pondok Rajeg' }, { id: 'CBN', nama: 'Cibinong' }, { id: 'NMO', nama: 'Nambo' } ],
  CIKARANG: [ { id: 'KPB', nama: 'Kampung Bandan' }, { id: 'AK', nama: 'Angke' }, { id: 'DU', nama: 'Duri' }, { id: 'THB', nama: 'Tanah Abang' }, { id: 'KAT', nama: 'Karet' }, { id: 'SUD', nama: 'Sudirman' }, { id: 'SUDB', nama: 'BNI City' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'MTR', nama: 'Matraman' }, { id: 'JNG', nama: 'Jatinegara' }, { id: 'POK', nama: 'Pondok Jati' }, { id: 'KMT', nama: 'Kramat' }, { id: 'GST', nama: 'Gang Sentiong' }, { id: 'PSE', nama: 'Pasar Senen' }, { id: 'KMO', nama: 'Kemayoran' }, { id: 'RJW', nama: 'Rajawali' }, { id: 'KLD', nama: 'Klender' }, { id: 'BUA', nama: 'Buaran' }, { id: 'KLDB', nama: 'Klender Baru' }, { id: 'CUK', nama: 'Cakung' }, { id: 'KRI', nama: 'Kranji' }, { id: 'BKS', nama: 'Bekasi' }, { id: 'BKST', nama: 'Bekasi Timur' }, { id: 'TB', nama: 'Tambun' }, { id: 'CIT', nama: 'Cibitung' }, { id: 'TLM', nama: 'Telaga Murni' }, { id: 'CKR', nama: 'Cikarang' } ],
  RANGKAS: [ { id: 'THB', nama: 'Tanah Abang' }, { id: 'PLM', nama: 'Palmerah' }, { id: 'KBY', nama: 'Kebayoran' }, { id: 'PDJ', nama: 'Pondok Ranji' }, { id: 'JMU', nama: 'Jurangmangu' }, { id: 'SDM', nama: 'Sudimara' }, { id: 'RU', nama: 'Rawa Buntu' }, { id: 'SRP', nama: 'Serpong' }, { id: 'CSK', nama: 'Cisauk' }, { id: 'CC', nama: 'Cicayur' }, { id: 'PRP', nama: 'Parung Panjang' }, { id: 'CJT', nama: 'Cilejit' }, { id: 'DAR', nama: 'Daru' }, { id: 'TEJ', nama: 'Tenjo' }, { id: 'TGS', nama: 'Tigaraksa' }, { id: 'CKY', nama: 'Cikoya' }, { id: 'CTR', nama: 'Citeras' }, { id: 'RK', nama: 'Rangkasbitung' } ],
  TANGERANG: [ { id: 'DU', nama: 'Duri' }, { id: 'GRG', nama: 'Grogol' }, { id: 'PSG', nama: 'Pesing' }, { id: 'TKO', nama: 'Taman Kota' }, { id: 'BOI', nama: 'Bojong Indah' }, { id: 'RW', nama: 'Rawa Buaya' }, { id: 'KDS', nama: 'Kalideres' }, { id: 'PI', nama: 'Poris' }, { id: 'BPR', nama: 'Batu Ceper' }, { id: 'THI', nama: 'Tanah Tinggi' }, { id: 'TNG', nama: 'Tangerang' } ],
  PRIOK: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'KPB', nama: 'Kampung Bandan' }, { id: 'RJW', nama: 'Rajawali' }, { id: 'AC', nama: 'Ancol' }, { id: 'TPK', nama: 'Tanjung Priok' } ]
};

// ==========================================
// 2. MATRIKS TRANSIT DEWA (ABSOLUTE TRUTH)
// Mendaftarkan cara menyeberang antar jalur
// ==========================================
const TRANSIT_MATRIX: Record<string, Record<string, string[]>> = {
  BOGOR: { CIKARANG: ['MRI'], RANGKAS: ['MRI', 'THB'], TANGERANG: ['MRI', 'DU'], PRIOK: ['JAKK'], NAMBO: ['CTA'] },
  NAMBO: { CIKARANG: ['MRI'], RANGKAS: ['MRI', 'THB'], TANGERANG: ['MRI', 'DU'], PRIOK: ['JAKK'], BOGOR: ['CTA'] },
  CIKARANG: { BOGOR: ['MRI'], NAMBO: ['MRI'], RANGKAS: ['THB'], TANGERANG: ['DU'], PRIOK: ['KPB'] },
  RANGKAS: { BOGOR: ['THB', 'MRI'], NAMBO: ['THB', 'MRI'], CIKARANG: ['THB'], TANGERANG: ['THB', 'DU'], PRIOK: ['THB', 'KPB'] },
  TANGERANG: { BOGOR: ['DU', 'MRI'], NAMBO: ['DU', 'MRI'], CIKARANG: ['DU'], RANGKAS: ['DU', 'THB'], PRIOK: ['DU', 'KPB'] },
  PRIOK: { BOGOR: ['JAKK'], NAMBO: ['JAKK'], CIKARANG: ['KPB'], RANGKAS: ['KPB', 'THB'], TANGERANG: ['KPB', 'DU'] }
};

// Utility
const getNomorKA = (k: any) => k['NOMOR KA'] || k['Kolom_1'] || k['NO'] || '-';
const getRelasiKA = (k: any) => k['RELASI'] || k['Kolom_2'] || k['RUTE'] || 'Lanjutan';
const timeToMins = (time: string) => { const [h,m] = time.split(':').map(Number); return (h * 60) + m; };
const minsToTime = (mins: number) => `${Math.floor(mins/60).toString().padStart(2,'0')}:${(mins%60).toString().padStart(2,'0')}`;

const getLinesForStation = (stId: string): string[] => {
  const lines: string[] = [];
  for (const [line, stations] of Object.entries(TOPOLOGI)) {
    if (stations.some(s => s.id === stId)) lines.push(line);
  }
  return lines;
};


// ==========================================
// 3. MAIN API ROUTE
// ==========================================
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  const wib = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));
  const isWeekend = wib.getDay() === 0 || wib.getDay() === 6;
  const menitGlobalSekarang = (wib.getUTCHours() * 60) + wib.getUTCMinutes();
  const strJamSekarang = `${wib.getUTCHours().toString().padStart(2, '0')}:${wib.getUTCMinutes().toString().padStart(2, '0')}`;

  if (action === 'station') {
    // ... (Kode Hack Stasiun Tetap Sama)
    const stasiunAsal = searchParams.get('stasiun') || 'DP';
    const keretaTersedia = jadwalData.filter((k: any) => k[stasiunAsal] && k[stasiunAsal] !== "Ls" && k[stasiunAsal] >= strJamSekarang);
    const hasil = keretaTersedia.map((k: any) => {
      const relasi = getRelasiKA(k);
      const isBatal = JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend;
      let selisih = timeToMins(k[stasiunAsal]) - menitGlobalSekarang;
      if (selisih < -1000) selisih += 1440; 
      let persen = 0, statusText = '';
      if (selisih <= 0) { persen = 100; statusText = 'Tiba!'; } else if (selisih >= 20) { persen = 5; statusText = `${selisih} mnt lagi`; } else { persen = 100 - ((selisih / 20) * 100); statusText = `Tiba dlm ${selisih} mnt`; }
      return { nomor: getNomorKA(k), relasi, waktu: k[stasiunAsal], isKosong: relasi.split('-')[0].toUpperCase() === stasiunAsal, isBatal, persen, statusText, selisihMenit: selisih };
    });
    hasil.sort((a: any, b: any) => a.waktu.localeCompare(b.waktu));
    return NextResponse.json({ data: hasil.slice(0, 6) });
  }

  // ==========================================
  // ACTION: TRANSIT CALCULATOR (AI ENGINE)
  // ==========================================
  if (action === 'transit') {
    const stAsal = searchParams.get('asal') || 'DP';
    const stTujuan = searchParams.get('tujuan') || 'SDM';

    // 1. ENGINE PENCARI KERETA (Bebas Batasan Jalur)
    const cariSegmenKereta = (asal: string, tujuan: string, minMenit: number) => {
      let terbaik = null, waktuTercepat = 9999, waktuTibaTujuan = '';

      for (let k of jadwalData) {
        if (JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend) continue;
        if (!k[asal] || k[asal] === 'Ls' || !k[tujuan] || k[tujuan] === 'Ls') continue;
  
        let wA = timeToMins(k[asal]); let wT = timeToMins(k[tujuan]);
        if (wA < 180) wA += 1440; if (wT < 180) wT += 1440;
  
        if (wA < minMenit) continue; // Kereta sudah lewat

        let durasi = wT - wA;
        if (durasi < 0) { durasi += 1440; wT += 1440; } // Lintas malam
        if (durasi > 180) continue; // Durasi tidak logis (> 3 Jam)
        
        // Asal waktu berangkat lebih besar dan durasi masuk akal, AMBIL!
        if (wA < waktuTercepat) {
          waktuTercepat = wA; terbaik = k; waktuTibaTujuan = minsToTime(wT > 1440 ? wT - 1440 : wT);
        }
      }
      return terbaik ? { kereta: terbaik, waktuBerangkat: k[asal], waktuTiba: waktuTibaTujuan, minMntTiba: waktuTercepat + (timeToMins(waktuTibaTujuan) - timeToMins(terbaik[asal])) } : null;
    };

    // 2. SELF-HEALING FINDER (Mengatasi PDF Terputus di Cikarang Line)
    const findRutePintar = (asal: string, tujuan: string, wktStart: number, lineId: string) => {
        // Coba cari langsung dulu
        let ruteLangsung = cariSegmenKereta(asal, tujuan, wktStart);
        if (ruteLangsung) return [ruteLangsung];

        // Jika Gagal (Data putus di PDF), pecah rutenya via Hub Bantuan!
        if (lineId === 'CIKARANG') {
            const hubsBantuan = ['THB', 'JNG', 'MRI', 'KPB'];
            for (let hub of hubsBantuan) {
                if (hub === asal || hub === tujuan) continue;
                let leg1 = cariSegmenKereta(asal, hub, wktStart);
                if (leg1) {
                    let wktLanjut = timeToMins(leg1.waktuTiba) + 3; // 3 menit transit
                    let leg2 = cariSegmenKereta(hub, tujuan, wktLanjut);
                    if (leg2) return [leg1, leg2];
                }
            }
        }
        return null; // Buntu total
    };

    // 3. TENTUKAN RUTE HUB TERCEPAT
    const linesAsal = getLinesForStation(stAsal);
    const linesTujuan = getLinesForStation(stTujuan);
    
    let bestPlan = null;
    let fewestTransits = 99;

    // Coba semua kombinasi jalur asal & tujuan
    for (let lA of linesAsal) {
      for (let lT of linesTujuan) {
        let planNodes = [];
        if (lA !== lT) {
           planNodes = TRANSIT_MATRIX[lA]?.[lT] || [];
        }
        if (planNodes.length <= fewestTransits) {
           fewestTransits = planNodes.length;
           bestPlan = { lineA: lA, lineT: lT, nodes: planNodes };
        }
      }
    }

    if (!bestPlan) return NextResponse.json({ data: [] });

    // 4. EKSEKUSI PENCARIAN RUTE
    let wktBerangkat = menitGlobalSekarang;
    let stasiunSekarang = stAsal;
    let hasilRuteUI: any[] = [];
    let ruteValid = true;

    const titikPerjalanan = [...bestPlan.nodes, stTujuan];
    
    for (let i = 0; i < titikPerjalanan.length; i++) {
        const tujuanLeg = titikPerjalanan[i];
        const currentLine = i === 0 ? bestPlan.lineA : bestPlan.lineT; // Simplifikasi UI Line

        // Cari menggunakan mesin Self-Healing
        const segments = findRutePintar(stasiunSekarang, tujuanLeg, wktBerangkat, currentLine);

        if (!segments) { ruteValid = false; break; }

        // Masukkan semua segmen ke UI
        for (let j = 0; j < segments.length; j++) {
            const seg = segments[j];
            
            hasilRuteUI.push({ 
              tipe: 'naik', stasiun: stasiunSekarang, wkt: seg.waktuBerangkat, 
              ka: getNomorKA(seg.kereta), line: currentLine 
            });
            
            const isTibaAkhir = (i === titikPerjalanan.length - 1) && (j === segments.length - 1);
            
            hasilRuteUI.push({ 
              tipe: isTibaAkhir ? 'turun' : 'transit', 
              stasiun: j === segments.length - 1 ? tujuanLeg : 'Transit Sementara', // Stasiun bantuan
              wkt: seg.waktuTiba, 
              line: isTibaAkhir ? currentLine : 'Pindah Peron' 
            });

            wktBerangkat = timeToMins(seg.waktuTiba) + 5; 
            stasiunSekarang = j === segments.length - 1 ? tujuanLeg : 'Hub'; // Move forward
        }
    }

    if(stAsal === stTujuan) ruteValid = false; 
    return NextResponse.json({ data: ruteValid ? hasilRuteUI : [] });
  }

  return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
}