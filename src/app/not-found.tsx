function NotFoundPage() {
  return (
    <div className="w-full h-full text-center flex justify-center items-center">
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-semibold">404</h2>
        <div className="text-gray-400">This page could not be found</div>
        <a href="./">
          <button className="btn mt-4 flex gap-1 w-fit">
            <div>Home</div>
          </button>
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
