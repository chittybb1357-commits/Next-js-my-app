// 검색창 및 자동 포커스 (useRef)
"use client";

import { forwardRef } from "react";

// 미션 1 관점에서는 부모에게서 전달받은 keyword와 setKeyword가 핵심 Props입니다.
export default forwardRef(function SearchForm({ keyword, setKeyword, onReset }, ref) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>

      <input
        type="text"
        placeholder="학습 항목 검색"
        value={keyword} // 요구사항: 초기값 빈 문자열 바인딩
        onChange={e => setKeyword(e.target.value)} // 요구사항: 입력값 변경 시 keyword 업데이트
        style={{
          flex: 1,
          padding: "10px 12px",
          boxSizing: "border-box",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          fontSize: "14px",
        }}
      />

      {/* 미션 1 관점에서는 제외되거나 보조적인 버튼들입니다. */}
      <button style={{ display: "none" }}>검색창으로 이동</button>
      <button style={{ display: "none" }}>초기화</button>
    </div>
  );
});

"use client";

import { forwardRef } from "react";

export default forwardRef(function SearchForm({ keyword, setKeyword, onReset }, ref) {
  
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
      {/* 미션 2와 직접 매칭되는 input 및 이동 버튼은 숨김 처리합니다. */}
      <input type="text" style={{ display: "none" }} />
      <button style={{ display: "none" }}>검색창으로 이동</button>


      <button
        onClick={onReset} // 부모의 초기화 함수 호출 (내부에서 setFavoriteOnly(false) 수행)
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

"use client";

import { forwardRef } from "react";

export default forwardRef(function SearchForm({ keyword, setKeyword, onReset }, ref) {
  
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
      {/* 
        [미션 3 연동 포인트]
        - 이 input에 입력되는 keyword 값은 부모 컴포넌트의 useMemo 의존성 배열에 들어갑니다.
        - 여기서 글자를 타이핑할 때마다 부모의 데이터가 아래 조건으로 필터링됩니다:
          item.title.toLowerCase().includes(keyword.toLowerCase())
      */}
      <input
        type="text"
        placeholder="학습 항목 검색"
        value={keyword} // 미션 3 useMemo의 핵심 판단 기준이 되는 상태값
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

      {/* 미션 3 연산과는 직접적인 관련이 없는 요소들입니다. */}
      <button style={{ display: "none" }}>검색창으로 이동</button>
      <button style={{ display: "none" }}>초기화</button>
    </div>
  );
});