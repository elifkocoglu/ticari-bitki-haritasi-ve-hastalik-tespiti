import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, limit } from "firebase/firestore";
import { readFile } from "fs/promises";
import path from "path";

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), "data", "users.json");
    const raw = await readFile(filePath, "utf-8");
    const users = JSON.parse(raw) as any[];
    let inserted = 0;
    for (const u of users) {
      const q = query(collection(db, "users"), where("email", "==", u.email), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, "users"), {
          id: u.id,
          email: u.email,
          password: u.password,
          name: u.name,
          provider: u.provider || "credentials",
        });
        inserted++;
      }
    }
    return NextResponse.json({ ok: true, inserted });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Göç işlemi başarısız" }, { status: 500 });
  }
}





