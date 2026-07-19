// 목록을 순회하며 Item 출력
"use client";

import StudyItem from "./StudyItem";

// 요구사항: 부모에게 전달받은 항목 리스트(filteredItems)를 화면에 출력합니다.
export default function StudyList({ filteredItems, favoriteIds, onToggleFavorite }) {
  // 1. 요구사항 예외 처리: 보여줄 데이터가 없을 때 안내 문구를 띄워줍니다.
  if (!filteredItems || filteredItems.length === 0) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px", fontSize: "14px" }}>
        일치하는 항목이 없습니다.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {/* 2. 요구사항: map 함수를 이용해 목록을 순회하며 개별 Item을 출력합니다. */}
      {filteredItems.map(item => (
        <StudyItem
          key={item.id} // 리액트 반복문 필수 고유 key값 지정
          item={item} // 개별 아이템 데이터 전달
          /* 아래 프롭스들은 미션 2(즐겨찾기), 미션 4(최적화) 영역이므로 흐름만 유지합니다 */
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}

export default function StudyList({ filteredItems, favoriteIds, onToggleFavorite }) {
  
  // 데이터가 없을 때의 예외 처리는 흐름상 유지합니다.
  if (!filteredItems || filteredItems.length === 0) return null;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {filteredItems.map(item => (
        <StudyItem
          key={item.id}
          item={item}

          isFavorite={favoriteIds.includes(item.id)} // 현재 항목이 즐겨찾기 상태인지 판별
          onToggleFavorite={onToggleFavorite}         // 즐겨찾기 변경 핸들러 전달
        />
      ))}
    </ul>
  );
}

export default function StudyList({ filteredItems, favoriteIds, onToggleFavorite }) {
  
  // 미션 3에서 필터나 검색어로 걸러진 결과, 보여줄 항목이 하나도 없다면 안내 문구를 띄웁니다.
  if (!filteredItems || filteredItems.length === 0) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px", fontSize: "14px" }}>
        일치하는 항목이 없습니다.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {/* 
        [미션 3 최종 결과 바인딩]
        부모 컴포넌트의 useMemo가 연산해준 '최종 생존 데이터 배열'만 가지고 
        화면에 리스트를 안전하게 그려냅니다.
      */}
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