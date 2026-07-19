// 목록을 순회하며 Item 출력
"use client";

import StudyItem from "./StudyItem";

export default function StudyList({ filteredItems, favoriteIds, onToggleFavorite }) {
  if (!filteredItems || filteredItems.length === 0) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px", fontSize: "14px" }}>
        일치하는 항목이 없습니다.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {filteredItems.map(item => (
        <StudyItem
          key={item.id}
          item={item}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}
