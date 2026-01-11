import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, MoveUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { BlogPost } from "../../types/portfolio";

const GRADIENT_IMAGES = [
  "/assets/gradient2.jpg",
  "/assets/gradient3.jpg",
  "/assets/gradient1.jpg",
  "/assets/gradient4.jpg",
];

const INITIAL_SHOW_COUNT = 4;

interface BlogProps {
  blogs: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  const { colors, mode } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const displayedBlogs = showAll ? blogs : blogs.slice(0, INITIAL_SHOW_COUNT);
  const hasMore = blogs.length > INITIAL_SHOW_COUNT;

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.secondary}, ${colors.primary})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Thoughts & Writing
          </h2>
        </div>

        <motion.div
          className="space-y-2 sm:space-y-3"
          variants={ANIMATION.cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayedBlogs.map((blog, index) => (
            <motion.a
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              variants={ANIMATION.cardItem}
              whileHover={{ x: 4 }}
              className="flex gap-3 sm:gap-4 rounded-xl border p-2.5 sm:p-3 transition-all group backdrop-blur-md cursor-pointer"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${colors.primary}50`;
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)";
              }}
            >
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                <img
                  src={GRADIENT_IMAGES[index % 3]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-1.5">
                  <img
                    src={blog.coverImage || "/assets/gradient1.jpg"}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-md shadow-lg transition-all duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0">
                <div>
                  <h3
                    className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1 transition-colors line-clamp-2"
                    style={{ color: colors.foreground }}
                  >
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs mb-1 sm:mb-2" style={{ color: `${colors.foreground}80` }}>
                    <span>{blog.date}</span>
                    {blog.readingTime && (
                      <span className="flex items-center gap-0.5 sm:gap-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {blog.readingTime}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                        color: `${colors.foreground}99`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <MoveUpRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors flex-shrink-0 self-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: `${colors.foreground}50` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {hasMore && (
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer"
              style={{
                background: mode === "dark" ? `${colors.secondary}15` : `${colors.secondary}10`,
                borderColor: mode === "dark" ? `${colors.secondary}30` : `${colors.secondary}20`,
                color: mode === "dark" ? colors.highlight : colors.primary,
              }}
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Show {blogs.length - INITIAL_SHOW_COUNT} more
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
