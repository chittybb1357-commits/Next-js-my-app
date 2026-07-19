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

"use client";

import { useState, useCallback } from "react";
import initialData from "@/data/data.json";
import CategoryFilter from "@/components/CategoryFilter";
import StudyList from "@/components/StudyList";
import styles from "./page.module.css";

export default function Page() {
  const [items] = useState(initialData);


  // 1. 요구사항: favoriteIds 상태 생성 (초기값: 빈 배열)
  const [favoriteIds, setFavoriteIds] = useState([]); 
  
  // 2. 추가 요구사항: favoriteOnly 상태 생성 (초기값: false)
  const [favoriteOnly, setFavoriteOnly] = useState(false); 

  /* (미션 4의 함수이지만 미션 2의 '즐겨찾기 토글 기능'을 수행하는 핵심 로직입니다) */
  const handleToggleFavorite = useCallback(id => {
    // 요구사항: 이미 즐겨찾기된 항목은 제거, 아니면 배열에 추가
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  }, []);

  return (
    <div className={styles.container}>
      
      <h3 className={styles.sectionTitle}>카테고리 필터</h3>
      {/* 
        3. 추가 요구사항 반영을 위한 컴포넌트 
        - 내부에서 favoriteOnly 값에 따라 "즐겨찾기만 보기" / "전체 항목 보기" 문구를 제어합니다.
      */}
      <CategoryFilter
        favoriteOnly={favoriteOnly}
        setFavoriteOnly={setFavoriteOnly}
        // (기존 미션 1용 category Props들은 생략 가능)
      />

      <h3 className={styles.listTitle}>학습 목록</h3>
      {/* 
        4. 요구사항: 각 학습 항목에 즐겨찾기 버튼을 추가하고 상태 전달 
        - favoriteIds 배열과 즐겨찾기 토글 함수를 하위 컴포넌트로 위임합니다.
      */}
      <StudyList
        filteredItems={items} // 미션 3 필터링 이전의 기본 데이터 바인딩 예시
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />
      
    </div>
  );
}

export default function Page() {
  const [items] = useState(initialData);
  const [keyword] = useState("");
  const [category] = useState("all");
  const [level] = useState("all");
  const [favoriteOnly] = useState(false);
  const [favoriteIds] = useState([]);
  const [isMounted] = useState(false);

  /* ==========================================
   * [미션 3] useMemo로 필터링 결과 계산하기
   * ========================================== */
  // 요구사항: 변수명 filteredData, 대소문자 구분 없는 검색어/카테고리/즐겨찾기 조건 반영 및 올바른 의존성 배열 작성
  const filteredData = useMemo(() => {
    return items.filter(item => {
      // 1. 조건: 제목에 검색어가 포함되어야 함 (대소문자 관계없이 처리)
      const matchesSearch = item.title.toLowerCase().includes(keyword.toLowerCase()); 
      
      // 2. 조건: 선택한 카테고리와 일치해야 함 (전체, concept, library, hook)
      const matchesCategory = category === "all" || item.category === category; 
      
      // 추가 조건 (난이도 필터링 필요 시)
      const matchesLevel = level === "all" || item.level === level;
      
      // 3. 조건: favoriteOnly가 true라면 즐겨찾기 항목(favoriteIds에 포함된 항목)만 출력
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(item.id); 
      
      return matchesSearch && matchesCategory && matchesLevel && matchesFavorite;
    });
    // 4. 의존성 배열: 필터링 조건에 영향을 주는 상태들을 빠짐없이 작성
  }, [items, keyword, category, level, favoriteOnly, favoriteIds]); 

  // 추가 요구사항: useMemo를 한 번 더 사용하여 현재 화면의 통계 정보 계산
  const summary = useMemo(() => {
    return { 
      total: items.length,          // 전체 항목 개수
      visible: filteredData.length, // 현재 표시 개수
      favorite: favoriteIds.length  // 즐겨찾기 개수
    };
    // 의존성 배열: filteredData와 favoriteIds가 변경될 때마다 통계를 다시 계산
  }, [items, filteredData, favoriteIds]); 

  return (
    <div className={styles.container}>
      {/* 
        5. 요구사항: 화면에 다음 정보 출력
        - 전체 항목: {summary.total}개 / 현재 표시: {summary.visible}개 / 즐겨찾기: {summary.favorite}개 
      */}
      <StudySummary summary={summary} renderCount={isMounted ? 0 : 0} />

      <h3 className={styles.listTitle}>학습 목록</h3>
      {filteredData.length === 0 ? (
        <p className={styles.noData}>조건에 맞는 학습 항목이 없습니다.</p>
      ) : (
        /* 6. 계산된 filteredData 배열을 목록 컴포넌트에 주입 */
        <StudyList
          filteredItems={filteredData}
          favoriteIds={favoriteIds}
        />
      )}
    </div>
  );
}