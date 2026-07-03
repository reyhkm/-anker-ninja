import { NextResponse } from 'next/server';
// @ts-ignore
import jadwalData from '../../../data/jadwal_krl_full.json';

// --- DATA TOPOLOGI & MATRIX (DI BACKEND) ---
const TOPOLOGI = {
  BOGOR: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'JAY', y: 4, nama: 'Jayakarta' }, { id: 'MGB', y: 8, nama: 'Mangga Besar' }, { id: 'SW', y: 12, nama: 'Sawah Besar' }, { id: 'JUA', y: 16, nama: 'Juanda' }, { id: 'GMR', y: 20, nama: 'Gambir' }, { id: 'GDD', y: 24, nama: 'Gondangdia' }, { id: 'CKI', y: 28, nama: 'Cikini' }, { id: 'MRI', y: 32, nama: 'Manggarai' }, { id: 'TEB', y: 36, nama: 'Tebet' }, { id: 'CW', y: 40, nama: 'Cawang' }, { id: 'DRN', y: 44, nama: 'Duren Kalibata' }, { id: 'PSMB', y: 48, nama: 'Ps. Minggu Baru' }, { id: 'PSM', y: 52, nama: 'Pasar Minggu' }, { id: 'TNT', y: 56, nama: 'Tanjung Barat' }, { id: 'LNA', y: 60, nama: 'Lenteng Agung' }, { id: 'UP', y: 64, nama: 'Univ. Pancasila' }, { id: 'UI', y: 68, nama: 'Univ. Indonesia' }, { id: 'POC', y: 72, nama: 'Pondok Cina' }, { id: 'DPB', y: 76, nama: 'Depok Baru' }, { id: 'DP', y: 80, nama: 'Depok' }, { id: 'CTA', y: 85, nama: 'Citayam' }, { id: 'BJD', y: 90, nama: 'Bojong Gede' }, { id: 'CLT', y: 95, nama: 'Cilebut' }, { id: 'BOO', y: 100, nama: 'Bogor' } ],
  NAMBO: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'JAY', y: 4, nama: 'Jayakarta' }, { id: 'MGB', y: 8, nama: 'Mangga Besar' }, { id: 'SW', y: 12, nama: 'Sawah Besar' }, { id: 'JUA', y: 16, nama: 'Juanda' }, { id: 'GMR', y: 20, nama: 'Gambir' }, { id: 'GDD', y: 24, nama: 'Gondangdia' }, { id: 'CKI', y: 28, nama: 'Cikini' }, { id: 'MRI', y: 32, nama: 'Manggarai' }, { id: 'TEB', y: 36, nama: 'Tebet' }, { id: 'CW', y: 40, nama: 'Cawang' }, { id: 'DRN', y: 44, nama: 'Duren Kalibata' }, { id: 'PSMB', y: 48, nama: 'Ps. Minggu Baru' }, { id: 'PSM', y: 52, nama: 'Pasar Minggu' }, { id: 'TNT', y: 56, nama: 'Tanjung Barat' }, { id: 'LNA', y: 60, nama: 'Lenteng Agung' }, { id: 'UP', y: 64, nama: 'Univ. Pancasila' }, { id: 'UI', y: 68, nama: 'Univ. Indonesia' }, { id: 'POC', y: 72, nama: 'Pondok Cina' }, { id: 'DPB', y: 76, nama: 'Depok Baru' }, { id: 'DP', y: 80, nama: 'Depok' }, { id: 'CTA', y: 85, nama: 'Citayam' }, { id: 'PDRG', y: 90, nama: 'Pondok Rajeg' }, { id: 'CBN', y: 95, nama: 'Cibinong' }, { id: 'NMO', y: 100, nama: 'Nambo' } ],
  CIKARANG: [ { id: 'KPB', y: 0, nama: 'Kampung Bandan' }, { id: 'AK', y: 5, nama: 'Angke' }, { id: 'DU', y: 10, nama: 'Duri' }, { id: 'THB', y: 15, nama: 'Tanah Abang' }, { id: 'KAT', y: 20, nama: 'Karet' }, { id: 'SUD', y: 25, nama: 'Sudirman' }, { id: 'SUDB', y: 28, nama: 'BNI City' }, { id: 'MRI', y: 35, nama: 'Manggarai' }, { id: 'MTR', y: 40, nama: 'Matraman' }, { id: 'JNG', y: 45, nama: 'Jatinegara' }, { id: 'KLD', y: 50, nama: 'Klender' }, { id: 'BUA', y: 55, nama: 'Buaran' }, { id: 'KLDB', y: 60, nama: 'Klender Baru' }, { id: 'CUK', y: 65, nama: 'Cakung' }, { id: 'KRI', y: 70, nama: 'Kranji' }, { id: 'BKS', y: 75, nama: 'Bekasi' }, { id: 'BKST', y: 80, nama: 'Bekasi Timur' }, { id: 'TB', y: 85, nama: 'Tambun' }, { id: 'CIT', y: 90, nama: 'Cibitung' }, { id: 'TLM', y: 95, nama: 'Telaga Murni' }, { id: 'CKR', y: 100, nama: 'Cikarang' } ],
  RANGKAS: [ { id: 'THB', y: 0, nama: 'Tanah Abang' }, { id: 'PLM', y: 7, nama: 'Palmerah' }, { id: 'KBY', y: 14, nama: 'Kebayoran' }, { id: 'PDJ', y: 21, nama: 'Pondok Ranji' }, { id: 'JMU', y: 28, nama: 'Jurangmangu' }, { id: 'SDM', y: 35, nama: 'Sudimara' }, { id: 'RU', y: 42, nama: 'Rawa Buntu' }, { id: 'SRP', y: 49, nama: 'Serpong' }, { id: 'CSK', y: 56, nama: 'Cisauk' }, { id: 'CC', y: 63, nama: 'Cicayur' }, { id: 'PRP', y: 70, nama: 'Parung Panjang' }, { id: 'CJT', y: 76, nama: 'Cilejit' }, { id: 'DAR', y: 82, nama: 'Daru' }, { id: 'TEJ', y: 88, nama: 'Tenjo' }, { id: 'TGS', y: 92, nama: 'Tigaraksa' }, { id: 'CKY', y: 94, nama: 'Cikoya' }, { id: 'CTR', y: 97, nama: 'Citeras' }, { id: 'RK', y: 100, nama: 'Rangkasbitung' } ],
  TANGERANG: [ { id: 'DU', y: 0, nama: 'Duri' }, { id: 'GRG', y: 10, nama: 'Grogol' }, { id: 'PSG', y: 20, nama: 'Pesing' }, { id: 'TKO', y: 30, nama: 'Taman Kota' }, { id: 'BOI', y: 40, nama: 'Bojong Indah' }, { id: 'RW', y: 50, nama: 'Rawa Buaya' }, { id: 'KDS', y: 60, nama: 'Kalideres' }, { id: 'PI', y: 70, nama: 'Poris' }, { id: 'BPR', y: 80, nama: 'Batu Ceper' }, { id: 'THI', y: 90, nama: 'Tanah Tinggi' }, { id: 'TNG', y: 100, nama: 'Tangerang' } ],
  PRIOK: [ { id: 'JAKK', y: 0, nama: 'Jakarta Kota' }, { id: 'KPB', y: 25, nama: 'Kampung Bandan' }, { id: 'RJW', y: 50, nama: 'Rajawali' }, { id: 'AC', y: 75, nama: 'Ancol' }, { id: 'TPK', y: 100, nama: 'Tanjung Priok' } ]
};

const getTransitNodes = (lineA: string, lineB: string) => {
  const lA = lineA === 'NAMBO' ? 'BOGOR' : lineA; const lB = lineB === 'NAMBO' ? 'BOGOR' : lineB;
  if (lA === lB) return (lineA === 'NAMBO' && lineB === 'BOGOR') || (lineA === 'BOGOR' && lineB === 'NAMBO') ? ['CTA'] : [];
  if (lA === 'BOGOR' && lB === 'CIKARANG') return ['MRI']; if (lA === 'BOGOR' && lB === 'RANGKAS') return ['MRI', 'THB']; if (lA === 'BOGOR' && lB === 'TANGERANG') return ['MRI', 'DU']; if (lA === 'BOGOR' && lB === 'PRIOK') return ['JAKK'];
  if (lA === 'CIKARANG' && lB === 'BOGOR') return ['MRI']; if (lA === 'CIKARANG' && lB === 'RANGKAS') return ['THB']; if (lA === 'CIKARANG' && lB === 'TANGERANG') return ['DU']; if (lA === 'CIKARANG' && lB === 'PRIOK') return ['KPB'];
  if (lA === 'RANGKAS' && lB === 'BOGOR') return ['THB', 'MRI']; if (lA === 'RANGKAS' && lB === 'CIKARANG') return ['THB']; if (lA === 'RANGKAS' && lB === 'TANGERANG') return ['THB', 'DU']; if (lA === 'RANGKAS' && lB === 'PRIOK') return ['THB', 'KPB'];
  if (lA === 'TANGERANG' && lB === 'BOGOR') return ['DU', 'MRI']; if (lA === 'TANGERANG' && lB === 'CIKARANG') return ['DU']; if (lA === 'TANGERANG' && lB === 'RANGKAS') return ['DU', 'THB']; if (lA === 'TANGERANG' && lB === 'PRIOK') return ['DU', 'KPB'];
  if (lA === 'PRIOK' && lB === 'BOGOR') return ['JAKK']; if (lA === 'PRIOK' && lB === 'CIKARANG') return ['KPB']; if (lA === 'PRIOK' && lB === 'RANGKAS') return ['KPB', 'THB']; if (lA === 'PRIOK' && lB === 'TANGERANG') return ['KPB', 'DU'];
  return [];
};

// Utilities
const getNomorKA = (k: any) => k['NOMOR KA'] || k['Kolom_1'] || k['NO'] || '-';
const getRelasiKA = (k: any) => k['RELASI'] || k['Kolom_2'] || k['RUTE'] || 'Tpk-Line';
const timeToMins = (time: string) => { const [h,m] = time.split(':').map(Number); return (h * 60) + m; };
const getLineByStation = (stId: string) => {
  if (['PDRG', 'CBN', 'NMO'].includes(stId)) return 'NAMBO';
  return Object.keys(TOPOLOGI).find(key => TOPOLOGI[key as keyof typeof TOPOLOGI].some(s => s.id === stId)) || 'BOGOR';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  // Waktu WIB Server Vercel
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
    
    const keretaTersedia = jadwalData.filter((k: any) => {
      const wkt = k[stasiunAsal];
      return wkt && wkt !== "Ls" && wkt >= strJamSekarang;
    });

    const hasil = keretaTersedia.map((k: any) => {
      const relasi = getRelasiKA(k);
      const stAwal = relasi !== '-' ? relasi.split('-')[0].toUpperCase() : '';
      const isBatal = JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend;
      const waktuTiba = k[stasiunAsal];

      // Kalkulasi Persentase Radar di Backend
      let selisih = timeToMins(waktuTiba) - menitGlobalSekarang;
      if (selisih < -1000) selisih += 1440; 
      let persen = 0, statusText = '';
      if (selisih <= 0) { persen = 100; statusText = 'Tiba!'; } 
      else if (selisih >= 20) { persen = 5; statusText = `${selisih} mnt lagi`; } 
      else { persen = 100 - ((selisih / 20) * 100); statusText = `Tiba dlm ${selisih} mnt`; }

      return { 
        nomor: getNomorKA(k), relasi, waktu: waktuTiba, 
        isKosong: (stAwal === stasiunAsal || (stAwal === 'DP' && stasiunAsal === 'DP')), 
        isBatal, persen, statusText, selisihMenit: selisih
      };
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
  // ACTION 3: TRANSIT CALCULATOR
  // ==========================================
  if (action === 'transit') {
    const stAsal = searchParams.get('asal') || 'DP';
    const stTujuan = searchParams.get('tujuan') || 'SDM';
    
    const cariKeretaSelanjutnya = (asal: string, tujuan: string, minMenit: number) => {
      let keretaDitemukan = null, waktuTercepat = 9999, waktuTibaTujuan = '';
      for (let k of jadwalData) {
        if (JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend) continue;
        if (!k[asal] || k[asal] === 'Ls' || !k[tujuan] || k[tujuan] === 'Ls') continue;
  
        let wAsal = timeToMins(k[asal]); let wTujuan = timeToMins(k[tujuan]);
        if (wAsal < 180) wAsal += 1440; if (wTujuan < 180) wTujuan += 1440;
  
        if (wAsal >= minMenit && wAsal < wTujuan && wAsal < waktuTercepat) {
          waktuTercepat = wAsal; keretaDitemukan = k; waktuTibaTujuan = k[tujuan];
        }
      }
      return { kereta: keretaDitemukan, strTiba: waktuTibaTujuan };
    };

    const lineAsal = getLineByStation(stAsal);
    const lineTujuan = getLineByStation(stTujuan);
    const nodes = getTransitNodes(lineAsal, lineTujuan); 
    
    let wktBerangkat = menitGlobalSekarang;
    let stasiunSekarang = stAsal;
    let rute: any[] = [];
    const titikPerjalanan = [...nodes, stTujuan];
    let ruteValid = true;

    for (let i = 0; i < titikPerjalanan.length; i++) {
        const tujuanLeg = titikPerjalanan[i];
        const leg = cariKeretaSelanjutnya(stasiunSekarang, tujuanLeg, wktBerangkat);

        if (!leg.kereta) { ruteValid = false; break; }

        rute.push({ tipe: 'naik', stasiun: stasiunSekarang, wkt: leg.kereta[stasiunSekarang], ka: getNomorKA(leg.kereta), line: i === 0 ? lineAsal : 'LANJUTAN' });
        const isAkhir = i === titikPerjalanan.length - 1;
        rute.push({ tipe: isAkhir ? 'turun' : 'transit', stasiun: tujuanLeg, wkt: leg.strTiba, line: isAkhir ? lineTujuan : 'Pindah Peron' });

        wktBerangkat = timeToMins(leg.strTiba) + 5; 
        stasiunSekarang = tujuanLeg;
    }

    if(stAsal === stTujuan) ruteValid = false; 
    return NextResponse.json({ data: ruteValid ? rute : [] });
  }

  return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
}