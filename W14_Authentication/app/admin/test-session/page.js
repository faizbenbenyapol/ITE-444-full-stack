//test-session/page.js
 
 
import { getSession } from "@/lib/auth";
import { logout } from "@/app/logout/actions";
 
export default async function AdminPage() {
 
    const session = await getSession();
 
    return (
        <div className="container mt-5">
 
            <h1>Test Session </h1>
 
            <hr />
 
            {session && (
                <>
                    <p>ID: {session.id}</p>
                    <p>Name: {session.name}</p>
                    <p>Email: {session.email}</p>
                    <p>Role: {session.role}</p>
 
                    <form action={logout}>
                        <button
                            type="submit"
                            className="btn btn-danger"
                        >
                            Logout
                        </button>
                    </form>
                </>
            )}
 
        </div>
    );
}