// assets/js/utils.js

function formatDate(dateString) {
    if (!dateString || dateString === '0000-00-00') {
        return 'Tanggal tidak valid';
    }
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function getIndonesianMonthName(monthIndex) {
    const monthNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    return monthNames[monthIndex];
}

function filterDataByMonth(data, filterValue) {
    if (!filterValue) return data;
    return data.filter(item => {
        return item.disaster_date && item.disaster_date.startsWith(filterValue);
    });
}