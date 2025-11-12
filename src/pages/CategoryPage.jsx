import React from "react";
import { useParams } from "react-router-dom";

const allServices = [
  { name: "React Course", category: "Web Development" },
  { name: "Photoshop Basics", category: "Graphic Design" },
  { name: "SEO Strategies", category: "Digital Marketing" },
  { name: "Blog Writing", category: "Content Writing" },
  { name: "Flutter App", category: "App Development" },
  { name: "Figma UI Kit", category: "UI/UX Design" },
  { name: "SEO Advanced", category: "SEO Optimization" },
  { name: "Video Editing 101", category: "Video Editing" }
];

export default function CategoryPage() {
  const { categoryName } = useParams();
  const filteredServices = allServices.filter(
    (service) => service.category === categoryName
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow"
            >
              {service.name}
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No services found.</p>
        )}
      </div>
    </div>
  );
}
