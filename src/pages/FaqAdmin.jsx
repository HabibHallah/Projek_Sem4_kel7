import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FiEdit, FiTrash2 } from "react-icons/fi";


const ITEMS_PER_PAGE = 5;

const FaqPage = () => {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ pertanyaan: '', jawaban: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('id', { ascending: true });

    if (!error) setFaqList(data);
    setLoading(false);
  };

  const openModal = (item = null) => {
    if (item) {
      setFormData({ pertanyaan: item.pertanyaan, jawaban: item.jawaban });
      setIsEditing(true);
      setEditingId(item.id);
    } else {
      setFormData({ pertanyaan: '', jawaban: '' });
      setIsEditing(false);
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await supabase.from('faq').update(formData).eq('id', editingId);
    } else {
      await supabase.from('faq').insert([formData]);
    }

    closeModal();
    fetchFaq();
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus FAQ ini?')) {
      await supabase.from('faq').delete().eq('id', id);
      fetchFaq();
    }
  };

  const totalFaq = faqList.length;
  const totalPages = Math.ceil(totalFaq / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFaqs = faqList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen FAQ</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#7F55B1] text-white px-4 py-2 rounded-md hover:bg-[#6e46a2] transition"
        >
          + Tambah FAQ
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Pertanyaan</th>
              <th className="px-3 py-2 text-left">Jawaban</th>
              <th className="px-3 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-3 py-4 text-center text-gray-500">
                  Memuat...
                </td>
              </tr>
            ) : currentFaqs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-3 py-4 text-center text-gray-500">
                  Tidak ada data FAQ.
                </td>
              </tr>
            ) : (
              currentFaqs.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 border-t">
                  <td className="px-3 py-2">{startIndex + index + 1}</td>
                  <td className="px-3 py-2">{item.pertanyaan}</td>
                  <td className="px-3 py-2">{item.jawaban}</td>
                 <td className="px-3 py-2 text-center text-lg">
  <div className="flex justify-center items-center space-x-2">
    <button
      onClick={() => openModal(item)}
      className="text-yellow-600 hover:text-yellow-800"
      title="Edit"
    >
      <FiEdit />
    </button>
    <button
      onClick={() => handleDelete(item.id)}
      className="text-red-600 hover:text-red-800"
      title="Hapus"
    >
      <FiTrash2 />
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalFaq > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
            <span>
              {`${startIndex + 1}–${Math.min(
                startIndex + ITEMS_PER_PAGE,
                totalFaq
              )} dari ${totalFaq}`}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ‹
              </button>
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit FAQ' : 'Tambah FAQ'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Pertanyaan</label>
                <input
                  type="text"
                  name="pertanyaan"
                  value={formData.pertanyaan}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jawaban</label>
                <textarea
                  name="jawaban"
                  value={formData.jawaban}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border rounded-md px-3 py-2"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#7F55B1] text-white hover:bg-[#6e46a2]"
                >
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

export default FaqPage;
