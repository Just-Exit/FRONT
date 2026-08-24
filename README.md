# Closet AI (Local Demo)

개인 옷장을 디지털화하고 AI 기반 코디 추천과 옷장 인사이트를 보여주는 React Native/Expo UI 프로젝트입니다. 앱 화면에는 `Pikit`, 스플래시에는 `CLOSET AI` 브랜드명이 사용되고 있습니다.

현재는 **프론트엔드 UI/POC 단계**입니다. 백엔드 endpoint, 실제 인증, 카메라·사진 업로드, AI 분석 API, 전역/서버 상태 관리가 연결되어 있지 않으며 화면 데이터는 정적 값 또는 `src/mocks` fixture를 사용합니다.

## Tech Stack

- React Native `0.86.2`
- Expo SDK `~57.0.10`
- React `19.2.3`
- Expo Router `~57.0.10` — `src/app` 기반 파일 라우팅 및 typed routes
- TypeScript `~6.0.3` — `strict` 모드, `@/*` 및 `@/assets/*` 경로 alias
- React Native Safe Area Context, React Native Screens
- Expo Constants, Linking, Status Bar, Dev Client
- ESLint 9 + Expo flat config, Prettier 3
- EAS Build 설정 (`development`, `preview`, `production` profile)

별도의 차트·애니메이션 라이브러리는 사용하지 않습니다. 그래프와 인터랙션은 React Native `View`, `Animated`로 구현되어 있습니다.

## Getting Started

### 요구 환경

- Node.js와 npm
- iOS 실행 시 macOS, Xcode 및 iOS Simulator
- Android 실행 시 Android Studio, Android SDK 및 실행 중인 Emulator/연결 기기

Expo SDK 57 공식 호환 기준의 최소 Node.js 버전은 `22.13.x`입니다.

### 설치 및 실행

```bash
git clone <repository-url>
cd LOCAL_DEMO
npm install
npm start
```

`package.json`에 정의된 플랫폼별 명령은 다음과 같습니다.

```bash
npm run ios       # expo run:ios
npm run android   # expo run:android
```

두 명령은 로컬 네이티브 프로젝트를 생성/빌드하는 Expo prebuild 계열 명령이므로 각각 Xcode 또는 Android 개발 환경이 필요합니다. `expo-dev-client`와 EAS development build 설정도 포함되어 있습니다.

`app.json`의 `platforms`는 `ios`, `android`만 선언하고 있으며 `web` script와 `react-native-web` 의존성이 없으므로, 현재 저장소 기준으로 Web 실행은 지원 범위에 포함되지 않습니다.

### 코드 품질 검사

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Project Structure

```text
.
├── assets/
│   ├── expo.icon/             # Expo 아이콘 편집용 원본/설정
│   └── images/                # 앱 아이콘과 화면용 raster 이미지
├── src/
│   ├── app/                   # Expo Router route와 root Stack layout
│   │   └── analysis/[id].tsx  # 의류 ID 기반 동적 분석 결과 route
│   ├── components/
│   │   ├── layout/            # Safe Area, 공통 헤더 등 화면 골격
│   │   ├── navigation/        # 공통 하단 내비게이션
│   │   └── ui/                # 소셜 로그인 등 공용 UI
│   ├── constants/             # 색상, 간격, 타이포그래피 token
│   ├── features/              # 도메인별 screen/component/hook
│   │   ├── analysis/          # 의류 분석 결과
│   │   ├── analytics/         # 옷장 분석과 그래프
│   │   ├── auth/              # 스플래시와 로그인
│   │   ├── closet/            # 옷장 채우기와 분석 진행률
│   │   ├── home/              # 홈 대시보드와 플로팅 버튼
│   │   ├── profile/           # 프로필과 설정 메뉴 UI
│   │   └── stylist/           # AI 코디 추천
│   ├── mocks/                 # API 대신 사용하는 typed fixture
│   └── types/                 # 인증·옷장·스타일리스트 공유 타입
├── app.json                   # Expo 앱/플랫폼/Router 설정
├── eas.json                   # EAS Build profile
├── eslint.config.js           # ESLint flat config
├── package.json               # 의존성과 npm scripts
└── tsconfig.json              # TypeScript strict/alias 설정
```

Route 파일은 feature screen을 연결하는 얇은 계층이며, 실제 화면 UI는 주로 `src/features/<feature>/screens`에 있습니다.

## Screens & Navigation

Root layout은 헤더를 숨긴 Expo Router `Stack`입니다. Home, Closet, AI Stylist, Profile, 옷장 분석 화면에는 공통 커스텀 하단 내비게이션이 표시되며 선택 시 `router.replace`로 이동합니다.

| 화면                  | 경로             | 현재 동작                                                            |
| --------------------- | ---------------- | -------------------------------------------------------------------- |
| Splash                | `/`              | 1.8초 후 `/login`으로 자동 이동                                      |
| Login                 | `/login`         | Apple/Google/Kakao/이메일 버튼 모두 mock login 후 `/home`으로 이동   |
| Home                  | `/home`          | 추천 룩, 정적 옷장 점수·AI 팁·최근 아이템 표시                       |
| Closet / 옷장 채우기  | `/closet-fill`   | 촬영/스크린샷/OOTD 가져오기 카드와 최근 분석 상태 표시               |
| AI Stylist            | `/stylist`       | 추천 코디 가로 carousel, 조건 chip, 팁과 로컬 반응 UI                |
| Profile               | `/profile`       | 정적 사용자/프리미엄 카드/설정 메뉴 UI                               |
| Analytics / 옷장 분석 | `/analytics`     | 컬러·계절·필수 아이템·미착용 의류·지속가능성 카드                    |
| 의류 분석 결과        | `/analysis/[id]` | 완료 상태인 mock 결과만 표시; 없거나 미완료이면 `/home`으로 redirect |

주요 진입 흐름은 다음과 같습니다.

```text
/
└── /login
    └── /home
        ├── 하단 Navigation
        │   ├── /closet-fill
        │   ├── /stylist
        │   ├── /profile
        │   └── /analytics
        ├── 스크롤 후 표시되는 + 버튼 ──> /closet-fill
        └── 완료된 최근 아이템 ──> /analysis/[id]

/closet-fill
└── 완료된 최근 아이템 ──> /analysis/[id]
```

현재 mock 분석 결과가 있는 ID는 `item-2`, `item-3`입니다. 처리 중인 `item-1` 카드는 비활성화되어 결과 화면에 진입하지 않습니다.

## Features

- 5개 항목의 커스텀 하단 Navigation과 현재 route 활성 상태 표시
- Home 추천 이미지 카드, 옷장 점수 원형 UI, AI 팁, 최근 아이템 목록
- 아래로 일정 시간 스크롤하면 애니메이션으로 나타나는 옷장 채우기 플로팅 버튼
- Closet 가져오기 카드의 터치 ripple/reveal 애니메이션과 mock AI 분류 진행률
- AI Stylist 추천 carousel, 추천 점수·편안함·스타일 지표, 북마크 및 Like/Dislike 로컬 토글/애니메이션
- Analytics 컬러 사용률 막대 애니메이션과 계절 밸런스 원형 segment 애니메이션
- 의류 분석 결과의 카테고리·소재·계절, AI 컬러 팔레트, 로컬 스타일 태그 추가
- Profile 사용자 카드, 구독 안내 및 취향/AI/옷장/구독 메뉴 UI
- Safe Area와 정적 이미지 asset을 사용하는 iOS/Android 공통 화면

Home의 `64%` 옷장 점수 원은 현재 정적 border UI이며 원형 progress 애니메이션은 구현되어 있지 않습니다.

## Mock Data & API Integration

현재 저장소에는 HTTP client, API endpoint 또는 백엔드 연동 코드가 없습니다.

| 영역           | 현재 데이터/동작                                                | API 연동 시 교체 대상            |
| -------------- | --------------------------------------------------------------- | -------------------------------- |
| 인증           | `src/mocks/login-options.ts`; 어떤 버튼이든 즉시 Home으로 이동  | OAuth/이메일 인증과 세션         |
| 사용자 프로필  | Profile의 `profile` 객체, Home의 사용자명 하드코딩              | 사용자 정보와 프로필 이미지      |
| 날씨·일정      | Home 및 Stylist의 `18°C`, 회의, 날짜 문구/조건 고정             | 날씨·캘린더 데이터               |
| Home 추천/점수 | 추천 이미지·설명·64%·착용 수·팁·최근 아이템 하드코딩            | 개인화 추천과 옷장 통계          |
| 옷장 가져오기  | 촬영/스크린샷/OOTD handler가 비어 있음                          | 카메라/앨범/업로드와 분석 요청   |
| 분석 진행률    | `recent-items.ts`와 `use-item-progress`의 timer 기반 simulation | 업로드/분석 job 상태             |
| AI Stylist     | `src/mocks/stylist.ts`; 북마크와 반응은 컴포넌트 로컬 state     | 추천 API와 반응 저장             |
| 옷장 Analytics | `src/mocks/closet-analysis.ts`의 비율·아이템·지속가능성 수치    | 사용자 옷장 분석 API             |
| 의류 분석 결과 | `src/mocks/analysis-results.ts`의 두 결과                       | ID별 분석 조회·수정·저장         |
| 이미지         | `assets/images`의 local `require`                               | 업로드 결과 또는 원격 이미지 URL |

표현 컴포넌트 일부는 props/type을 통해 데이터를 받도록 분리되어 있지만, 화면 수준에서 mock을 직접 import하는 영역도 있습니다. 실제 API 도입 시 로딩·오류·빈 상태와 영속화 전략이 추가로 필요합니다.

## Assets

정적 이미지는 `assets/images` 아래에서 `require(...)`로 불러옵니다.

```text
assets/images/
├── closet/          # 카메라, 스크린샷, OOTD, 스카프, 스니커즈, 블레이저 이미지
├── dashboard/       # Home/Stylist 추천 코디 이미지
├── icons/           # 일정, 가방, 팁, 북마크, Like/Dislike 아이콘
├── mypageicons/     # Profile 취향, AI, 옷장, 구독 메뉴 아이콘
├── navicons/        # 하단 Navigation 기본/선택 상태 아이콘
├── tabIcons/        # 초기 템플릿 계열 tab 이미지
└── ...              # 앱 아이콘, favicon, splash 및 Expo/React 샘플 이미지
```

`app.json`의 앱 아이콘은 `assets/images/icon.png`를 사용합니다. 일부 Expo/React 샘플 및 tab asset도 남아 있으므로, 실제 사용 여부를 확인한 뒤 정리할 필요가 있습니다. `assets/expo.icon`에는 Expo 아이콘 편집용 설정과 원본이 있습니다.

## Development Status

### 화면 UI와 기본 이동이 구현된 영역

- Splash, Login, Home, Closet, AI Stylist, Analytics, Profile
- 완료된 mock 아이템의 의류 분석 결과 화면
- 하단 Navigation 및 Home/Closet에서 분석 결과로 이동
- mock 기반 carousel, 그래프, 진행률 및 일부 터치 애니메이션

### UI만 구현되었거나 로컬에서만 동작하는 영역

- 로그인 버튼: 실제 인증 없이 Home으로 이동
- Closet의 사진 촬영, 스크린샷 업로드, OOTD 가져오기, 전체 보기: 빈 handler
- 의류 분석 결과의 편집/옷장에 추가: 빈 handler
- Profile 메뉴, 플랜 보기, 로그아웃: `console.log`만 실행
- Header 메뉴: 대부분 callback이 없고 Profile에서만 `console.log` 실행
- AI Stylist의 북마크/Like/Dislike: 메모리 내 state만 변경되며 새로고침 시 초기화
- AI Stylist의 `오늘 입기`, Analytics의 추천 추가·기부·전체 리포트 버튼: 후속 동작 없음
- 분석 결과의 스타일 태그 추가: 화면 로컬 state만 변경되고 저장되지 않음
- Home의 `더 알아보기`, `전체 보기`: 현재 `Text` UI이며 navigation handler 없음

### 확인된 참고사항

- 명시적인 `TODO` 주석은 현재 소스에서 확인되지 않았습니다.
- Home/Closet의 `item-3` 카드 표현과 `analysis-results.ts`의 `item-3` 상세 정보·이미지가 서로 일치하지 않습니다. mock fixture 정리가 필요합니다.
- Profile 화면의 표시 버전 `2.4.0 (2024)`은 하드코딩되어 있으며 `package.json`/`app.json`의 앱 버전 `1.0.0`과 다릅니다.
- `app.json`은 portrait 방향과 iOS/Android만 선언하며, 저장소에는 `ios/`, `android/` native directory가 없습니다.
