'use client'

import { useEffect } from "react";

export default function Error({ // предполагается, что никто не будет нарочно удалять данные из localStorage через DevTools
  error,
}: {
  error: Error
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Что-то пошло не так...</h2>
      <a
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        href={'/'}
      >
        Перезагрузить страницу
      </a>
    </main>
  );
}