// 개별 항목 및 즐겨찾기 버튼 (useCallback 바인딩)
"use client";

import { memo } from "react";

export default memo(function StudyItem({ item, isFavorite, onToggleFavorite }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#fff",
        marginBottom: "12px",
        listStyle: "none",
      }}
    >
      <div style={{ flex: 1, paddingRight: "15px" }}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>
          {item.title}
        </h3>

        <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 8px 0", lineHeight: "1.5" }}>
          {item.desc}
        </p>

        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
          분류: {item.category} / 난이도: {item.level || "basic"}
        </p>
      </div>

      <button
        onClick={() => onToggleFavorite(item.id)}
        style={{
          padding: "8px 14px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          backgroundColor: "#fff",
          color: "#334155",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}
      >
        {isFavorite ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
      </button>
    </li>
  );
});
