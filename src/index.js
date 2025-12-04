const mahasiswaNim = '2022004017'; 
const dosenNidn = '1234567890'; 

async function updateRecord(endpoint, data) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Update successful:', result);
    } catch (error) {
        console.error('Error during update:', error);
    }
}

updateRecord(`mahasiswa/${mahasiswaNim}`, {
    nama: 'Tiara anggie Maharani',
    gender: 'P',
    prodi: 'TI',
    alamat: 'Sukabumi'
});

updateRecord(`dosen/${dosenNidn}`, {
    nama: 'Pak Ir. Somantri, S.T, M.Kom.',
    gender: 'L',
    prodi: 'TI',
    alamat: 'Sukabumi'
});