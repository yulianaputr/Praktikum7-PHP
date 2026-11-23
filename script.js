const API_URL = "backend";

const form = document.getElementById("formMahasiswa");
const inputId = document.getElementById("mahasiswaId");
const inputNama = document.getElementById("nama");
const inputNim = document.getElementById("nim");
const btnSubmit = document.getElementById("btnSubmit");
const btnBatal = document.getElementById("btnBatal");
const tabelBody = document.getElementById("tabelMahasiswa");
const alertBox = document.getElementById("alertBox");

function tampilkanPesan(pesan, tipe = "success") {
    alertBox.textContent = pesan;
    alertBox.className = `alert ${tipe}`;
    alertBox.style.display = "block";
    setTimeout(() => { alertBox.style.display = "none"; }, 3000);
}

async function muatData() {
    try {
        const response = await fetch(`${API_URL}/read.php`);
        const hasil = await response.json();
        tabelBody.innerHTML = "";

        if (hasil.success && hasil.data.length > 0) {
            hasil.data.forEach((mhs, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${mhs.nama}</td>
                    <td>${mhs.nim}</td>
                    <td>${mhs.created_at}</td>
                    <td>
                        <button class="btn-edit" onclick="editData(${mhs.id}, '${mhs.nama.replace(/'/g, "\\'")}', '${mhs.nim.replace(/'/g, "\\'")}')">Edit</button>
                        <button class="btn-delete" onclick="hapusData(${mhs.id})">Hapus</button>
                    </td>
                `;
                tabelBody.appendChild(tr);
            });
        } else {
            tabelBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data mahasiswa.</td></tr>`;
        }
    } catch (error) {
        tabelBody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:red;">Gagal terhubung ke server PHP.</td></tr>`;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = inputId.value;
    const nama = inputNama.value.trim();
    const nim = inputNim.value.trim();

    const endpoint = id ? `${API_URL}/update.php` : `${API_URL}/create.php`;
    const payload = id ? { id: parseInt(id), nama, nim } : { nama, nim };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const hasil = await response.json();

        if (hasil.success) {
            tampilkanPesan(hasil.message, "success");
            resetForm();
            muatData();
        } else {
            tampilkanPesan(hasil.message || "Terjadi kesalahan", "error");
        }
    } catch (error) {
        tampilkanPesan("Gagal mengirim data ke server.", "error");
    }
});

function editData(id, nama, nim) {
    inputId.value = id;
    inputNama.value = nama;
    inputNim.value = nim;
    btnSubmit.textContent = "Update";
    btnBatal.style.display = "inline-block";
}

async function hapusData(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
        const response = await fetch(`${API_URL}/delete.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const hasil = await response.json();

        if (hasil.success) {
            tampilkanPesan(hasil.message, "success");
            muatData();
        } else {
            tampilkanPesan(hasil.message || "Gagal menghapus data", "error");
        }
    } catch (error) {
        tampilkanPesan("Gagal menghubungi server.", "error");
    }
}

function resetForm() {
    form.reset();
    inputId.value = "";
    btnSubmit.textContent = "Simpan";
    btnBatal.style.display = "none";
}

btnBatal.addEventListener("click", resetForm);
muatData();