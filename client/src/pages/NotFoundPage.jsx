import React from "react";

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-6">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg opacity-80">Under Maintenance: This page is currently being updated. Stay tuned! 🚧</p>
        </div>
    );
}

export default NotFoundPage;