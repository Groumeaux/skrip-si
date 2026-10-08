// assets/js/main.js

window.showRejectReason = function(reason) {
    Swal.fire({
        title: 'Alasan Penolakan',
        text: reason,
        icon: 'warning',
        confirmButtonText: 'Saya Mengerti, Saya akan Revisi',
        confirmButtonColor: '#e60013'
    });
};

function generateBencanaTable(data) {
    const rankedData = runSAW(data); 
    const tableBody = document.getElementById('report-table-body-bencana');
    if(!tableBody) return;
    
    tableBody.innerHTML = '';

    if (rankedData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-muted">Belum ada data bencana.</td></tr>`;
        return;
    }

    rankedData.forEach((item, index) => {
        const rank = index + 1;
        const rankColor = rank === 1 ? 'bg-danger-subtle text-danger-emphasis' : (rank === 2 ? 'bg-warning-subtle text-warning-emphasis' : 'bg-success-subtle text-success-emphasis');

        let photoThumbnails = '';
        if (item.photos && item.photos.length > 0) {
            photoThumbnails = '<div class="d-flex flex-wrap gap-1">';
            item.photos.forEach(photo => {
                photoThumbnails += `<img src="${photo.file_path}" alt="Foto bencana" class="img-thumbnail" style="width: 40px; height: 40px; object-fit: cover; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#photo-modal" data-photo-src="${photo.file_path}" data-photo-title="${photo.original_filename}">`;
            });
            photoThumbnails += '</div>';
        } else {
            photoThumbnails = '<span class="text-muted">Tidak ada foto</span>';
        }

        const row = `
            <tr>
                <td class="text-center">
                    <span class="badge ${rankColor} rounded-pill fs-6">${rank}</span>
                </td>
                <td class="fw-medium">${item.jenisBencana}</td>
                <td>${item.lokasi}</td>
                <td>${formatDate(item.disaster_date)}</td>
                <td>${item.jiwaTerdampak} Jiwa / ${item.kkTerdampak} KK</td>
                <td class="text-center">
                     <span class="badge ${
                        item.tingkatKerusakan === 'Berat' ? 'bg-danger-subtle text-danger-emphasis' :
                        item.tingkatKerusakan === 'Sedang' ? 'bg-warning-subtle text-warning-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'
                     } rounded-pill">${item.tingkatKerusakan}</span>
                </td>
                <td class="fw-bold text-primary">${item.finalScore.toFixed(4)}</td>
                <td>${photoThumbnails}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11a.5.5 0 0 1 .108-.191z"/></svg>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${item.id}" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 0-1 0v6.5A1.5 1.5 0 0 0 9.5 14h1a1.5 1.5 0 0 0 1.5-1.5V6a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function generateInsidenTable(data) {
    const tableBody = document.getElementById('report-table-body-insiden');
    if(!tableBody) return;
    
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada laporan insiden.</td></tr>`;
        return;
    }

    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    data.forEach(item => {
        let photoThumbnails = '';
        if (item.photos && item.photos.length > 0) {
            photoThumbnails = '<div class="d-flex flex-wrap gap-1">';
            item.photos.forEach(photo => {
                photoThumbnails += `<img src="${photo.file_path}" alt="Foto insiden" class="img-thumbnail" style="width: 40px; height: 40px; object-fit: cover; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#photo-modal" data-photo-src="${photo.file_path}" data-photo-title="${photo.original_filename}">`;
            });
            photoThumbnails += '</div>';
        } else {
            photoThumbnails = '<span class="text-muted">Tidak ada foto</span>';
        }

        const row = `
            <tr>
                <td class="fw-medium">${item.jenisBencana}</td>
                <td>${item.lokasi}</td>
                <td>${item.keterangan || '<span class="text-muted">N/A</span>'}</td>
                <td>${formatDate(item.disaster_date)}</td>
                <td>${photoThumbnails}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11a.5.5 0 0 1 .108-.191z"/></svg>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${item.id}" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 0-1 0v6.5A1.5 1.5 0 0 0 9.5 14h1a1.5 1.5 0 0 0 1.5-1.5V6a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const kategori = formData.get('kategoriLaporan');
    if (kategori === 'bencana') {
        const jiwa = parseInt(formData.get('jiwaTerdampak') ?? '-1');
        const kk = parseInt(formData.get('kkTerdampak') ?? '-1');
        if (isNaN(jiwa) || jiwa < 0 || isNaN(kk) || kk < 0) {
             Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Untuk Kategori Bencana, Jiwa dan KK Terdampak wajib diisi (minimal 0).',
                confirmButtonColor: '#e60013'
            });
            return;
        }
    }

    fetch('api/save_disaster.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: data.message,
                confirmButtonColor: '#00499d'
            });
            form.reset();
            const formBencana = document.getElementById('form-grup-bencana');
            const formInsiden = document.getElementById('form-grup-insiden');
            if(formBencana && formInsiden) {
                formBencana.style.display = 'block';
                formInsiden.style.display = 'none';
                const bencanRadio = document.getElementById('kategori-bencana');
                if (bencanRadio) bencanRadio.checked = true;
            }
            
            loadAndDisplayAllReports(); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: data.message,
                confirmButtonColor: '#e60013'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Terjadi kesalahan saat menyimpan laporan',
            confirmButtonColor: '#e60013'
        });
    });
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('views/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: 'Selamat datang di sistem BPBD.',
                confirmButtonColor: '#00499d',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.reload();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal!',
                text: data.message,
                confirmButtonColor: '#e60013'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Terjadi kesalahan saat login',
            confirmButtonColor: '#e60013'
        });
    });
}

function handleLogout() {
    Swal.fire({
        title: 'Konfirmasi Logout',
        text: 'Apakah Anda yakin ingin keluar dari sistem?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00499d',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Logout Berhasil!',
                text: 'Terima kasih telah menggunakan sistem BPBD.',
                icon: 'success',
                confirmButtonColor: '#00499d',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'views/logout.php';
            });
        }
    });
}

function populateYearDropdown() {
    const yearSelect = document.getElementById('filter-year');
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 2; 
    const endYear = currentYear + 2;   

    yearSelect.innerHTML = '';
    for (let y = startYear; y <= endYear; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        if (y === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
}

function filterAndRenderReports() {
    const yearSelect = document.getElementById('filter-year');
    const monthSelect = document.getElementById('filter-month');
    
    if (!yearSelect || !monthSelect) return;

    const year = yearSelect.value;
    const month = monthSelect.value;
    
    let filterValue = year;
    if (month) {
        filterValue += '-' + month;
    }

    const filteredData = filterDataByMonth(allReportData, filterValue);

    const bencanaData = filteredData.filter(d => d.kategori_laporan === 'bencana' || !d.kategori_laporan);
    const insidenData = filteredData.filter(d => d.kategori_laporan === 'insiden');

    if ($.fn.DataTable.isDataTable('#disaster-report-table')) {
        $('#disaster-report-table').DataTable().destroy();
    }
    if ($.fn.DataTable.isDataTable('#insiden-report-table')) {
        $('#insiden-report-table').DataTable().destroy();
    }

    generateBencanaTable(bencanaData);
    generateInsidenTable(insidenData);

    setTimeout(function() {
        if (bencanaData.length > 0) {
            $('#disaster-report-table').DataTable({
                "pageLength": 5, "lengthMenu": [3, 5], "responsive": true, "order": [[0, "asc"]],
                "columnDefs": [ { "orderable": false, "targets": [1, 2, 3, 4, 5, 7, 8] } ],
                "language": { "search": "Cari:", "paginate": { "next": ">", "previous": "<" } }
            });
        }
        if (insidenData.length > 0) {
            $('#insiden-report-table').DataTable({
                "pageLength": 5, "lengthMenu": [3, 5], "responsive": true, "order": [[3, "desc"]],
                "columnDefs": [ { "orderable": false, "targets": [0, 1, 2, 4, 5] } ],
                "language": { "search": "Cari:", "paginate": { "next": ">", "previous": "<" } }
            });
        }
    }, 10);
}

function loadAndDisplayAllReports() {
    fetch('api/get_disasters.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allReportData = data.data; 
                filterAndRenderReports(); 
            } else {
                console.error('Error loading data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleDeleteDisaster(id) {
    Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Apakah Anda yakin ingin menghapus laporan bencana ini? Tindakan ini tidak dapat dibatalkan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e60013',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('id', id);

            fetch('api/delete_disaster.php', { 
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: data.message,
                        confirmButtonColor: '#00499d',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    loadAndDisplayAllReports(); 
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: data.message,
                        confirmButtonColor: '#e60013'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Terjadi kesalahan saat menghapus laporan.',
                    confirmButtonColor: '#e60013'
                });
            });
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    // Inisialisasi dropdown wilayah (jika ada di halaman)
    const kecamatanSelect = document.getElementById('kecamatan');
    const lokasiSelect = document.getElementById('lokasi');
    if (kecamatanSelect && lokasiSelect) {
        Object.keys(minahasaLocations).forEach(kecamatan => {
            const option = document.createElement('option');
            option.value = kecamatan;
            option.textContent = kecamatan;
            kecamatanSelect.appendChild(option);
        });

        kecamatanSelect.addEventListener('change', function() {
            const selectedKecamatan = this.value;
            lokasiSelect.innerHTML = '<option value="">Pilih Desa/Kelurahan</option>';

            if (selectedKecamatan && minahasaLocations[selectedKecamatan]) {
                const villages = minahasaLocations[selectedKecamatan];

                if (villages.desa) {
                    villages.desa.forEach(location => {
                        const option = document.createElement('option');
                        option.value = `Desa ${location}, Kec. ${selectedKecamatan}`;
                        option.textContent = `Desa ${location}`;
                        lokasiSelect.appendChild(option);
                    });
                }

                if (villages.kelurahan) {
                    villages.kelurahan.forEach(location => {
                        const option = document.createElement('option');
                        option.value = `Kelurahan ${location}, Kec. ${selectedKecamatan}`;
                        option.textContent = `Kelurahan ${location}`;
                        lokasiSelect.appendChild(option);
                    });
                }
            }
        });
    }

    // Filter dan Inisialisasi Laporan
    populateYearDropdown();

    const today = new Date();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    
    const monthSelect = document.getElementById('filter-month');
    if (monthSelect) monthSelect.value = currentMonth; 

    const yearSelect = document.getElementById('filter-year');
    if (yearSelect) yearSelect.addEventListener('change', filterAndRenderReports);
    if (monthSelect) monthSelect.addEventListener('change', filterAndRenderReports);

    loadAndDisplayAllReports();

    // Event Listener untuk UI interaktif
    const validateLink = document.getElementById('validate-link');
    if (validateLink) {
        validateLink.addEventListener('click', function(e) {
            // Logika validate link jika ada
        });
    }

    const formGrupBencana = document.getElementById('form-grup-bencana');
    const formGrupInsiden = document.getElementById('form-grup-insiden');
    const jiwaInput = document.getElementById('jiwaTerdampak');
    const kkInput = document.getElementById('kkTerdampak');

    const kategoriRadios = document.querySelectorAll('input[name="kategoriLaporan"]');
    if (kategoriRadios.length > 0) {
        function applyKategoriSwitch(value) {
            if (value === 'bencana') {
                if (formGrupBencana) formGrupBencana.style.display = 'block';
                if (formGrupInsiden) formGrupInsiden.style.display = 'none';
                if (jiwaInput) { jiwaInput.required = false; jiwaInput.min = '0'; }
                if (kkInput) { kkInput.required = false; kkInput.min = '0'; }
            } else {
                if (formGrupBencana) formGrupBencana.style.display = 'none';
                if (formGrupInsiden) formGrupInsiden.style.display = 'block';
                if (jiwaInput) { jiwaInput.required = false; jiwaInput.min = '0'; }
                if (kkInput) { kkInput.required = false; kkInput.min = '0'; }
            }
        }
        kategoriRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                applyKategoriSwitch(this.value);
            });
        });
        // Apply initial state based on default checked radio
        const checkedRadio = document.querySelector('input[name="kategoriLaporan"]:checked');
        if (checkedRadio) applyKategoriSwitch(checkedRadio.value);
    }

    // Form Event Listeners
    const disasterForm = document.getElementById('disaster-form');
    if (disasterForm) {
        disasterForm.addEventListener('submit', handleFormSubmit);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Button Print Listeners
    const printBtn = document.getElementById('print-report');
    if (printBtn) {
        printBtn.addEventListener('click', handlePrintReport);
    }
    const printInsidenBtn = document.getElementById('print-insiden-report');
    if (printInsidenBtn) {
        printInsidenBtn.addEventListener('click', handlePrintInsidenReport); 
    }
    const printCumulativeBtn = document.getElementById('print-cumulative-report');
    if (printCumulativeBtn) {
        printCumulativeBtn.addEventListener('click', handlePrintCumulativeReport);
    }
    const printImpactBtn = document.getElementById('print-impact-report');
    if (printImpactBtn) {
        printImpactBtn.addEventListener('click', handlePrintImpactReport);
    }
    
    const confirmPrintBtn = document.getElementById('confirm-print');
    if (confirmPrintBtn) {
        confirmPrintBtn.addEventListener('click', handleConfirmPrint);
    }

    // Global Click Listeners (Event Delegation)
    document.addEventListener('click', function(e) {
        // Edit Button Clicked
        if (e.target.closest('.edit-btn')) {
            const id = e.target.closest('.edit-btn').getAttribute('data-id');
            
            fetch(`api/get_single_disaster.php?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const disaster = data.data; 
                        const photos = data.data.photos; 
                        
                        document.getElementById('edit-disaster-id').value = disaster.id;
                        document.getElementById('edit-lokasi').value = disaster.lokasi;
                        document.getElementById('edit-disasterDate').value = disaster.disaster_date;
                        document.getElementById('edit-keterangan').value = disaster.keterangan || '';

                        const photoInput = document.querySelector('#edit-disaster-form input[type="file"]');
                        if (photoInput) photoInput.value = '';

                        const isInsiden = disaster.kategori_laporan === 'insiden';
                        const selectEl = document.getElementById('edit-jenisBencana');
                        const fieldBencana = document.querySelectorAll('.field-bencana');
                        
                        if (selectEl) {
                            selectEl.innerHTML = '';
                            const options = isInsiden ? insidenOptions : bencanaOptions;
                            
                            options.forEach(opt => {
                                const el = document.createElement('option');
                                el.value = opt;
                                el.textContent = opt;
                                if (opt === disaster.jenisBencana) el.selected = true;
                                selectEl.appendChild(el);
                            });
                        }

                        if (isInsiden) {
                            fieldBencana.forEach(el => el.style.display = 'none');
                        } else {
                            fieldBencana.forEach(el => el.style.display = 'block');
                            document.getElementById('edit-jiwaTerdampak').value = disaster.jiwaTerdampak;
                            document.getElementById('edit-kkTerdampak').value = disaster.kkTerdampak;
                            document.getElementById('edit-tingkatKerusakan').value = disaster.tingkatKerusakan;
                        }

                        const photoContainer = document.getElementById('edit-existing-photos');
                        const photoWrapper = document.getElementById('edit-existing-photos-container');
                        
                        if (photoContainer && photoWrapper) {
                            photoContainer.innerHTML = ''; 
                            
                            if (photos && photos.length > 0) {
                                photoWrapper.style.display = 'block';
                                photos.forEach(photo => {
                                    const photoItem = `
                                        <div class="col-6 col-md-3">
                                            <div class="card h-100 border bg-light">
                                                <div class="card-body p-2 text-center">
                                                    <img src="${photo.file_path}" class="img-fluid rounded mb-2" style="height: 80px; object-fit: cover;">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input border-danger" type="checkbox" name="delete_photos[]" value="${photo.id}" id="del_idx_${photo.id}">
                                                        <label class="form-check-label text-danger small fw-bold" for="del_idx_${photo.id}">Hapus</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                    photoContainer.innerHTML += photoItem;
                                });
                            } else {
                                photoWrapper.style.display = 'none';
                            }
                        }
                        
                        const editModal = new bootstrap.Modal(document.getElementById('edit-modal'));
                        editModal.show();
                        
                    } else {
                        Swal.fire({ icon: 'error', title: 'Gagal!', text: data.message, confirmButtonColor: '#e60013' });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({ icon: 'error', title: 'Error!', text: 'Gagal mengambil data laporan.', confirmButtonColor: '#e60013' });
                });
        }

        // Delete Button Clicked
        if (e.target.closest('.delete-btn')) {
            const id = e.target.closest('.delete-btn').getAttribute('data-id');
            handleDeleteDisaster(id);
        }

        // Photo Thumbnail Clicked (for Modal Preview)
        if (e.target.matches('[data-bs-target="#photo-modal"]')) {
            const imgSrc = e.target.getAttribute('data-photo-src');
            const imgTitle = e.target.getAttribute('data-photo-title');
            document.getElementById('photo-modal-image').src = imgSrc;
            document.getElementById('photoModalLabel').textContent = imgTitle || 'Foto Bencana';
        }
    });

    // Form Edit Submit
    const editForm = document.getElementById('edit-disaster-form');
    if (editForm) {
        editForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const form = event.target;
            const formData = new FormData(form); 
            const modalElement = document.getElementById('edit-modal');
            const modal = bootstrap.Modal.getInstance(modalElement);

            fetch('api/edit_disaster.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (modal) {
                        modal.hide();
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: data.message,
                        confirmButtonColor: '#00499d',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    loadAndDisplayAllReports(); 
                } else {
                    Swal.fire({ icon: 'error', title: 'Gagal!', text: data.message, confirmButtonColor: '#e60013' });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({ icon: 'error', title: 'Error!', text: 'Terjadi kesalahan saat menyimpan perubahan.', confirmButtonColor: '#e60013' });
            });
        });
    }
});