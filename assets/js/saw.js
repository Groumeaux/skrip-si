// assets/js/saw.js

function runSAW(data) {
    if (data.length === 0) return [];

    const quantifiedData = data.map(item => ({
        ...item,
        skorKerusakan: quantificationScores.kerusakan[item.tingkatKerusakan] || 0,
        skorJenis: quantificationScores.jenis[item.jenisBencana] || 0
    }));

    const maxValues = {
        jiwa: Math.max(1, ...quantifiedData.map(d => d.jiwaTerdampak)),
        kk: Math.max(1, ...quantifiedData.map(d => d.kkTerdampak)),
        kerusakan: Math.max(1, ...quantifiedData.map(d => d.skorKerusakan)),
        jenis: Math.max(1, ...quantifiedData.map(d => d.skorJenis))
    };

    const normalizedData = quantifiedData.map(item => ({
        ...item,
        normJiwa: (item.jiwaTerdampak || 0) / maxValues.jiwa,
        normKk: (item.kkTerdampak || 0) / maxValues.kk,
        normKerusakan: (item.skorKerusakan || 0) / maxValues.kerusakan,
        normJenis: (item.skorJenis || 0) / maxValues.jenis,
    }));

    const scoredData = normalizedData.map(item => {
        const score =
            (item.normJiwa * weights.jiwa) +
            (item.normKk * weights.kk) +
            (item.normKerusakan * weights.kerusakan) +
            (item.normJenis * weights.jenis);
        return { ...item, finalScore: score };
    });

    const sortedData = scoredData.sort((a, b) => b.finalScore - a.finalScore);

    return sortedData;
}