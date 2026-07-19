// 검색창 및 자동 포커스 (useRef)
"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function SearchForm({ keyword, setKeyword, onReset }, ref) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
  }));

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="학습 항목 검색"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 12px",
          boxSizing: "border-box",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          fontSize: "14px",
        }}
      />

      <button
        onClick={handleFocusSearch}
        style={{
          padding: "0 14px",
          backgroundColor: "#fff",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          color: "#334155",
          whiteSpace: "nowrap",
        }}
      >
        검색창으로 이동
      </button>

      <button
        onClick={onReset}
        style={{
          padding: "0 14px",
          backgroundColor: "#fff",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          color: "#334155",
          whiteSpace: "nowrap",
        }}
      >
        초기화
      </button>
    </div>
  );
});
