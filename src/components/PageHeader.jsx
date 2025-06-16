export default function PageHeader({title, breadcrumb,children}) {
    return (
        <div className="flex justify-between p-4">
            <div>
                <h1 className="text-3xl font-semibold">{title}</h1>
                <div className="text-gray-500">{breadcrumb}</div>
            </div>
            <div>{children}</div>
        </div>
    );
}