// 카테고리 셀렉트박스 & 즐겨찾기 토글
"client";

export default function CategoryFilter({ category, setCategory }) {
  const categories = [
    { value: "all", label: "전체" },
    { value: "concept", label: "concept" },
    { value: "library", label: "library" },
    { value: "hook", label: "hook" },
  ];

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
        {categories.map(cat => (
          <button
            key={cat.value}
            // 요구사항: 카테고리 버튼을 클릭하면 category를 업데이트합니다.
            onClick={() => setCategory(cat.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              cursor: "pointer",
              backgroundColor: category === cat.value ? "#0070f3" : "#fff",
              color: category === cat.value ? "#fff" : "#000",
              fontWeight: category === cat.value ? "bold" : "normal",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

export default function CategoryFilter({ favoriteOnly, setFavoriteOnly }) {
  return (
    <div style={{ marginBottom: "20px" }}>

      <button
        // 요구사항: 즐겨찾기 버튼을 클릭하면 상태를 토글(반전)하여 업데이트합니다.
        onClick={() => setFavoriteOnly(prev => !prev)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #0070f3",
          cursor: "pointer",
          backgroundColor: favoriteOnly ? "#e6f4ff" : "#fff",
          color: "#0070f3",
          fontWeight: "bold",
        }}
      >
        {/* 요구사항: favoriteOnly 상태에 따라 버튼 문구를 다르게 출력합니다. */}
        {favoriteOnly ? "전체 항목 보기" : "즐겨찾기만 보기"}
      </button>
    </div>
  );
}