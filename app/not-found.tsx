import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full h-full flex items-center justify-center max-sm:p-4 p-8 bg-gradient-to-br from-red-500 to-purple-700">
      <div className="bg-gray-300 p-5 border-4 text-xl border-solid border-blue-500 rounded-lg">
        <h2 className="font-bold text-3xl text-center mb-2">
          Страница не найдена.
        </h2>
        <p className="mb-6">Запрашиваемой страницы не существует.</p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="p-2 border-2 border-solid border-white bg-blue-500 text-white rounded-lg"
          >
            Меню
          </Link>
        </div>
      </div>
    </main>
  );
}
