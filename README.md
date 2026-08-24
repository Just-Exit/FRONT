# Local Demo

Figma 화면 구현을 위한 React Native/Expo UI 프로젝트입니다. 현재는 백엔드, API, 인증, 전역 상태 및 서버 상태 라이브러리를 사용하지 않습니다.

## 기술 구성

- React Native + Expo SDK 57
- TypeScript (`strict` 모드)
- Expo Router (`src/app` 파일 기반 routing, typed routes)
- ESLint (Expo flat config)
- Prettier

Expo managed workflow를 사용하므로 현재 단계에서는 `ios/`, `android/` 네이티브 프로젝트를 저장소에 만들지 않습니다. 네이티브 코드가 필요한 요구사항이 생기기 전까지 Expo Go와 Simulator/Emulator로 공통 UI를 확인합니다.

## 프로젝트 구조

```text
assets/                   이미지와 앱 아이콘
src/
  app/                    Expo Router route와 layout
  components/
    layout/               화면 공통 layout
  constants/              Figma 기반 color/spacing/typography token
  features/               기능·도메인별 화면 UI
  mocks/                  API 전까지 사용하는 typed mock data
  types/                  여러 feature가 공유하는 TypeScript type
```

`src/app`의 route는 얇게 유지합니다. 복잡한 화면은 `src/features/<feature>/screens`에 구현하고 route에서 조합합니다. 여러 화면에서 재사용되는 디자인 요소는 `src/components/ui`, 화면 골격은 `src/components/layout`에 둡니다.

현재 token 객체는 의도적으로 비어 있습니다. Figma가 전달되면 정확한 값만 `src/constants`에 추가합니다. 앱 아이콘과 이미지 파일은 현재 Expo placeholder이며 브랜드 asset 전달 후 교체합니다.

## 설치 및 기본 실행

Node.js와 npm이 설치된 macOS에서 다음을 실행합니다.

```bash
npm install
npm start
```

Expo CLI가 시작되면 터미널에서 `i`를 눌러 iOS Simulator, `a`를 눌러 Android Emulator를 열 수 있습니다. 또는 별도 터미널에서 다음 package script를 사용합니다.

```bash
npm run ios
npm run android
```

## iOS Simulator

프로젝트 외부 환경 요구사항입니다.

1. Mac App Store에서 Xcode를 설치합니다.
2. Xcode > Settings > Components에서 사용할 iOS Simulator runtime을 설치합니다.
3. Xcode를 한 번 실행해 라이선스와 초기 구성 절차를 완료합니다.
4. 다음 명령으로 설정을 확인합니다.

```bash
xcode-select -p
xcodebuild -version
xcrun simctl list devices available
```

그 후 `npm run ios`를 실행합니다. Simulator가 자동으로 열리지 않으면 macOS에서 Simulator 앱을 먼저 실행한 뒤 다시 시도합니다.

## Android Emulator

아래 항목은 프로젝트 코드가 아니라 개발자 Mac에 필요한 설정입니다.

1. Android Studio를 설치합니다.
2. SDK Manager에서 Android SDK Platform 36, Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools를 설치합니다.
3. Device Manager에서 가상 기기(AVD)를 생성하고 부팅합니다.
4. JDK 17과 Android SDK 환경 변수를 설정합니다. SDK 경로는 Android Studio의 SDK Manager에 표시된 실제 경로를 사용합니다.
5. 새 터미널에서 다음을 확인합니다.

```bash
java -version
adb version
adb devices
```

가상 기기가 `adb devices`에 표시되면 `npm run android`를 실행합니다. 이 저장소는 시스템 환경 변수나 Android Studio 설정을 자동으로 변경하지 않습니다.

## 실제 iPhone / Android (Expo Go)

1. App Store 또는 Google Play에서 Expo Go를 설치합니다.
2. 개발 컴퓨터와 기기를 같은 Wi-Fi에 연결합니다.
3. `npm start`를 실행합니다.
4. Android는 Expo Go의 QR scanner, iPhone은 기본 Camera 앱으로 터미널의 QR 코드를 스캔합니다.

방화벽 또는 사내 네트워크가 LAN 연결을 막으면 다른 네트워크에서 시도해야 합니다. 기기의 Expo Go가 이 프로젝트의 Expo SDK 57을 지원하는 최신 버전인지 확인합니다. 네이티브 모듈 요구사항이 Expo Go 범위를 벗어나면 추후 development build로 전환합니다.

## 코드 품질 검사

```bash
npm run typecheck
npm run lint
npm run format:check
npx expo config --type public
npx expo install --check
```

자동 포맷은 `npm run format`으로 실행합니다.

## Figma 화면 구현 규칙

1. 새 경로는 `src/app`에 만들고 화면 UI는 해당 `src/features` 영역에 둡니다.
2. Figma의 color, text style, spacing을 확인한 뒤 `src/constants` token에 정확한 값과 의미 있는 이름을 추가합니다.
3. 화면은 공통 `Screen` layout을 사용하고, 반복되는 UI만 `src/components/ui`로 승격합니다.
4. raster 이미지는 `assets/images`에 두고 `@2x`, `@3x` 파일이 제공되면 함께 관리합니다. SVG/icon 렌더링 라이브러리는 실제 asset 형식이 확인된 뒤 선택합니다.
5. Figma에 없는 화면, 상태 또는 디자인 값은 임의로 만들지 않습니다.

## Mock에서 API로 전환

API가 없는 동안 feature별 데이터 type을 먼저 정의하고 `src/mocks`의 fixture를 화면에 props로 전달합니다. 표현 컴포넌트는 mock 파일을 직접 import하지 않도록 유지합니다.

API가 확정되면 해당 feature에 data/service 계층을 추가하고 route 또는 별도 container가 받은 결과를 동일한 화면 props로 전달합니다. 이때 endpoint, 요청 client, 오류/로딩 처리 및 서버 상태 라이브러리 필요성을 실제 API 요구사항에 맞춰 결정합니다. 현재 저장소에는 endpoint나 백엔드 구현이 없습니다.
# FRONT
