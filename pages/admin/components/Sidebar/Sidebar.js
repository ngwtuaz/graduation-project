import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaClipboardList } from "react-icons/fa6";
import NotificationDropdown from "../../components/Dropdowns/NotificationDropdown";
import UserDropdown from "../../components/Dropdowns/UserDropdown.js";
import Image from 'next/image';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link href="/" className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 flex justify-center">
            <Image
              src="https://img.upanh.tv/2024/11/07/logoad.png"
              alt="Logo"
              width={1000} // Next.js không hỗ trợ 'auto' cho width, nhưng bạn có thể để width tự động dựa trên ảnh
              height={1000} // h-16 tương đương với 4rem hoặc 64px
              className="h-16 w-auto" // Chỉ áp dụng chiều cao với Tailwind
            />
          </Link>



          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/" className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    Nhà Sách Thiên Lý
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h5 className="md:min-w-full text-blueGray-500 text-ls uppercase font-bold block pt-1 pb-4 no-underline">
              QUẢN LÝ
            </h5>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {[
                { href: "/admin/dashboard", icon: "fas fa-tv", label: "Tổng quan" },
                { href: "/admin/categories", icon: "fas fa-list", label: "Danh mục-Thể loại" },
                { href: "/admin/products", icon: "fas fa-book", label: "Sách" },
                { href: "/admin/users", icon: "fas fa-user", label: "Người dùng" },
                { href: "/admin/orders", icon: "fa-solid fa-check", label: "Đơn hàng" },
              ].map(({ href, icon, label }) => {
                const isActive = router.pathname.includes(href);
                return (
                  <li
                    className={`items-center ${isActive ? "bg-cyan-500 text-white rounded-md" : ""
                      }`}
                    key={href}
                  >
                    <Link
                      href={href}
                      className={`text-xs uppercase py-3 px-4 font-bold block ${isActive
                          ? "text-white hover:text-white"
                          : "text-blueGray-700 hover:text-blueGray-500"
                        }`}
                    >
                      <i
                        className={`${icon} mr-2 text-sm ${isActive ? "text-white" : "text-blueGray-300"
                          }`}
                      ></i>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>



            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-ls uppercase font-bold block pt-1 pb-4 no-underline">
              Thống kê
            </h6> */}
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {/* <li className="items-center">
                <Link href="/admin/thong-ke/doanh-thu" className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                  <i className="fa fa-money text-blueGray-400 mr-2 text-sm"></i>
                  Doanh thu
                </Link>
              </li> */}
              {/* <li className="items-center">
                <Link href="/thong-ke/don-hang" className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                  Đơn hàng
                </Link>
              </li> */}
            </ul>

            {/* Divider */}
            {/* <hr className="my-4 md:min-w-full" /> */}
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6> */}
            {/* Navigation */}
            {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/landing" className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                  Landing Page
                </Link>
              </li>
              <li className="items-center">
                <Link href="/profile" className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>
                  Profile Page
                </Link>
              </li>
            </ul> */}

            {/* Divider */}
            {/* <hr className="my-4 md:min-w-full" /> */}
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Documentation
            </h6> */}
            {/* Navigation */}
            {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {[
                { href: "https://www.creative-tim.com/learning-lab/tailwind/nextjs/colors/notus", icon: "fas fa-paint-brush", label: "Styles" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus", icon: "fab fa-css3-alt", label: "CSS Components" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus", icon: "fab fa-angular", label: "Angular" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus", icon: "fab fa-js-square", label: "Javascript" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus", icon: "fab fa-react", label: "NextJS" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus", icon: "fab fa-react", label: "React" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus", icon: "fas fa-link", label: "Svelte" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus", icon: "fas fa-link", label: "Vue" },
              ].map(({ href, icon, label }) => (
                <li className="items-center" key={href}>
                  <Link href={href} className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    <i className={`${icon} mr-2 text-sm text-blueGray-400`}></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
