// (기존 App.jsx 역할) 전체 상태 관리 및 조합
"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import initialData from "@/data/data.json";
import SearchForm from "@/components/SearchForm";
import CategoryFilter from "@/components/CategoryFilter";
import StudySummary from "@/components/StudySummary";
import StudyList from "@/components/StudyList";
import styles from "./page.module.css";

export default function Page() {
  const [items] = useState(initialData);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const renderCount = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    renderCount.current += 1;
  });

  const prevKeywordRef = useRef("");
  const currentKeyword = keyword;
  const searchFormRef = useRef(null);

  const handleReset = useCallback(() => {
    setKeyword("");
    setCategory("all");
    setLevel("all");
    setFavoriteOnly(false);
    if (searchFormRef.current) searchFormRef.current.focusInput();
  }, []);

  const handleToggleFavorite = useCallback(id => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  }, []);

  const filteredData = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory = category === "all" || item.category === category;
      const matchesLevel = level === "all" || item.level === level;
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(item.id);
      return matchesSearch && matchesCategory && matchesLevel && matchesFavorite;
    });
  }, [items, keyword, category, level, favoriteOnly, favoriteIds]);

  const summary = useMemo(() => {
    return { total: items.length, visible: filteredData.length, favorite: favoriteIds.length };
  }, [items, filteredData, favoriteIds]);

  useEffect(() => {
    prevKeywordRef.current = keyword;
  }, [keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subTitle}>React Basic Review Mission 8</p>

        <h1 className={styles.mainTitle}>React Hooks 학습 목록 관리</h1>

        <p className={styles.description}>
          useState, useMemo, useCallback, useRef를 활용한 복습 미션입니다.
        </p>
      </div>

      <h3 className={styles.sectionTitle}>검색</h3>

      <SearchForm
        ref={searchFormRef}
        keyword={keyword}
        setKeyword={setKeyword}
        onReset={handleReset}
      />

      <div className={styles.keywordInfo}>
        <div>
          현재 검색어: <span className={styles.keywordBadge}>{currentKeyword || "(없음)"}</span>
        </div>

        <div>
          이전 검색어:{" "}
          <span className={styles.keywordBadge}>{prevKeywordRef.current || "(없음)"}</span>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>카테고리 필터</h3>

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        favoriteOnly={favoriteOnly}
        setFavoriteOnly={setFavoriteOnly}
      />

      <h3 className={styles.sectionTitle}>난이도 필터</h3>

      <div className={styles.levelButtonGroup}>
        {[
          { value: "all", label: "전체 난이도" },
          { value: "basic", label: "basic" },
          { value: "intermediate", label: "intermediate" },
        ].map(lvl => (
          <button
            key={lvl.value}
            onClick={() => setLevel(lvl.value)}
            className={styles.levelButton}
            style={{
              backgroundColor: level === lvl.value ? "#3b82f6" : "#fff",
              color: level === lvl.value ? "#fff" : "#000",
              fontWeight: level === lvl.value ? "bold" : "normal",
            }}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      <StudySummary summary={summary} renderCount={isMounted ? renderCount.current : 0} />

      <h3 className={styles.listTitle}>학습 목록</h3>
      {filteredData.length === 0 ? (
        <p className={styles.noData}>조건에 맞는 학습 항목이 없습니다.</p>
      ) : (
        <StudyList
          filteredItems={filteredData}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
