import { NextResponse } from 'next/server';
// @ts-ignore
import jadwalData from '../../../data/jadwal_krl_full.json';

const TOPOLOGI = {
  BOGOR: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'JAY', nama: 'Jayakarta' }, { id: 'MGB', nama: 'Mangga Besar' }, { id: 'SW', nama: 'Sawah Besar' }, { id: 'JUA', nama: 'Juanda' }, { id: 'GMR', nama: 'Gambir' }, { id: 'GDD', nama: 'Gondangdia' }, { id: 'CKI', nama: 'Cikini' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'TEB', nama: 'Tebet' }, { id: 'CW', nama: 'Cawang' }, { id: 'DRN', nama: 'Duren Kalibata' }, { id: 'PSMB', nama: 'Ps. Minggu Baru' }, { id: 'PSM', nama: 'Pasar Minggu' }, { id: 'TNT', nama: 'Tanjung Barat' }, { id: 'LNA', nama: 'Lenteng Agung' }, { id: 'UP', nama: 'Univ. Pancasila' }, { id: 'UI', nama: 'Univ. Indonesia' }, { id: 'POC', nama: 'Pondok Cina' }, { id: 'DPB', nama: 'Depok Baru' }, { id: 'DP', nama: 'Depok' }, { id: 'CTA', nama: 'Citayam' }, { id: 'BJD', nama: 'Bojong Gede' }, { id: 'CLT', nama: 'Cilebut' }, { id: 'BOO', nama: 'Bogor' } ],
  NAMBO: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'JAY', nama: 'Jayakarta' }, { id: 'MGB', nama: 'Mangga Besar' }, { id: 'SW', nama: 'Sawah Besar' }, { id: 'JUA', nama: 'Juanda' }, { id: 'GMR', nama: 'Gambir' }, { id: 'GDD', nama: 'Gondangdia' }, { id: 'CKI', nama: 'Cikini' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'TEB', nama: 'Tebet' }, { id: 'CW', nama: 'Cawang' }, { id: 'DRN', nama: 'Duren Kalibata' }, { id: 'PSMB', nama: 'Ps. Minggu Baru' }, { id: 'PSM', nama: 'Pasar Minggu' }, { id: 'TNT', nama: 'Tanjung Barat' }, { id: 'LNA', nama: 'Lenteng Agung' }, { id: 'UP', nama: 'Univ. Pancasila' }, { id: 'UI', nama: 'Univ. Indonesia' }, { id: 'POC', nama: 'Pondok Cina' }, { id: 'DPB', nama: 'Depok Baru' }, { id: 'DP', nama: 'Depok' }, { id: 'CTA', nama: 'Citayam' }, { id: 'PDRG', nama: 'Pondok Rajeg' }, { id: 'CBN', nama: 'Cibinong' }, { id: 'NMO', nama: 'Nambo' } ],
  CIKARANG: [ { id: 'KPB', nama: 'Kampung Bandan' }, { id: 'AK', nama: 'Angke' }, { id: 'DU', nama: 'Duri' }, { id: 'THB', nama: 'Tanah Abang' }, { id: 'KAT', nama: 'Karet' }, { id: 'SUD', nama: 'Sudirman' }, { id: 'SUDB', nama: 'BNI City' }, { id: 'MRI', nama: 'Manggarai' }, { id: 'MTR', nama: 'Matraman' }, { id: 'JNG', nama: 'Jatinegara' }, { id: 'POK', nama: 'Pondok Jati' }, { id: 'KMT', nama: 'Kramat' }, { id: 'GST', nama: 'Gang Sentiong' }, { id: 'PSE', nama: 'Pasar Senen' }, { id: 'KMO', nama: 'Kemayoran' }, { id: 'RJW', nama: 'Rajawali' }, { id: 'KLD', nama: 'Klender' }, { id: 'BUA', nama: 'Buaran' }, { id: 'KLDB', nama: 'Klender Baru' }, { id: 'CUK', nama: 'Cakung' }, { id: 'KRI', nama: 'Kranji' }, { id: 'BKS', nama: 'Bekasi' }, { id: 'BKST', nama: 'Bekasi Timur' }, { id: 'TB', nama: 'Tambun' }, { id: 'CIT', nama: 'Cibitung' }, { id: 'TLM', nama: 'Telaga Murni' }, { id: 'CKR', nama: 'Cikarang' } ],
  RANGKAS: [ { id: 'THB', nama: 'Tanah Abang' }, { id: 'PLM', nama: 'Palmerah' }, { id: 'KBY', nama: 'Kebayoran' }, { id: 'PDJ', nama: 'Pondok Ranji' }, { id: 'JMU', nama: 'Jurangmangu' }, { id: 'SDM', nama: 'Sudimara' }, { id: 'RU', nama: 'Rawa Buntu' }, { id: 'SRP', nama: 'Serpong' }, { id: 'CSK', nama: 'Cisauk' }, { id: 'CC', nama: 'Cicayur' }, { id: 'PRP', nama: 'Parung Panjang' }, { id: 'CJT', nama: 'Cilejit' }, { id: 'DAR', nama: 'Daru' }, { id: 'TEJ', nama: 'Tenjo' }, { id: 'TGS', nama: 'Tigaraksa' }, { id: 'CKY', nama: 'Cikoya' }, { id: 'CTR', nama: 'Citeras' }, { id: 'RK', nama: 'Rangkasbitung' } ],
  TANGERANG: [ { id: 'DU', nama: 'Duri' }, { id: 'GRG', nama: 'Grogol' }, { id: 'PSG', nama: 'Pesing' }, { id: 'TKO', nama: 'Taman Kota' }, { id: 'BOI', nama: 'Bojong Indah' }, { id: 'RW', nama: 'Rawa Buaya' }, { id: 'KDS', nama: 'Kalideres' }, { id: 'PI', nama: 'Poris' }, { id: 'BPR', nama: 'Batu Ceper' }, { id: 'THI', nama: 'Tanah Tinggi' }, { id: 'TNG', nama: 'Tangerang' } ],
  PRIOK: [ { id: 'JAKK', nama: 'Jakarta Kota' }, { id: 'KPB', nama: 'Kampung Bandan' }, { id: 'RJW', nama: 'Rajawali' }, { id: 'AC', nama: 'Ancol' }, { id: 'TPK', nama: 'Tanjung Priok' } ]
};

// --- CORE UTILITIES ---
const getNomorKA = (k: any) => k['NOMOR KA'] || k['NO'] || '-';
const getRelasiKA = (k: any) => k['RELASI'] || k['RUTE'] || 'Lanjutan';
const timeToMins = (time: string) => { const [h,m] = time.split(':').map(Number); return (h * 60) + m; };
const minsToTime = (mins: number) => `${Math.floor(mins/60).toString().padStart(2,'0')}:${(mins%60).toString().padStart(2,'0')}`;

const getLineByStation = (stId: string) => {
  if (['PDRG', 'CBN', 'NMO'].includes(stId)) return 'NAMBO';
  return Object.keys(TOPOLOGI).find(key => TOPOLOGI[key as keyof typeof TOPOLOGI].some(s => s.id === stId)) || 'BOGOR';
};

// ==========================================================
// 💡 THE GRAPH ENGINE (Penemu Rute Paling Masuk Akal)
// ==========================================================
const findHubPath = (stAsal: string, stTujuan: string) => {
  // Stasiun Transit Utama Jabodetabek
  const HUBS = ['MRI', 'THB', 'KPB', 'DU', 'JAKK', 'JNG', 'CTA'];
  
  // Jika 1 Jalur
  const lineA = getLineByStation(stAsal);
  const lineT = getLineByStation(stTujuan);
  if (lineA === lineT) return { hubs: [] };

  // Cari 1 Transit
  for (let hub of HUBS) {
    if (hub === stAsal || hub === stTujuan) continue;
    // Cek apakah ada KERETA NYATA yang nyambung Asal -> Hub dan Hub -> Tujuan
    const cek1 = jadwalData.find((k:any) => k[stAsal] && k[hub] && k[stAsal] !== 'Ls' && k[hub] !== 'Ls');
    const cek2 = jadwalData.find((k:any) => k[hub] && k[stTujuan] && k[hub] !== 'Ls' && k[stTujuan] !== 'Ls');
    if (cek1 && cek2) return { hubs: [hub] };
  }

  // Cari 2 Transit
  for (let hub1 of HUBS) {
    for (let hub2 of HUBS) {
      if (hub1 === hub2 || hub1 === stAsal || hub2 === stTujuan) continue;
      const cek1 = jadwalData.find((k:any) => k[stAsal] && k[hub1] && k[stAsal] !== 'Ls' && k[hub1] !== 'Ls');
      const cek2 = jadwalData.find((k:any) => k[hub1] && k[hub2] && k[hub1] !== 'Ls' && k[hub2] !== 'Ls');
      const cek3 = jadwalData.find((k:any) => k[hub2] && k[stTujuan] && k[hub2] !== 'Ls' && k[stTujuan] !== 'Ls');
      
      if (cek1 && cek2 && cek3) return { hubs: [hub1, hub2] };
    }
  }

  return { hubs: null }; // Benar-benar Buntu
};


// ==========================================================
// MAIN API ENDPOINT
// ==========================================================
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  const wib = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));
  const isWeekend = wib.getDay() === 0 || wib.getDay() === 6;
  const menitGlobalSekarang = (wib.getUTCHours() * 60) + wib.getUTCMinutes();
  const strJamSekarang = `${wib.getUTCHours().toString().padStart(2, '0')}:${wib.getUTCMinutes().toString().padStart(2, '0')}`;

  // 1. STATION RADAR
  if (action === 'station') {
    const stAsal = searchParams.get('stasiun') || 'DP';
    const keretaTersedia = jadwalData.filter((k: any) => k[stAsal] && k[stAsal] !== "Ls" && k[stAsal] >= strJamSekarang);
    const hasil = keretaTersedia.map((k: any) => {
      const relasi = getRelasiKA(k);
      const isBatal = JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend;
      let selisih = timeToMins(k[stAsal]) - menitGlobalSekarang;
      if (selisih < -1000) selisih += 1440; 
      let persen = 0, statusText = '';
      if (selisih <= 0) { persen = 100; statusText = 'Tiba!'; } else if (selisih >= 20) { persen = 5; statusText = `${selisih} mnt lagi`; } else { persen = 100 - ((selisih / 20) * 100); statusText = `Tiba dlm ${selisih} mnt`; }
      return { nomor: getNomorKA(k), relasi, waktu: k[stAsal], isKosong: relasi.split('-')[0].toUpperCase() === stAsal, isBatal, persen, statusText, selisihMenit: selisih };
    });
    hasil.sort((a: any, b: any) => a.waktu.localeCompare(b.waktu));
    return NextResponse.json({ data: hasil.slice(0, 6) });
  }

  // 2. NETWORK MAP
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

  // 3. TRANSIT ENGINE
  if (action === 'transit') {
    const stAsal = searchParams.get('asal') || 'DP';
    const stTujuan = searchParams.get('tujuan') || 'SDM';

    const cariKeretaSegmen = (asal: string, tujuan: string, minMnt: number) => {
        let bestKA = null, wktCepat = 9999, strTiba = '';
        for (let k of jadwalData) {
            if (JSON.stringify(k).toUpperCase().includes('BATAL') && isWeekend) continue;
            if (!k[asal] || k[asal] === 'Ls' || !k[tujuan] || k[tujuan] === 'Ls') continue;
            
            let wA = timeToMins(k[asal]); let wT = timeToMins(k[tujuan]);
            if (wA < 180) wA += 1440; if (wT < 180) wT += 1440;
            
            if (wA < minMnt) continue;
            
            let dur = wT - wA;
            if (dur < 0) { dur += 1440; wT += 1440; }
            if (dur > 240) continue; // Skip if > 4 Hours travel time (To handle Cikarang Loop)

            if (wA < wktCepat) {
                wktCepat = wA; bestKA = k; strTiba = minsToTime(wT > 1440 ? wT - 1440 : wT);
            }
        }
        return { kereta: bestKA, strTiba };
    };

    // Cari Pathing Graph
    const path = findHubPath(stAsal, stTujuan);
    if (!path.hubs) return NextResponse.json({ data: [] });

    const tripNodes = [...path.hubs, stTujuan];
    let currTime = menitGlobalSekarang;
    let currSt = stAsal;
    let resultUI = [];
    let isSuccess = true;

    for (let i = 0; i < tripNodes.length; i++) {
        const destSt = tripNodes[i];
        const leg = cariKeretaSegmen(currSt, destSt, currTime);

        if (!leg.kereta) { isSuccess = false; break; }

        resultUI.push({
            tipe: 'naik', stasiun: currSt, wkt: leg.kereta[currSt], ka: getNomorKA(leg.kereta),
            line: getLineByStation(destSt)
        });

        const isLast = i === tripNodes.length - 1;
        resultUI.push({
            tipe: isLast ? 'turun' : 'transit', stasiun: destSt, wkt: leg.strTiba,
            line: isLast ? getLineByStation(destSt) : 'Pindah Jalur'
        });

        currTime = timeToMins(leg.strTiba) + 3; // 3 Min buffer for running
        currSt = destSt;
    }

    if (stAsal === stTujuan) isSuccess = false;
    return NextResponse.json({ data: isSuccess ? resultUI : [] });
  }

  return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
}