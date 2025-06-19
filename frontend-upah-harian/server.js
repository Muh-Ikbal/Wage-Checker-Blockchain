import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { supabase } from "./lib/SupabaseClient.js"; // pastikan file ini benar dan berisi supabase client

const app = express();
const PORT = 3001;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = password === user.password;
    console.log(match);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/pekerja", async (req, res) => {
  try {
    const { data: pekerja, error } = await supabase.from("pekerja").select("*");

    if (error || !pekerja) {
      return res.status(404).json({ message: "Data pekerja tidak ditemukan" });
    }

    res.status(200).json(pekerja); // Kirim data langsung sebagai array
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});
app.post("/api/pekerja", async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "ID dan nama wajib diisi" });
  }

  try {
    const { error } = await supabase.from("pekerja").insert([{ id, name }]);
    if (error) throw error;

    res.status(201).json({ message: "Pekerja berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/pekerja/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama wajib diisi" });
  }

  try {
    const { error } = await supabase
      .from("pekerja")
      .update({ name })
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Pekerja berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/api/pekerja/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("pekerja").delete().eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Pekerja berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/api/pekerja/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const { data, error } = await supabase
      .from("pekerja")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Pekerja tidak ditemukan" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data pekerja" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
