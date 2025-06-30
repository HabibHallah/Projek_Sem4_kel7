import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ITEMS_PER_PAGE = 5;

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

  const [formData, setFormData] = useState({
    uuid: null,
    judul: '',
    isi: '',
    gambar_file: null,
    gambar: '',
    penulis: '',
    tanggal: '',
  });

  const isEditing = formData.uuid !== null;

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal mengambil data artikel.', error);
    } else {
      setArtikel(data || []);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      uuid: null,
      judul: '',
      isi: '',
      gambar_file: null,
      gambar: '',
      penulis: '',
      tanggal: '',
    });
  };

  const openModal = (data = null) => {
    if (data) {
      setFormData({ ...data, gambar_file: null });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'gambar_file') {
      setFormData((prev) => ({ ...prev, gambar_file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `artikel/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('gambar-artikel')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gambar-artikel')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { uuid, judul, isi, gambar_file, penulis, tanggal } = formData;

    if (!judul || !isi || !penulis) {
      alert('Judul, isi, dan penulis wajib diisi.');
      return;
    }

    let gambar = formData.gambar;
    if (gambar_file) {
      try {
        gambar = await uploadImage(gambar_file);
      } catch (err) {
        alert('Gagal mengunggah gambar.');
        console.error(err);
        return;
      }
    }

    const finalTanggal = tanggal || new Date().toISOString();

    if (isEditing) {
      await supabase
        .from('artikel')
        .update({ judul, isi, gambar, penulis, tanggal: finalTanggal })
        .eq('uuid', uuid);
    } else {
      await supabase
        .from('artikel')
        .insert([{ judul, isi, gambar, penulis, tanggal: finalTanggal }]);
    }

    closeModal();
    fetchArtikel();
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      await supabase.from('artikel').delete().eq('uuid', uuid);
      fetchArtikel();
    }
  };

  // ============ FILTER & PAGINATION ============
  const filteredArtikel = artikel.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery) ||
    item.isi.toLowerCase().includes(searchQuery) ||
    item.penulis.toLowerCase().includes(searchQuery) ||
    (item.tanggal && item.tanggal.toLowerCase().includes(searchQuery))
  );

  const totalItems = filteredArtikel.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArtikel = filteredArtikel.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manajemen Artikel</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#7F55B1] text-white px-4 py-2 rounded-md hover:bg-[#6e46a2] transition"
        >
          + Tambah Artikel
        </button>
      </div>

      <div className="overflow-auto rounded-xl border shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Judul</th>
              <th className="px-3 py-2 text-left">Penulis</th>
              <th className="px-3 py-2 text-left">Tanggal</th>
              <th className="px-3 py-2 text-left">Gambar</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-3 py-4 text-center text-gray-500">
                  Memuat data artikel...
                </td>
              </tr>
            ) : paginatedArtikel.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-3 py-4 text-center text-gray-500">
                  Tidak ada artikel ditemukan.
                </td>
              </tr>
            ) : (
              paginatedArtikel.map((item, index) => (
                <tr key={item.uuid} className="hover:bg-gray-50 border-t">
                  <td className="px-3 py-2">{startIndex + index + 1}</td>
                  <td className="px-3 py-2 font-medium">{item.judul}</td>
                  <td className="px-3 py-2">{item.penulis}</td>
                  <td className="px-3 py-2">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="px-3 py-2">
                    {item.gambar ? (
                      <img src={item.gambar} alt="gambar" className="w-12 h-12 object-cover rounded-md" />
                    ) : (
                      <span className="text-gray-400">Tidak ada</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-lg space-x-2">
                    <button onClick={() => openModal(item)} className="text-yellow-600 hover:text-yellow-800">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(item.uuid)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalItems > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
            <span>
              {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} dari {totalItems}
            </span>
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ‹
              </button>
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-pink-200 relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">{isEditing ? 'Edit Artikel' : 'Tambah Artikel'}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="judul" className="block text-sm font-semibold mb-1 text-gray-700">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg px-4 py-2 outline-none"
                  placeholder="Judul artikel"
                />
              </div>

              <div>
                <label htmlFor="isi" className="block text-sm font-semibold mb-1 text-gray-700">
                  Isi Artikel
                </label>
                <textarea
                  id="isi"
                  name="isi"
                  value={formData.isi}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full border border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg px-4 py-2 outline-none resize-none"
                  placeholder="Tulis isi artikel di sini..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="gambar_file" className="block text-sm font-semibold mb-1 text-gray-700">
                  Upload Gambar
                </label>
                <input
                  type="file"
                  id="gambar_file"
                  name="gambar_file"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-pink-600 file:text-white hover:file:bg-pink-700 transition"
                />
              </div>

              <div>
                <label htmlFor="penulis" className="block text-sm font-semibold mb-1 text-gray-700">
                  Penulis
                </label>
                <input
                  type="text"
                  id="penulis"
                  name="penulis"
                  value={formData.penulis}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg px-4 py-2 outline-none"
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <label htmlFor="tanggal" className="block text-sm font-semibold mb-1 text-gray-700">
                  Tanggal Artikel
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-pink-500 focus:ring-pink-500 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
                  {isEditing ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artikel;
