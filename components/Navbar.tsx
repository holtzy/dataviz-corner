import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav id="header" className="w-full  h-24">
        <div
          className={"flex flex-wrap items-center justify-between mt-2 py-2"}
        >
          <div className="flex items-center">
            <Link href="/">
              <span className="ml-2 text-white text-md lg:text-md cursor-pointer">
                Octopus
              </span>
            </Link>
          </div>

          <div className="">
            {/* <Link href="how-to">
              <span className="pl-8 text-white font-light text-sm lg:text-md uppercase tracking-wider cursor-pointer">
                How to...
              </span>
            </Link> */}
            <Link href="/all">
              <span className="hidden cursor-pointer sm:inline pl-8 text-white font-light text-sm lg:text-md uppercase tracking-wider hover:text-reactGallery">
                All
              </span>
            </Link>

            {/* <a href="#">
              <span className="hidden sm:inline pl-8 text-white font-light text-sm lg:text-md uppercase tracking-wider cursor-not-allowed">
                Related
              </span>
            </a> */}
            <Link href="about">
              <span className="hidden cursor-pointer sm:inline pl-8 text-white font-light text-sm lg:text-md uppercase tracking-wider hover:text-reactGallery">
                About
              </span>
            </Link>

            <Link href="subscribe">
              <span className="hidden cursor-pointer sm:inline pl-8 text-white font-light text-sm lg:text-md uppercase tracking-wider hover:text-reactGallery">
                Subscribe
              </span>
            </Link>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
    </>
  );
}
