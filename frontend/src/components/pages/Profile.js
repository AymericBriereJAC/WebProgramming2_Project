import Cookies from "js-cookie";

/**
 * Page for showing a user's profile
 * @page
 */
export default function Profile() {
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-full">
      <p>Most recent search:</p>
      {Cookies.get("searchQuery")}
    </div>
  );
}
