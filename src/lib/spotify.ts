export interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  progress_ms?: number;
}

export interface SpotifyNowPlayingData {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
  currently_playing_type: string;
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played";

async function getAccessToken(): Promise<string | null> {
  const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    return null;
  }

  const basic = btoa(`${client_id}:${client_secret}`);

  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.access_token;
  } catch {
    return null;
  }
}

export async function getCurrentlyPlaying(): Promise<SpotifyNowPlayingData | null> {
  try {
    const access_token = await getAccessToken();
    if (!access_token) return null;

    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204) {
      return { is_playing: false, item: null, progress_ms: 0, currently_playing_type: "track" };
    }

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getRecentlyPlayed(): Promise<SpotifyTrack | null> {
  try {
    const access_token = await getAccessToken();
    if (!access_token) return null;

    const response = await fetch(`${SPOTIFY_RECENTLY_PLAYED_URL}?limit=1`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.items?.[0]?.track || null;
  } catch {
    return null;
  }
}

export function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getBestImage(images: Array<{ url: string; height: number; width: number }>): string {
  if (!images?.length) return "";
  const sorted = images.sort((a, b) => (b.height || 0) - (a.height || 0));
  const preferred = sorted.find((img) => (img.height || 0) <= 640 && (img.height || 0) >= 300);
  return preferred?.url || sorted[0]?.url || "";
}
