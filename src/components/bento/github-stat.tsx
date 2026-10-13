"use client";

import { useEffect, useState } from "react";

// TODO: replace with the real GitHub username.
const GITHUB_USERNAME = "your-github-username";

type GithubUser = { public_repos: number; followers: number };

export function GithubStat() {
  const [stats, setStats] = useState<GithubUser | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: GithubUser) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">GitHub</h3>
      {failed ? (
        <p className="mt-3 text-stone">Unavailable</p>
      ) : (
        <p className="font-display mt-3 text-4xl text-bone tabular-nums">
          {stats ? stats.public_repos : "—"}
          <span className="ml-2 text-base text-stone">repos</span>
        </p>
      )}
    </div>
  );
}
