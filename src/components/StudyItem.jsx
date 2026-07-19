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

        {/* 
          [미션 1 연동 포인트]
          - 부모 컴포넌트에서 선택한 category(전체, concept, library, hook)와 
            매칭되어 최종 필터링을 거쳐 살아남은 항목의 카테고리 정보가 표시됩니다.
        */}
        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
          분류: {item.category} {/* 미션 1의 카테고리 분류 기준에 해당함 */}
        </p>
      </div>

      {/* 미션 1과 직접적인 관계가 없는 즐겨찾기 버튼 영역은 숨김 처리합니다. */}
      <button style={{ display: "none" }}></button>
    </li>
  );
});

export default function StudyItem({ item, isFavorite, onToggleFavorite }) {
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
      {/* 미션 2와 직접적인 관계가 없는 텍스트 정보 영역은 생략합니다. */}
      <div style={{ flex: 1, paddingRight: "15px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>{item.title}</h3>
      </div>


      <button
        // 요구사항: 즐겨찾기 버튼을 클릭하면 해당 항목의 id를 인자로 전달합니다.
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
        {/* 요구사항: 해당 항목이 즐겨찾기 상태(isFavorite)인지 여부에 따라 텍스트를 다르게 출력합니다. */}
        {isFavorite ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
      </button>
    </li>
  );
}