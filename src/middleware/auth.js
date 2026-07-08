  import { redirect } from "react-router-dom";

  export function auth() {
    const token = localStorage.getItem("token");

    if (!token) {
      return redirect("/login");
    }

    return null;
  }

  export function adminAuth() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return redirect("/login");
    if (role !== "admin") return redirect("/");

    return null;
  }