// assets/js/print.js

function handlePrintReport() {
    const year = document.getElementById('filter-year').value;
    const month = document.getElementById('filter-month').value;

    const isViews = window.location.pathname.includes('/views/');
    const uploadsPath = isViews ? '../uploads/' : 'uploads/';
    
    const logoKabUrl = new URL(uploadsPath + 'logokab-minahasa.png', window.location.href).href;
    const logoBpbdUrl = new URL(uploadsPath + 'logobpbd-minahasa.png', window.location.href).href;

    let filterValue = year;
    if (month) filterValue += '-' + month;

    const filteredData = filterDataByMonth(allReportData, filterValue);
    const bencanaData = filteredData.filter(
        d => d.kategori_laporan === 'bencana' || !d.kategori_laporan
    );
    const rankedData = runSAW(bencanaData);

    let periodText = `Tahun ${year}`;
    if (month) {
        periodText = `Bulan ${getIndonesianMonthName(parseInt(month) - 1)} ${year}`;
    }

    const today = new Date();
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const reportDate = `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

    let tableRows = '';

    if (rankedData.length === 0) {
        tableRows = `
            <tr>
                <td colspan="10" style="padding: 20px; text-align: center;">
                    Tidak ada data laporan untuk periode ini.
                </td>
            </tr>
        `;
    } else {
        rankedData.forEach((item, index) => {
            let photoCell = `
                <div style="font-size: 10px; color: #666;">
                    Tidak ada foto
                </div>
            `;

            if (item.photos && item.photos.length > 0) {
                const imageUrl = new URL(
                    item.photos[0].file_path,
                    window.location.href
                ).href;

                photoCell = `
                    <img 
                        src="${imageUrl}" 
                        alt="Foto Bencana"
                        style="width: 100px; height: 70px; object-fit: cover;"
                    >
                `;
            }

            tableRows += `
                <tr style="page-break-inside: avoid;">
                    <td style="text-align: center;">${index + 1}</td>
                    <td>${item.jenisBencana}</td>
                    <td>${item.lokasi}</td>
                    <td style="text-align: left;">${item.keterangan || '-'}</td>
                    <td style="text-align: center;">${formatDate(item.disaster_date)}</td>
                    <td style="text-align: center;">${item.jiwaTerdampak}</td>
                    <td style="text-align: center;">${item.kkTerdampak}</td>
                    <td style="text-align: center;">${item.tingkatKerusakan}</td>
                    <td style="font-weight: bold; text-align: center;">
                        ${item.finalScore.toFixed(4)}
                    </td>
                    <td style="text-align: center;">
                        ${photoCell}
                    </td>
                </tr>
            `;
        });
    }

    const printContent = `
        <style>
            @page {
                size: A4 landscape;
                margin: 10mm; 
            }

            body {
                font-family: Arial, sans-serif;
                font-size: 11px;
                color: #000;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: auto;
            }

            th, td {
                border: 1px solid #000;
                padding: 4px;
                vertical-align: middle;
            }
            
            tr {
                page-break-inside: avoid;
                break-inside: avoid;
            }

            thead {
                display: table-header-group;
            }

            .header {
                margin-bottom: 15px;
            }

            .title {
                text-align: center;
                font-weight: bold;
                text-decoration: underline;
                margin: 10px 0 5px;
                font-size: 16px;
            }

            .periode {
                text-align: center;
                margin-bottom: 15px;
                font-size: 14px;
            }

            .signature-wrapper {
                margin-top: 20px; 
                display: flex;
                justify-content: flex-end;
                page-break-inside: avoid; 
                break-inside: avoid;
                width: 100%;
            }

            .signature {
                width: 300px;
                text-align: center;
                line-height: 1.3;
                font-size: 14px;
            }
        </style>

        <div class="header">
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <tr>
                    <td style="width: 80px; text-align: left; vertical-align: middle; border: none;">
                        <img
                            src="${logoKabUrl}" 
                            alt="Logo Kabupaten Minahasa"
                            style="width: 70px; height: auto;"
                        >
                    </td>

                    <td style="text-align: center; vertical-align: middle; border: none;">
                        <div style="font-size: 24px; font-weight: bold;">
                            PEMERINTAH KABUPATEN MINAHASA
                        </div>
                        <div style="font-size: 30px; font-weight: bold;">
                            BADAN PENANGGULANGAN BENCANA DAERAH
                        </div>
                        <div style="font-size: 12px; margin-top: 3px;">
                            Alamat: Kompleks Stadion Maesa Kelurahan Wewelen (Tondano)
                        </div>
                        <div style="font-size: 12px;">
                            Website: www.minahasa.go.id E-mail: pemkab.minahasa@minahasa.go.id
                        </div>
                    </td>

                    <td style="width: 80px; text-align: right; vertical-align: middle; border: none;">
                        <img
                            src="${logoBpbdUrl}" 
                            alt="Logo BPBD"
                            style="width: 70px; height: auto;"
                        >
                    </td>
                </tr>
            </table>

            <hr style="border: 1px solid #000; margin-top: 8px;">
        </div>

        <div class="title">
            LAPORAN REKAPITULASI DAN PRIORITAS DAMPAK BENCANA
        </div>

        <div class="periode">
            Periode: ${periodText}
        </div>

        <table>
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="width: 4%;">No</th>
                    <th style="width: 11%;">Jenis Bencana</th>
                    <th style="width: 14%;">Lokasi</th>
                    <th style="width: 16%;">Keterangan</th>
                    <th style="width: 9%;">Tanggal</th>
                    <th style="width: 6%;">Jiwa</th>
                    <th style="width: 6%;">KK</th>
                    <th style="width: 8%;">Kerusakan</th>
                    <th style="width: 8%;">Indeks</th>
                    <th style="width: 12%;">Foto</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <div class="signature-wrapper">
            <div class="signature">
                <div style="margin-bottom: 60px;">
                    Tondano, ${reportDate}<br><br>
                    Plt. Kepala Badan Penanggulangan Bencana<br>
                    Daerah Kabupaten Minahasa
                </div>
                <div style="font-weight: bold; text-decoration: underline;">SHANDRO A. MOGOT, SE, M.Si.</div>
                <div>Pembina Tkt. I, IV/b</div>
                <div>NIP. 19740808 200003 1 003</div>
            </div>
        </div>
    `;

    executePrint(printContent);
}

function handlePrintInsidenReport() {
    const year = document.getElementById('filter-year').value;
    const month = document.getElementById('filter-month').value;
    
    const isViews = window.location.pathname.includes('/views/');
    const uploadsPath = isViews ? '../uploads/' : 'uploads/';
    
    const logoKabUrl = new URL(uploadsPath + 'logokab-minahasa.png', window.location.href).href;
    const logoBpbdUrl = new URL(uploadsPath + 'logobpbd-minahasa.png', window.location.href).href;

    let filterValue = year;
    if (month) filterValue += '-' + month;

    const filteredData = filterDataByMonth(allReportData, filterValue);
    const insidenData = filteredData.filter(d => d.kategori_laporan === 'insiden');
    insidenData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    let periodText = `Tahun ${year}`;
    if (month) {
        periodText = `Bulan ${getIndonesianMonthName(parseInt(month) - 1)} ${year}`;
    }

    const today = new Date();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const reportDate = `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

    let tableRows = '';
    if (insidenData.length === 0) {
        tableRows = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Tidak ada data laporan insiden untuk periode ini.</td></tr>';
    } else {
        insidenData.forEach((item, index) => {
            let photoCell = '<div style="font-size: 10px; color: #666;">Tidak ada foto</div>';
            if (item.photos && item.photos.length > 0) {
                const imageUrl = new URL(item.photos[0].file_path, window.location.href).href;
                photoCell = `<img src="${imageUrl}" alt="Foto Insiden" style="width: 100px; height: 70px; object-fit: cover;">`;
            }
            tableRows += `
                <tr style="page-break-inside: avoid;">
                    <td style="text-align: left;">${item.jenisBencana}</td>
                    <td style="text-align: left;">${item.lokasi}</td>
                    <td style="text-align: left;">${item.keterangan || 'N/A'}</td>
                    <td style="text-align: center;">${formatDate(item.disaster_date)}</td>
                    <td style="text-align: center;">${photoCell}</td>
                </tr>`;
        });
    }

    const printContent = `
        <style>
            @page {
                size: A4 landscape; 
                margin: 10mm;
            }

            body {
                font-family: Arial, sans-serif;
                font-size: 11px;
                color: #000;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: auto;
            }

            th, td {
                border: 1px solid #000;
                padding: 4px;
                vertical-align: middle;
            }
            
            tr {
                page-break-inside: avoid;
                break-inside: avoid;
            }

            thead {
                display: table-header-group;
            }

            .header {
                margin-bottom: 15px;
            }

            .title {
                text-align: center;
                font-weight: bold;
                text-decoration: underline;
                margin: 10px 0 5px;
                font-size: 16px;
            }

            .periode {
                text-align: center;
                margin-bottom: 15px;
                font-size: 14px;
            }

            .signature-wrapper {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
                page-break-inside: avoid;
                break-inside: avoid;
                width: 100%;
            }

            .signature {
                width: 300px;
                text-align: center;
                line-height: 1.3;
                font-size: 14px;
            }
        </style>

        <div class="header">
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <tr>
                    <td style="width: 80px; text-align: left; vertical-align: middle; border: none;">
                        <img src="${logoKabUrl}" alt="Logo Kabupaten Minahasa" style="width: 70px; height: auto;">
                    </td>
                    <td style="text-align: center; vertical-align: middle; border: none;">
                        <div style="font-size: 24px; font-weight: bold;">
                            PEMERINTAH KABUPATEN MINAHASA
                        </div>
                        <div style="font-size: 30px; font-weight: bold;">
                            BADAN PENANGGULANGAN BENCANA DAERAH
                        </div>
                        <div style="font-size: 12px; margin-top: 3px;">
                            Alamat: Kompleks Stadion Maesa Kelurahan Wewelen (Tondano)
                        </div>
                        <div style="font-size: 12px;">
                            Website: www.minahasa.go.id E-mail: pemkab.minahasa@minahasa.go.id
                        </div>
                    </td>
                    <td style="width: 80px; text-align: right; vertical-align: middle; border: none;">
                        <img src="${logoBpbdUrl}" alt="Logo BPBD" style="width: 70px; height: auto;">
                    </td>
                </tr>
            </table>
            <hr style="border: 1px solid #000; margin-top: 8px;">
        </div>

        <div class="title">LAPORAN REKAPITULASI INSIDEN DARURAT</div>
        <div class="periode">Periode: ${periodText}</div>

        <table>
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="width: 20%;">Jenis Insiden</th>
                    <th style="width: 20%;">Lokasi</th>
                    <th style="width: 30%;">Keterangan</th>
                    <th style="width: 15%;">Tanggal</th>
                    <th style="width: 15%;">Dokumentasi</th>
                </tr>
            </thead>
            <tbody>${tableRows}</tbody>
        </table>

        <div class="signature-wrapper">
            <div class="signature">
                <div style="margin-bottom: 60px;">
                    Tondano, ${reportDate}<br><br>
                    Plt. Kepala Badan Penanggulangan Bencana<br>
                    Daerah Kabupaten Minahasa
                </div>
                <div style="font-weight: bold; text-decoration: underline;">SHANDRO A. MOGOT, SE, M.Si.</div>
                <div>Pembina Tkt. I, IV/b</div>
                <div>NIP. 19740808 200003 1 003</div>
            </div>
        </div>
    `;

    executePrint(printContent);
}

function handlePrintCumulativeReport() {
    const selectedYear = document.getElementById('filter-year').value;
    
    const isViews = window.location.pathname.includes('/views/');
    const uploadsPath = isViews ? '../uploads/' : 'uploads/';
    
    const logoKabUrl = new URL(uploadsPath + 'logokab-minahasa.png', window.location.href).href;
    const logoBpbdUrl = new URL(uploadsPath + 'logobpbd-minahasa.png', window.location.href).href;

    const yearlyData = allReportData.filter(item => {
        if (!item.disaster_date) return false;
        return item.disaster_date.startsWith(selectedYear);
    });

    const months = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    const disasterColumns = [
        { db: 'Angin Puting Beliung', label: 'ANGIN PUTTING<br>BELIUNG' },
        { db: 'Pohon Tumbang', label: 'POHON<br>TUMBANG' },
        { db: 'Tanah Longsor', label: 'LONGSOR' },
        { db: 'Kebakaran', label: 'KEBAKARAN' },
        { db: 'Kebakaran Hutan', label: 'KARHUTLAH' },
        { db: 'Orang Hilang', label: 'ORANG<br>HILANG' },
        { db: 'Banjir', label: 'BANJIR' },
        { db: 'Gempa Bumi', label: 'GEMPA BUMI' }
    ];
    
    const stats = {};
    months.forEach((m, index) => {
        stats[index] = { total: 0 };
        disasterColumns.forEach(col => { stats[index][col.db] = 0; });
    });
    
    const grandTotals = { total: 0 };
    disasterColumns.forEach(col => grandTotals[col.db] = 0);

    yearlyData.forEach(item => {
        const date = new Date(item.disaster_date);
        const monthIndex = date.getMonth();
        let dbType = item.jenisBencana;
        if (dbType === "Kebakaran Hutan (Karhutla)") dbType = "Kebakaran Hutan"; 
        
        const colExists = disasterColumns.find(col => col.db === dbType);
        if (colExists && stats[monthIndex]) {
            stats[monthIndex][dbType]++;
            stats[monthIndex].total++;
            grandTotals[dbType]++;
            grandTotals.total++;
        }
    });

    let tableRows = '';
    months.forEach((monthName, index) => {
        const rowData = stats[index];
        let colsHtml = '';
        disasterColumns.forEach(col => {
            const val = rowData[col.db];
            colsHtml += `<td style="border: 1px solid #000; padding: 4px; text-align: center;">${val > 0 ? val : ''}</td>`;
        });
        tableRows += `<tr><td style="border: 1px solid #000; padding: 4px; text-align: center;">${index + 1}</td><td style="border: 1px solid #000; padding: 4px; text-align: left; padding-left: 10px;">${monthName}</td>${colsHtml}<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${rowData.total > 0 ? rowData.total : ''}</td></tr>`;
    });

    let grandTotalColsHtml = '';
    disasterColumns.forEach(col => {
        const val = grandTotals[col.db];
        grandTotalColsHtml += `<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${val > 0 ? val : ''}</td>`;
    });
    const grandTotalRow = `<tr style="background-color: #f0f0f0;"><td colspan="2" style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">TOTAL</td>${grandTotalColsHtml}<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${grandTotals.total}</td></tr>`;

    const today = new Date();
    const monthNamesIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const reportDateString = `${today.getDate()} ${monthNamesIndo[today.getMonth()]} ${today.getFullYear()}`;

    const printContent = `
    <style>
        @page {
            size: A4 landscape;
            margin: 10mm;
        }
        body { font-family: Arial, sans-serif; font-size: 11px; color: #000; }
        .signature-wrapper {
             margin-top: 20px; display: flex; justify-content: space-between; page-break-inside: avoid; break-inside: avoid;
        }
    </style>
    <div style="width: 100%;">

    <div style="width: 100%; margin-bottom: 10px;">
        <table style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
                <td style="width: 80px; text-align: left; vertical-align: middle; border: none;">
                    <img src="${logoKabUrl}" alt="Logo Kabupaten Minahasa" style="width: 70px; height: auto;">
                </td>
                    <td style="text-align: center; vertical-align: middle; border: none;">
                        <div style="font-size: 24px; font-weight: bold;">
                            PEMERINTAH KABUPATEN MINAHASA
                        </div>
                        <div style="font-size: 30px; font-weight: bold;">
                            BADAN PENANGGULANGAN BENCANA DAERAH
                        </div>
                        <div style="font-size: 12px; margin-top: 3px;">
                            Alamat: Kompleks Stadion Maesa Kelurahan Wewelen (Tondano)
                        </div>
                        <div style="font-size: 12px;">
                            Website: www.minahasa.go.id E-mail: pemkab.minahasa@minahasa.go.id
                        </div>
                    </td>
                <td style="width: 80px; text-align: right; vertical-align: middle; border: none;">
                    <img src="${logoBpbdUrl}" alt="Logo BPBD" style="width: 70px; height: auto;">
                </td>
            </tr>
        </table>
        <hr style="border: 1px solid #000; margin-top: 8px;">
    </div>

        <div style="text-align: center; margin-bottom: 15px;">
            <div style="font-size: 14px; font-weight: bold; text-decoration: underline;">
                REKAPITULASI DATA LAPORAN KEJADIAN BENCANA TAHUN ${selectedYear}
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <thead>
                <tr style="background-color: #e0e0e0;">
                    <th style="border: 1px solid #000; padding: 4px; width: 30px;">NO</th>
                    <th style="border: 1px solid #000; padding: 4px;">BULAN</th>
                    ${disasterColumns.map(col => `<th style="border: 1px solid #000; padding: 4px; font-size: 9px;">${col.label}</th>`).join('')}
                    <th style="border: 1px solid #000; padding: 4px;">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
                ${grandTotalRow}
            </tbody>
        </table>

        <div class="signature-wrapper">
            <div style="width: 40%; text-align: center;">
                <div style="margin-bottom: 60px; line-height: 1.3;">
                    Tondano, ${reportDateString}<br>
                    Plt. Kepala Badan Penanggulangan Bencana<br>
                    Daerah Kabupaten Minahasa
                </div>
                <div style="font-weight: bold; text-decoration: underline; line-height: 1.2;">SHANDRO A. MOGOT, SE, M.Si.</div>
                <div style="line-height: 1.2;">Pembina Tkt. I, IV/b</div>
                <div style="line-height: 1.2;">Nip. 19740808 200003 1 003</div>
            </div>

            <div style="width: 40%; text-align: center; margin-top: 18px;">
                <div style="margin-bottom: 60px; line-height: 1.3;">Kabid Kedaruratan dan Logistik</div>
                <div style="font-weight: bold; text-decoration: underline; line-height: 1.2;">JELLY N. BOKAU, S.ST</div>
                <div style="line-height: 1.2;">Pembina Tkt I, IV/b</div>
                <div style="line-height: 1.2;">Nip. 19680702 199003 2007</div>
            </div>
        </div>
    </div>
    `;

    executePrint(printContent);
}

function handlePrintImpactReport() {
    const selectedYear = document.getElementById('filter-year').value;
    
    const isViews = window.location.pathname.includes('/views/');
    const uploadsPath = isViews ? '../uploads/' : 'uploads/';
    
    const logoKabUrl = new URL(uploadsPath + 'logokab-minahasa.png', window.location.href).href;
    const logoBpbdUrl = new URL(uploadsPath + 'logobpbd-minahasa.png', window.location.href).href;

    const yearlyData = allReportData.filter(item => {
        if (!item.disaster_date) return false;
        return item.disaster_date.startsWith(selectedYear);
    });

    const months = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    const disasterColumns = [
        { db: 'Angin Puting Beliung', label: 'ANGIN PUTTING BELIUNG' },
        { db: 'Pohon Tumbang', label: 'POHON TUMBANG' },
        { db: 'Tanah Longsor', label: 'LONGSOR' },
        { db: 'Kebakaran', label: 'KEBAKARAN' },
        { db: 'Kebakaran Hutan', label: 'KARHUTLAH' },
        { db: 'Orang Hilang', label: 'ORANG HILANG' },
        { db: 'Banjir', label: 'BANJIR' },
        { db: 'Gempa Bumi', label: 'GEMPA BUMI' }
    ];
    
    const stats = {};
    months.forEach((m, index) => {
        stats[index] = { total: { kk: 0, jiwa: 0 } };
        disasterColumns.forEach(col => stats[index][col.db] = { kk: 0, jiwa: 0 });
    });
    const grandTotals = { total: { kk: 0, jiwa: 0 } };
    disasterColumns.forEach(col => grandTotals[col.db] = { kk: 0, jiwa: 0 });

    yearlyData.forEach(item => {
        const date = new Date(item.disaster_date);
        const monthIndex = date.getMonth();
        let dbType = item.jenisBencana;
        if (dbType === "Kebakaran Hutan (Karhutla)") dbType = "Kebakaran Hutan";
        const colExists = disasterColumns.find(col => col.db === dbType);
        const kk = parseInt(item.kkTerdampak) || 0;
        const jiwa = parseInt(item.jiwaTerdampak) || 0;
        if (colExists && stats[monthIndex]) {
            stats[monthIndex][dbType].kk += kk;
            stats[monthIndex][dbType].jiwa += jiwa;
            stats[monthIndex].total.kk += kk;
            stats[monthIndex].total.jiwa += jiwa;
            grandTotals[dbType].kk += kk;
            grandTotals[dbType].jiwa += jiwa;
            grandTotals.total.kk += kk;
            grandTotals.total.jiwa += jiwa;
        }
    });

    let headerRowTop = '';
    let headerRowBottom = '';
    disasterColumns.forEach(col => {
        headerRowTop += `<th colspan="2" style="border: 1px solid #000; padding: 4px; font-size: 9px;">${col.label}</th>`;
        headerRowBottom += `<th style="border: 1px solid #000; padding: 4px; font-size: 8px;">KK</th><th style="border: 1px solid #000; padding: 4px; font-size: 8px;">JIWA</th>`;
    });

    let tableRows = '';
    months.forEach((monthName, index) => {
        const rowData = stats[index];
        let colsHtml = '';
        disasterColumns.forEach(col => {
            const data = rowData[col.db];
            const valKK = data.kk > 0 ? data.kk : '';
            const valJiwa = data.jiwa > 0 ? data.jiwa : '';
            colsHtml += `<td style="border: 1px solid #000; padding: 4px; text-align: center;">${valKK}</td><td style="border: 1px solid #000; padding: 4px; text-align: center;">${valJiwa}</td>`;
        });
        const totalKK = rowData.total.kk > 0 ? rowData.total.kk : '';
        const totalJiwa = rowData.total.jiwa > 0 ? rowData.total.jiwa : '';
        tableRows += `<tr><td style="border: 1px solid #000; padding: 4px; text-align: center;">${index + 1}</td><td style="border: 1px solid #000; padding: 4px; text-align: left; padding-left: 5px;">${monthName}</td>${colsHtml}<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${totalKK}</td><td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${totalJiwa}</td></tr>`;
    });

    let grandTotalColsHtml = '';
    disasterColumns.forEach(col => {
        const data = grandTotals[col.db];
        const valKK = data.kk > 0 ? data.kk : '';
        const valJiwa = data.jiwa > 0 ? data.jiwa : '';
        grandTotalColsHtml += `<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${valKK}</td><td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${valJiwa}</td>`;
    });
    const grandTotalRow = `<tr style="background-color: #f0f0f0;"><td colspan="2" style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">TOTAL</td>${grandTotalColsHtml}<td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${grandTotals.total.kk}</td><td style="border: 1px solid #000; padding: 4px; text-align: center; font-weight: bold;">${grandTotals.total.jiwa}</td></tr>`;

    const today = new Date();
    const monthNamesIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const reportDateString = `${today.getDate()} ${monthNamesIndo[today.getMonth()]} ${today.getFullYear()}`;

    const printContent = `
    <style>
        @page {
            size: A4 landscape;
            margin: 10mm;
        }
        body { font-family: Arial, sans-serif; font-size: 10px; color: #000; }
        .signature-wrapper {
             margin-top: 20px; display: flex; justify-content: space-between; page-break-inside: avoid; break-inside: avoid;
        }
    </style>
    <div style="width: 100%;">

        <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <tr>
                    <td style="width: 80px; text-align: left; vertical-align: middle; border: none;">
                        <img src="${logoKabUrl}" alt="Logo Kabupaten Minahasa" style="width: 70px; height: auto;">
                    </td>
                    <td style="text-align: center; vertical-align: middle; border: none;">
                        <div style="font-size: 24px; font-weight: bold;">
                            PEMERINTAH KABUPATEN MINAHASA
                        </div>
                        <div style="font-size: 30px; font-weight: bold;">
                            BADAN PENANGGULANGAN BENCANA DAERAH
                        </div>
                        <div style="font-size: 12px; margin-top: 3px;">
                            Alamat: Kompleks Stadion Maesa Kelurahan Wewelen (Tondano)
                        </div>
                        <div style="font-size: 12px;">
                            Website: www.minahasa.go.id E-mail: pemkab.minahasa@minahasa.go.id
                        </div>
                    </td>
                    <td style="width: 80px; text-align: right; vertical-align: middle; border: none;">
                        <img src="${logoBpbdUrl}" alt="Logo BPBD Minahasa" style="width: 70px; height: auto;">
                    </td>
                </tr>
            </table>
            <hr style="border: 1px solid #000; margin-top: 8px;">
        </div>

        <div style="text-align: center; margin-bottom: 15px;">
            <div style="font-size: 12px; font-weight: bold; text-decoration: underline;">
                REKAPITULASI DATA LAPORAN KORBAN TERDAMPAK BENCANA TAHUN ${selectedYear}
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
            <thead>
                <tr style="background-color: #e0e0e0;">
                    <th rowspan="2" style="border: 1px solid #000; padding: 4px; width: 25px;">NO</th>
                    <th rowspan="2" style="border: 1px solid #000; padding: 4px;">BULAN</th>
                    ${headerRowTop}
                    <th colspan="2" style="border: 1px solid #000; padding: 4px;">TOTAL</th>
                </tr>
                <tr style="background-color: #e0e0e0;">
                    ${headerRowBottom}
                    <th style="border: 1px solid #000; padding: 4px; font-size: 8px;">KK</th>
                    <th style="border: 1px solid #000; padding: 4px; font-size: 8px;">JIWA</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
                ${grandTotalRow}
            </tbody>
        </table>

        <div class="signature-wrapper">
            <div style="width: 40%; text-align: center;">
                <div style="margin-bottom: 60px; line-height: 1.3;">
                    Tondano, ${reportDateString}<br>
                    Plt. Kepala Badan Penanggulangan Bencana<br>
                    Daerah Kabupaten Minahasa
                </div>
                <div style="font-weight: bold; text-decoration: underline; line-height: 1.2;">SHANDRO A. MOGOT, SE, M.Si.</div>
                <div style="line-height: 1.2;">Pembina Tkt. I, IV/b</div>
                <div style="line-height: 1.2;">Nip. 19740808 200003 1 003</div>
            </div>

            <div style="width: 40%; text-align: center;">
                <div style="margin-bottom: 50px; line-height: 1.3;">
                    Tondano, ${reportDateString}<br><br>
                    Kabid Kedaruratan dan Logistik
                </div>
                <div style="font-weight: bold; text-decoration: underline; line-height: 1.2;">JELLY N. BOKAU, S.ST</div>
                <div style="line-height: 1.2;">Pembina Tkt I, IV/b</div>
                <div style="line-height: 1.2;">Nip. 19680702 199003 2007</div>
            </div>
        </div>
    </div>
    `;

    executePrint(printContent);
}

function handleConfirmPrint() {
    const previewContent = document.getElementById('preview-content');
    if(!previewContent) return;
    
    let printContent = previewContent.innerHTML;
    
    printContent = printContent.replace(/transform: scale\(.*?\);/g, '');
    printContent = printContent.replace(/transform-origin:.*?;/g, '');

    if (!printContent.includes('<html>')) {
        printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Laporan BPBD</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #000; padding: 4px; text-align: center; }
                    @page { size: A4 landscape; margin: 1cm; }
                </style>
                <base href="${window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)}">
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `;
    }

    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.print();
    };
    
    const modalElement = document.getElementById('preview-modal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}

// Fungsi helper kecil khusus file print ini untuk menghindari DRY
function executePrint(content) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.onload = function() {
        setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            setTimeout(() => { document.body.removeChild(iframe); }, 1000);
        }, 500); 
    };

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
}