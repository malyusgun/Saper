"use client";

import { useEffect } from "react";

export default function Error({
  // предполагается, что никто не будет нарочно удалять данные из localStorage через DevTools
  error,
}: {
  error: Error;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="w-full h-full flex items-center justify-center max-sm:p-4 p-8 bg-gradient-to-br from-red-500 to-purple-700">
      <div className="bg-gray-300 p-5 border-4 text-xl border-solid border-blue-500 rounded-lg">
        <h2 className="text-center mb-4">Что-то пошло не так...</h2>
        <a
          className="inline-block w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          href={"/"}
        >
          Перезагрузить страницу
        </a>
      </div>
    </main>
  );
}
