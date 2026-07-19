// (기존 App.jsx 역할) 전체 상태 관리 및 조합
"use client";

import { useState } from "react";
import initialData from "@/data/data.json";
import styles from "./page.module.css";

export default function Page() {
  const [items] = useState(initialData);

  // 1. keyword 상태 생성 (초기값: 빈 문자열)
  const [keyword, setKeyword] = useState("");

  // 2. category 상태 생성 (초기값: "all")
  const [category, setCategory] = useState("all");

  return (
    <div className={styles.container}>
      {/* 3. 검색창 입력값이 변경되면 keyword를 업데이트 (onChange) */}
      <h3 className={styles.sectionTitle}>검색</h3>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="학습 항목 검색"
        className={styles.searchInput}
      />

      {/* 4. 카테고리 버튼을 클릭하면 category를 업데이트 (onClick) */}
      <h3 className={styles.sectionTitle}>카테고리 필터</h3>
      <div className={styles.categoryButtonGroup}>
        {["all", "concept", "library", "hook"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              backgroundColor: category === cat ? "#3b82f6" : "#fff",
              color: category === cat ? "#fff" : "#000",
              marginRight: "8px",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {cat === "all" ? "전체" : cat}
          </button>
        ))}
      </div>

      {/* 현재 상태 확인용 (디버깅) */}
      <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
        <p>
          <strong>현재 검색어 (keyword):</strong> {keyword || "(빈 문자열)"}
        </p>
        <p>
          <strong>선택된 카테고리 (category):</strong> {category}
        </p>
      </div>
    </div>
  );
}
