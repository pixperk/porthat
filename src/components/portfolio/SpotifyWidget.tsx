import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient } from "../../lib/themes";
import { getCurrentlyPlaying, getRecentlyPlayed, getBestImage, type SpotifyTrack } from "../../lib/spotify";

export default function SpotifyWidget() {
  const { colors, mode } = useTheme();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const nowPlaying = await getCurrentlyPlaying();
        if (nowPlaying?.item) {
          setTrack(nowPlaying.item);
          setIsPlaying(nowPlaying.is_playing);
        } else {
          const recent = await getRecentlyPlayed();
          if (recent) {
            setTrack(recent);
            setIsPlaying(false);
          }
        }
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !track) return null;

  const albumArt = getBestImage(track.album.images);
  const artistNames = track.artists.map((a) => a.name).join(", ");

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Music className="w-4 h-4" style={{ color: "#1DB954" }} />
          <span className="text-xs sm:text-sm" style={{ color: `${colors.foreground}99` }}>
            {isPlaying ? "Now playing on" : "Last played on"}{" "}
            <span style={{ color: "#1DB954" }} className="font-medium">Spotify</span>
          </span>
        </div>

        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 group"
        >
          <div className="relative flex-shrink-0">
            <img
              src={albumArt}
              alt={track.album.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shadow-lg"
            />
            {isPlaying && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center">
                <div className="flex gap-0.5">
                  <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-white rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-white rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-medium text-sm sm:text-base truncate group-hover:underline"
              style={{ color: colors.foreground }}
            >
              {track.name}
            </p>
            <p className="text-xs sm:text-sm truncate" style={{ color: `${colors.foreground}80` }}>
              {artistNames}
            </p>
            <p className="text-xs truncate" style={{ color: `${colors.foreground}60` }}>
              {track.album.name}
            </p>
          </div>
        </a>
      </div>
    </motion.section>
  );
}
