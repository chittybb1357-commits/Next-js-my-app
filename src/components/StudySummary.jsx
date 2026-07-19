// 필터링된 항목 수 통계 (useMemo 계산값 표시)
"use client";

// 미션 1: 전달받은 데이터를 바탕으로 화면에 전체 개수 및 요약 데이터를 출력합니다.
export default function StudySummary({ summary }) {
  // 전체 항목(total), 표시 항목(visible), 즐겨찾기(favorite) 데이터를 받아옵니다.
  const { total = 0, visible = 0, favorite = 0 } = summary || {};

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "13px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#334155",
          border: "1px solid #f1f5f9",
        }}
      >
        {/* [미션 1 핵심] 전체 학습 데이터 배열의 기본 개수(length)를 화면에 렌더링합니다. */}
        <div>
          <strong>전체 항목:</strong> {total}개
        </div>

        <div>
          <strong>현재 표시:</strong> {visible}개
        </div>

        <div>
          <strong>즐겨찾기:</strong> {favorite}개
        </div>

        {/* 미션 1 단계 외의 데이터(미션 6 렌더링 횟수 등)는 숨김 처리합니다. */}
        <div style={{ display: "none" }}>렌더링 횟수 영역</div>
      </div>
    </div>
  );
}
