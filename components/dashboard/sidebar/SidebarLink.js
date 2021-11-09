import Link from "next/link";

const SidebarLink = ({ href, label, isActive }) => {
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        isActive && "bg-gray-900"
      }`}
    >
      <Link href={href}>
        <a
          className={`block text-gray-200 hover:text-white transition duration-150 ${
            isActive && "hover:text-gray-200"
          }`}
        >
          <div className="flex flex-grow">
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
              <path
                className={`fill-current text-gray-400 ${
                  isActive && "text-indigo-500"
                }`}
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
              />
              <path
                className={`fill-current text-gray-600 ${
                  isActive && "text-indigo-600"
                }`}
                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
              />
              <path
                className={`fill-current text-gray-400 ${
                  isActive && "text-indigo-200"
                }`}
                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
              />
            </svg>
            <span className="text-sm font-medium">{label}</span>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SidebarLink;
