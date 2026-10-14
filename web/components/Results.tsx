"use client";
import { stories } from "@/lib/content";
import { caseVideos, openVideo } from "@/lib/video";

// Cards de resultado ao lado dos depoimentos: campanha real, destaque e atalho para o vídeo do case.
export default function Results() {
  return (
    <div className="results">
      <span className="small muted results-title reveal">{stories.resultsTitle}</span>
      <div className="results-grid">
        {stories.results.map((r, i) => (
          <button
            type="button"
            key={r.brand}
            className="result reveal"
            style={{ ["--i" as string]: i }}
            onClick={() => openVideo(caseVideos, r.video)}
            aria-label={`Ver o vídeo do case ${r.brand}: ${r.campaign}`}
          >
            <span className="result-thumb" style={{ backgroundImage: `url(${caseVideos[r.video]?.poster})` }}>
              <span className="result-play">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5.5v13l10.5-6.5Z" fill="#000" />
                </svg>
              </span>
            </span>
            <span className="result-body">
              <span className="result-brand">{r.brand}</span>
              <b className="result-highlight">{r.highlight}</b>
              <span className="result-campaign">{r.campaign}</span>
              <span className="result-text">{r.text}</span>
              <span className="result-link">Ver vídeo →</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
