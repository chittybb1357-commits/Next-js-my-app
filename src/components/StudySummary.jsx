// 필터링된 항목 수 통계 (useMemo 계산값 표시)
"use client";

export default function StudySummary({ summary, renderCount }) {
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
        <div>
          <strong>전체 항목:</strong> {total}개
        </div>

        <div>
          <strong>현재 표시:</strong> {visible}개
        </div>

        <div>
          <strong>즐겨찾기:</strong> {favorite}개
        </div>

        <div>
          <strong>App 렌더링 횟수:</strong> {renderCount}회
        </div>
      </div>
    </div>
  );
}
