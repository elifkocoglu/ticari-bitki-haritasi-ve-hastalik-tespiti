import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, limit } from "firebase/firestore";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "E-posta ve şifre zorunludur" }, { status: 400 });
  }
  try {
    // Check if user exists
    const q = query(collection(db, "users"), where("email", "==", email), limit(1));
    const exists = await getDocs(q);
    if (!exists.empty) return NextResponse.json({ error: "Bu e-posta zaten kayıtlı" }, { status: 400 });

    // Create user
    const id = randomUUID();
    await addDoc(collection(db, "users"), { id, email, password, name, provider: "credentials" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}



