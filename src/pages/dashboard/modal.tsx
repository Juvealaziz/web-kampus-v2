import { useState, useEffect } from "react";
import axios from "axios";
export default function Modal({ onClose, selectedUser }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (selectedUser) {
      setForm({
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
      });
    }
  }, [selectedUser]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);

      if (form.password) {
        formData.append("password", form.password);
      }

      // EDIT
      if (form.id) {
        formData.append("_method", "PUT");

        await axios.post(
          `http://127.0.0.1:8000/api/users/${form.id}`,
          formData,
        );

        alert("Berhasil diupdate");
      }

      // CREATE
      else {
        await axios.post("http://127.0.0.1:8000/api/users", formData);

        alert("Berhasil ditambah");
      }

      window.location.reload();
    } catch (error: any) {
      console.log(error.response?.data);

      alert("Terjadi kesalahan");
    }
  };
  return (
    <div className="bg-white w-[400px] rounded-2xl p-6 shadow-lg">
      <h1 className="text-lg font-bold mb-4">Tambah User</h1>

      <input
        type="text"
        placeholder="Nama"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        className="w-full border p-2 rounded-lg mb-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="w-full border p-2 rounded-lg mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
        className="w-full border p-2 rounded-lg mb-4"
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border">
          Batal
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {form.id ? "Update" : "Simpan"}
        </button>
      </div>
    </div>
  );
}
