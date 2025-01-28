import Image from "next/image";
import React from "react";

const AccessForbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="absolute z-10 text-center">
        <h1 className="text-xl font-bold text-red-600">مسار غير صحيح!</h1>
        <p className="text-lg mt-2 text-gray-600">لقد حاولت الوصول إلى صفحة غير موجودة.</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <link href="/" >
          العودة إلى الصفحة الرئيسية
          </link>
        </button>
      </div>
      <div className="absolute z-0">
        <Image
          src="../image/Access forbidden 403.jfif"
          alt="403"
          height={150}
          width={150}
          className="sm:w-1/3 md:w-1/4 lg:w-1/5"
        />
      </div>
    </div>
  );
};

export default AccessForbidden;
