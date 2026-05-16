import SessionTimer from "./SessionTimer";

function Navbar() {

  return (

    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <SessionTimer />
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg"
        />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

          S

        </div>

      </div>
      <button
        onClick={() => {

          localStorage.clear();

          window.location.href = "/";
        }}

        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >

        Logout

      </button>

    </div>
  );
}

export default Navbar;