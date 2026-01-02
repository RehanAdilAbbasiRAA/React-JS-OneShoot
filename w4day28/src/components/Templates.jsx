import React, { useState, useEffect } from "react";
import { getAllTemplates } from "../api/dashboardApi"; //To update data (dispatch login/logout):
// import { useSelector } from "react-redux"; // Import
import { useQuery } from "@tanstack/react-query";

// Example template data
// const initialTemplates = Array.from({ length: 20 }).map((_, i) => ({
//   id: i + 1,
//   name: `Template ${i + 1}`,
//   img: `/template${(i % 4) + 1}.png`,
//   views: Math.floor(Math.random() * 500),
//   clipped: Math.floor(Math.random() * 100),
//   likes: Math.floor(Math.random() * 200),
//   rating: (Math.random() * 5).toFixed(1),
// }));

const Templates = () => {
  // const { isAuthenticated, user, user_data } = useSelector(
  //   (state) => state.auth
  // );

  const [visibleCount, setVisibleCount] = useState(8); // instead of templates array
  const [filter, setFilter] = useState("views");

  const {
    data: templatesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTemplates"],
    queryFn: () => getAllTemplates(),
    // enabled: !!user_data?.email,
  });
  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <div>Loading templates...</div>;
  if (isError) return <div>Error loading templates</div>;
  if (!templatesData.length) return <div>No templates found</div>;
  // Sorting
  // const sortedTemplates = [...templatesData].sort((a, b) => b[filter] - a[filter]).slice(0, visibleCount);;
  const sortedTemplates = [...templatesData] //Creates a copy of template Data
    .sort((a, b) => b.stats[filter] - a.stats[filter])
    .slice(0, visibleCount);

//     | Return value | Meaning              |
// | ------------ | -------------------- |
// | `< 0`        | `a` comes AFTER `b`  |
// | `> 0`        | `a` comes BEFORE `b` |
// | `0`          | keep order           |


  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Templates
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("views")}
            className={`px-3 py-1 rounded-lg border ${
              filter === "views"
                ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                : "text-[var(--color-text)] border-[var(--color-border)]"
            }`}
          >
            Views
          </button>
          <button
            onClick={() => setFilter("clips")}
            className={`px-3 py-1 rounded-lg border ${
              filter === "clipped"
                ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                : "text-[var(--color-text)] border-[var(--color-border)]"
            }`}
          >
            Clipped
          </button>
          <button
            onClick={() => setFilter("likes")}
            className={`px-3 py-1 rounded-lg border ${
              filter === "likes"
                ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                : "text-[var(--color-text)] border-[var(--color-border)]"
            }`}
          >
            Likes
          </button>
        </div>
      </div>

      {isLoading ? (
        "No Templates Found"
      ) : (
        <>
          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[var(--color-card)] rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top Stats */}
                <div className="flex justify-between p-2 bg-[var(--color-primary)] text-[var(--color-text)] text-xs font-semibold">
                  <span>Views: {template.stats.views}</span>
                  <span>Clipped: {template.stats.clips}</span>
                  <span>Likes: {template.stats.likes}</span>
                </div>

                {/* Image */}
                <img
                  src={template.preview_image}
                  alt={template.name}
                  className="w-full h-40 object-cover"
                />

                {/* Footer / rating */}
                <div className="p-3 flex justify-between items-center">
                  <h3 className="font-semibold text-[var(--color-text)]">
                    {template.name}
                  </h3>
                  <span className="text-sm text-[var(--color-text)]">
                    {template.stats.avg_rating} ★
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Load More Button (optional for infinite scroll backup) */}
      {visibleCount < templatesData.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-active)] hover:text-[var(--color-primary)] transition duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Templates;
