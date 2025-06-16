import ListMenu2 from "./ListMenu2";
export default function Sidebar() {
    return (
        <div id="sidebar" className="flex justify-between items-center p-6 bg-white shadow">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="text-2xl font-bold text-blue-800">
                    </span>
            </div>
            {/* List Menu */}
             <ListMenu2/>
        </div>
    );
}
