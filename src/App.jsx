import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-grow">
        <Sider isOpen={isSidebarOpen} />
        <div className="flex-grow">
          <Header toggleSidebar={toggleSidebar} />
          <Main />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Sider({ isOpen }) {
  return (
    <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'collapsed'} transition-width duration-300 p-6`}>
      <h1 className="text-xl font-semibold mb-6">Admin Panel</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block hover:text-blue-400">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-400">Users</a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-400">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button className="text-gray-600" onClick={toggleSidebar}>
        {toggleSidebar ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h8M8 12h8m-8 6h8" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6l6 6-6 6" />
          </svg>
        )}
      </button>
      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Log Out</button>
    </header>
  );
}

function Main() {
  const [mahasiswaList, setMahasiswaList] = useState([
    { id: 1, nama: 'Gendon', umur: 20 },
    { id: 2, nama: 'Gondrong Memet', umur: 22 }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newUmur, setNewUmur] = useState('');
  const [editId, setEditId] = useState(null);

  const tambahMahasiswa = () => {
    const newMahasiswa = {
      id: mahasiswaList.length + 1,
      nama: newNama,
      umur: newUmur
    };
    setMahasiswaList([...mahasiswaList, newMahasiswa]);
    resetForm();
  };

  const editMahasiswa = () => {
    const updatedMahasiswaList = mahasiswaList.map(mahasiswa =>
      mahasiswa.id === editId ? { ...mahasiswa, nama: newNama, umur: newUmur } : mahasiswa
    );
    setMahasiswaList(updatedMahasiswaList);
    resetForm();
  };

  const resetForm = () => {
    setNewNama('');
    setNewUmur('');
    setEditId(null);
    setModalVisible(false);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data ini akan dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus'
    }).then((result) => {
      if (result.isConfirmed) {
        setMahasiswaList(mahasiswaList.filter(mahasiswa => mahasiswa.id !== id));
        Swal.fire('Dihapus!', 'Data mahasiswa berhasil dihapus.', 'success');
      }
    });
  };

  return (
    <main className="p-6 bg-white flex-grow">
      <h2 className="text-2xl font-semibold mb-4">Daftar Mahasiswa</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 mb-4"
        onClick={() => setModalVisible(true)}
      >
        Tambah Nama
      </button>

      <table className="table-auto w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Umur</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map((mahasiswa, index) => (
            <tr key={mahasiswa.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{mahasiswa.nama}</td>
              <td className="px-4 py-2">{mahasiswa.umur}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 mr-2"
                  onClick={() => {
                    setEditId(mahasiswa.id);
                    setNewNama(mahasiswa.nama);
                    setNewUmur(mahasiswa.umur);
                    setModalVisible(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                  onClick={() => confirmDelete(mahasiswa.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Tambah / Edit Mahasiswa */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal p-6 bg-white rounded-md">
            <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h2>
            <input
              type="text"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
              placeholder="Nama"
              className="w-full mb-4 border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              value={newUmur}
              onChange={(e) => setNewUmur(e.target.value)}
              placeholder="Umur"
              className="w-full mb-4 border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={resetForm}
              >
                Batal
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                onClick={editId ? editMahasiswa : tambahMahasiswa}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm">
      &copy; 2024 maaleast
    </footer>
  );
}

export default App;
