"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext"; // تأكد من المسار الصحيح
import { BarLoader } from "react-spinners";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useUser();
  const router = useRouter(); // هنا بيتم استخدام useRouter بعد ما تأكدنا إننا في بيئة العميل

  useEffect(() => {
    if (loading) {
      // نعرض loading بشكل مبدئي حتى يتم تحميل المستخدم
      return; // لا ترجع محتوى صفحة خلال التحميل
    }

    if (!user) {
      // إذا المستخدم مش موجود نوجهه لصفحة تسجيل الدخول
      router.push("/signin");
    } else if (adminOnly && !user.isAdmin) {
      // إذا كانت الصفحة للإدمن فقط
      router.push("/out");
    }
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return (
      <>
        <div className="loading-overlay">
          <BarLoader color={"#d60096"} loading={loading} size={350} />
        </div>
      </>
    );
  }

  return children; // إرجاع المحتوى فقط إذا كان المستخدم له الصلاحيات
}
