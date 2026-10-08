// assets/js/data.js

const weights = {
    jiwa: 0.40,
    kk: 0.25,
    kerusakan: 0.20,
    jenis: 0.15,
};

const quantificationScores = {
    kerusakan: { 'Ringan': 1, 'Sedang': 2, 'Berat': 3 },
    jenis: {
        'Angin Puting Beliung': 1,
        'Banjir': 2,
        'Kebakaran': 2, 
        'Tanah Longsor': 3,
        'Kebakaran Hutan': 3, 
        'Gempa Bumi': 4
    }
};

let allReportData = [];

const bencanaOptions = ['Banjir', 'Tanah Longsor', 'Angin Puting Beliung', 'Gempa Bumi', 'Kebakaran', 'Kebakaran Hutan'];
const insidenOptions = ['Pohon Tumbang', 'Orang Hilang'];

const minahasaLocations = {
    "Eris": {
        desa: ["Eris", "Maumbi", "Ranomerut", "Tandengan", "Tandengan Satu", "Telap", "Toliang Oki", "Watumea"]
    },
    "Kakas": {
        desa: ["Kaweng", "Kayuwatu", "Mahembang", "Makalelon", "Pahaleten", "Paslaten", "Rinondor", "Sendangan", "Talikuran", "Toulimembet", "Tounelet", "Tumpaan", "Wineru"]
    },
    "Kakas Barat": {
        desa: ["Bukittinggi", "Kalawiran", "Panasen", "Passo", "Simbel", "Totolan", "Touliang", "Tountimomor", "Wailang", "Wasian"]
    },
    "Kawangkoan": {
        kelurahan: ["Kinali", "Kinali Satu", "Sendangan", "Sendangan Selatan", "Sendangan Utara", "Uner Satu"],
        desa: ["Kanonang Tiga", "Tondegesan", "Tondegesan Dua", "Tondegesan Satu"]
    },
    "Kawangkoan Barat": {
        desa: ["Kanonang Dua", "Kanonang Empat", "Kanonang Lima", "Kanonang Satu", "Kayuuwi", "Kayuuwi Satu", "Ranolambot", "Tombasian Atas", "Tombasian Atas Satu", "Tombasian Bawah"]
    },
    "Kawangkoan Utara": {
        kelurahan: ["Talikuran", "Talikuran Barat", "Talikuran Utara", "Uner"],
        desa: ["Kiawa Dua", "Kiawa Dua Barat", "Kiawa Dua Timur", "Kiawa Satu", "Kiawa Satu Barat", "Kiawa Satu Utara"]
    },
    "Kombi": {
        desa: ["Kalawiran", "Kayu Besi", "Kinaleosan", "Kolongan", "Kolongan Satu", "Kombi", "Lalumpe", "Makalisung", "Ranowangko Dua", "Rerer", "Rerer Satu", "Sawangan", "Tulap"]
    },
    "Langowan Barat": {
        desa: ["Ampreng", "Kopiwangker", "Koyawas", "Lowian", "Noongan", "Noongan Dua", "Noongan Tiga", "Paslaten", "Raranon", "Raranon Selatan", "Raranon Utara", "Raringis", "Tounelet", "Tumaratas", "Tumaratas Dua", "Walewangko"]
    },
    "Langowan Selatan": {
        desa: ["Atep", "Atep Satu", "Kaayuran Atas", "Kaayuran Bawah", "Kawatak", "Manembo", "Palamba", "Rumbia", "Temboan", "Winebetan"]
    },
    "Langowan Timur": {
        desa: ["Amongena I", "Amongena II", "Amongena III", "Karondoran", "Sumarayar", "Teep", "Waleure", "Wolaang"]
    },
    "Langowan Utara": {
        desa: ["Karumenga", "Taraitak", "Taraitak Satu", "Tempang I", "Tempang II", "Tempang III", "Toraget", "Walantakan"]
    },
    "Lembean Timur": {
        desa: ["Atep Oki", "Kaleosan", "Kapataran", "Kapataran I", "Karor", "Kayuroya", "Parentek", "Seretan", "Seretan Timu", "Watulaney", "Watulaney Amian"]
    },
    "Mandolang": {
        desa: ["Agotey", "Kalasey Dua", "Kalasey Satu", "Koha", "Koha Barat", "Koha Selatan", "Koha Timur", "Tateli", "Tateli I", "Tateli II", "Tateli III", "Tateli Weru"]
    },
    "Pineleng": {
        desa: ["Kali", "Kali Selatan", "Lotta", "Pineleng Dua Indah", "Pineleng I", "Pineleng II", "Pineleng Satu Timur", "Sea", "Sea I", "Sea II", "Sea Mitra", "Sea Tumpengan", "Warembungan", "Winagun Atas"]
    },
    "Remboken": {
        desa: ["Kaima", "Kasuratan", "Leleko", "Parepei", "Paslaten", "Pulutan", "Sendangan", "Sinuian", "Talikuran", "Tampusu", "Timu"]
    },
    "Sonder": {
        desa: ["Kauneran", "Kauneran Satu", "Kolongan Atas", "Kolongan Atas Dua", "Kolongan Atas Satu", "Leilem", "Leilem Dua", "Leilem Tiga", "Rambunan", "Rambunan Amian", "Sawangan", "Sendangan", "Sendangan Satu", "Talikuran", "Talikuran Satu", "Timbukar", "Tincep", "Tounelet", "Tounelet Satu"]
    },
    "Tombariri": {
        desa: ["Borgo", "Kumu", "Mokupa", "Pinasungkulan", "Poopoh", "Ranowangko", "Sarani Matani", "Senduk", "Tambala", "Teling"]
    },
    "Tombariri Timur": {
        desa: ["Lemoh", "Lemoh Barat", "Lemoh Timur", "Lemoh Uner", "Lolah", "Lolah Dua", "Lolah Satu", "Lolah Tiga", "Ranotongkor", "Ranotongkor Timur"]
    },
    "Tombulu": {
        desa: ["Kamangta", "Kembes I", "Kembes II", "Koka", "Rumengkor", "Rumengkor Dua", "Rumengkor Satu", "Sawangan", "Suluan", "Tikela", "Tombuluan"]
    },
    "Tompaso": {
        desa: ["Kamanga", "Kamanga Dua", "Liba", "Sendangan", "Talikuran", "Tember", "Tempok", "Tempok Selatan", "Tolok", "Tolok Satu"]
    },
    "Tompaso Barat": {
        desa: ["Pinabetengan", "Pinabetengan Selatan", "Pinabetengan Utara", "Pinaesaan", "Tompaso Dua", "Tompaso Dua Utara", "Tonsewer", "Tonsewer Selatan", "Touure", "Touure Dua"]
    },
    "Tondano Barat": {
        kelurahan: ["Masarang", "Rerewokan", "Rinegetan", "Roong", "Tounkuramber", "Tuutu", "Watulambot", "Wawalintouan", "Wewelan"]
    },
    "Tondano Selatan": {
        kelurahan: ["Koya", "Maesa Unima", "Peleloan", "Tataaran I", "Tataaran II", "Tataaran Patar", "Tounsaru", "Urongo"]
    },
    "Tondano Timur": {
        kelurahan: ["Katinggolan", "Kendis", "Kiniar", "Liningaan", "Luaan", "Makalounsow", "Papakelan", "Ranowangko", "Taler", "Touluor", "Wengkol"]
    },
    "Tondano Utara": {
        kelurahan: ["Kampung Jawa", "Marawas", "Sasaran", "Sumalangka", "Wulauan"],
        desa: ["Kembuan", "Kembuan Satu", "Tonsea Lama"]
    }
};