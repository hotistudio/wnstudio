# 호필 스튜디오

웹소설·장편 소설 집필을 위한 올인원 웹 애플리케이션. 설치 없이 브라우저에서 바로 쓰고, PWA로 오프라인에서도 동작합니다.

> **v0.4.14 beta** — 개발 중인 베타 버전입니다. 중요한 원고는 항상 백업해두세요.

## 특징

- **집필 편집기** — 화·폴더 관리, 회차 요약, 특수기호 단축키(Ctrl+1~0), 찾기/바꾸기, 집중 모드
- **스토리 설계** — 플롯 아크, 심리 아크, 복선 관리, 사건 일지
- **세계관 관리** — 세계관 설정, 가문/집단, 등장인물, 인물 관계도, 용어 사전, 아이템 사전
- **시각화** — 다이어그램, 인물 관계도
- **집필 통계** — 일일 집필량, 목표 달성 컨페티, 뽀모도로 타이머
- **출고 관리** — 연재 플랫폼 관리, 원고 설정
- **테마** — 8가지 컬러 테마 × 라이트/다크 모드
- **데이터 안전** — 자동 저장 + 스냅샷 + 파일 연결(File System Access API)
- **PWA** — 홈 화면 설치, 오프라인 동작
- **100% 로컬** — 모든 데이터는 브라우저 내에만 저장됩니다. 서버 전송 없음

## 사용법

1. [데모 페이지](https://사용자명.github.io/wnstudio/)에 접속
2. "새 작품 만들기"로 프로젝트 생성
3. 좌측 사이드바에서 원하는 기능 탭 선택
4. 💾 파일 저장 버튼으로 파일에 저장 (이후 자동 덮어쓰기)

모바일에서는 홈 화면에 추가해 앱처럼 쓸 수 있습니다.

## 데이터 저장 방식

- **기본 저장** — 브라우저 `localStorage` (자동)
- **파일 저장** — File System Access API 지원 브라우저(Chrome·Edge 등)에서 실제 `.json` 파일에 자동 저장
- **백업** — 15분마다 IndexedDB에 스냅샷. 콘솔에서 `listSnapshots()`·`restoreSnapshot(ts)`로 복원 가능
- **전체 백업** — 헤더의 파일 저장 버튼으로 언제든 JSON 내보내기

> iOS Safari 등 File System Access API 미지원 환경에서는 수동 다운로드 방식으로 동작합니다.

## 로컬에서 실행

저장소를 클론한 뒤 정적 서버 하나만 띄우면 됩니다.

```bash
# 간단한 방법
python3 -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 열기. Service Worker는 HTTPS 또는 localhost에서만 동작합니다.

## 브라우저 지원

- **권장** — Chrome, Edge, Brave (File System Access API 완전 지원)
- **동작** — Firefox, Safari (파일 저장은 다운로드 방식으로 폴백)
- **모바일** — iOS 14+, Android Chrome

## 개발

단일 HTML 파일에 모든 것이 들어있습니다. 별도의 빌드 과정이 없습니다.

```
wnstudio/
├── index.html        # 메인 애플리케이션
├── manifest.json     # PWA 매니페스트
├── sw.js             # Service Worker
├── icons/            # 앱 아이콘
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## 변경 이력

[CHANGELOG.md](./CHANGELOG.md) 참고.

## 라이선스

[LICENSE](./LICENSE) 파일 참고.
