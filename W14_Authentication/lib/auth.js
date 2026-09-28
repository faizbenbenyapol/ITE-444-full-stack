//lib/auth.js
 
 
import { cookies } from "next/headers";
 
export async function createSession(user) {
 
    const cookieStore = await cookies();
 
    cookieStore.set(
        "session",
        JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 วัน
            path: "/",
        }
    );
}
 
export async function getSession() {
 
    const cookieStore = await cookies();
 
    const session = cookieStore.get("session");
 
    if (!session) {
        return null;
    }
 
    try {
        return JSON.parse(session.value);
    } catch {
        return null;
    }
}
 
export async function deleteSession() {
 
    const cookieStore = await cookies();
 
    cookieStore.delete("session");
}