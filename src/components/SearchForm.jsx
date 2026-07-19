// 검색창 및 자동 포커스 (useRef)
"use client";

import { forwardRef } from "react";

// 미션 1 관점에서는 부모에게서 전달받은 keyword와 setKeyword가 핵심 Props입니다.
export default forwardRef(function SearchForm({ keyword, setKeyword, onReset }, ref) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
      {/* 
        [미션 1 요구사항]
        - value를 부모의 keyword 상태와 동기화합니다.
        - 검색창의 입력값이 변경되면 onChange 이벤트를 통해 setKeyword를 실행하여 업데이트합니다.
      */}
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
