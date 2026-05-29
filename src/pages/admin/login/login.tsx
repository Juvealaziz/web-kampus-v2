import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login_page() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: form.email,
        password: form.password,
      });

      console.log(response.data);

      // simpan user
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.token);

      alert("Login berhasil");
      navigate("/admin-dashboard");
    } catch (error: any) {
      console.log(error.response);

      alert("Email atau password salah");
    }
  };
  return (
    <div className="w-full h-[800px] bg-gray-200">
      <div className="container mx-auto">
        <div className="text-xl flex justify-center py-16">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.fe7R4T4pI_tg0sbo6XDs1gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt=""
            className="border-2xl w-20 h-20 mix-blend-darken"
          />
          <span className="flex gap-2 text-4xl font-bold py-6 ml-4 font-['Space_Grotesk']">
            Unisap{" "}
            <p className="text-slate-500 font-['Space_Grotesk']">ac.id</p>
          </span>
        </div>
        <form
          onSubmit={handleLogin}
          className="-mt-12 bg-white shadow-2xl w-[400px] h-[500px] md:w-[500px] flex flex-col md:h-[500px] items-center mx-auto rounded-lg  border-blue-300 border"
        >
          <div className="text-sm mx-auto p-6 ">
            <span>
              Login Management System Universitas San Pedro, guna mengelola data
              konten pada web resmi UNISAP
            </span>
          </div>

          <div className="w-full p-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={form.email}
                onChange={handleChange}
                className="h-9 p-2 shadow-xl border border-black/40 rounded-base"
                name="email"
                id=""
                placeholder="masukan Email....."
              />
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange}
                className="h-9 p-2 shadow-xl border border-black/40 rounded-base"
                name="password"
                id=""
                placeholder="masukan Pasword....."
              />
            </div>

            <div className="flex flex-col gap-2 md:mt-6 mt-6">
              <label htmlFor="">Submit</label>
              <button
                type="submit"
                className="bg-blue-400 border border-white/10 rounded-base p-2 h-9 hover:bg-blue-500 text-white"
              >
                Log in
              </button>
            </div>
            {/*}
            <div className="flex flex-col gap-2 md:mt-12 mt-2">
              <a href="" className="text-sm">
                Lupa Password Anda?
              </a>
            </div>
            */}
          </div>
        </form>
        {/* Copyright */}
        <p className="text-gray-400 text-sm text-center mt-8">
          © 2026 Universitas San Pedro.
        </p>
      </div>
    </div>
  );
}
