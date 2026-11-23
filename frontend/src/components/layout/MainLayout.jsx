
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Sidebar />

      <main className="ml-[238px] min-h-screen max-[1000px]:ml-[205px] max-[650px]:ml-0">
        <Header />

        <div className="max-w-[1450px] mx-auto p-8 max-[1000px]:p-[25px] max-[650px]:px-[14px] max-[650px]:py-5">
          {children}
        </div>
      </main>
    </div>
  );
}
