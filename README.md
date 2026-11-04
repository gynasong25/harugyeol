# 하루결 — 설치형(PWA) 버전 설치 안내

이 폴더의 파일을 GitHub Pages에 올리고 Supabase를 연결하면, 컴퓨터·휴대폰에 앱으로 설치되고 오프라인에서도 열리며 온라인일 때 자동으로 동기화됩니다.

## 파일
- `index.html` — 앱 본체
- `config.js` — **Supabase 주소·키를 넣는 곳** (이 파일만 직접 수정)
- `supabase.sql` — Supabase에서 한 번 실행할 테이블 생성문
- `sw.js`, `manifest.webmanifest`, `icon*.{svg,png}` — 오프라인·설치용

## 순서

### 1. Supabase (저장소 + 로그인)
1. https://supabase.com 가입 → **New project** (이름 `harugyeol`, 비밀번호는 아무거나 — 앱에선 안 씀, 지역 `Northeast Asia (Seoul)`)
2. 왼쪽 메뉴 **SQL Editor** → `supabase.sql` 내용을 붙여넣고 **Run**
3. **Project Settings → API** 에서 두 값을 복사
   - `Project URL` → `config.js`의 `supabaseUrl`
   - `anon public` 키 → `config.js`의 `supabaseAnonKey`
4. **Authentication → URL Configuration**
   - Site URL: 4단계에서 받을 주소 (예: `https://아이디.github.io/harugyeol/`)
   - Redirect URLs에 같은 주소 추가

### 2. GitHub Pages (호스팅)
1. https://github.com 가입 → **New repository** (이름 `harugyeol`, Public)
2. **Add file → Upload files** 로 이 폴더의 파일 전부 업로드 → Commit
3. **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main` / `(root)` → Save
4. 1~2분 뒤 `https://아이디.github.io/harugyeol/` 에서 열림

### 3. 기기에 설치
- iPhone: Safari로 열기 → 공유 → **홈 화면에 추가**
- Android: Chrome → ⋮ → **홈 화면에 추가** (또는 "앱 설치")
- 컴퓨터 Chrome/Edge: 주소창 오른쪽 **설치** 아이콘
- 각 기기에서 처음 한 번 이메일로 로그인 링크 받기 → 메일의 링크를 **같은 기기에서** 열기

### 4. 데이터 옮기기
기존(Claude 아티팩트) 앱에서 **백업 ↓** → 새 앱에서 **가져오기 ↑** → "백업으로 대체"

## 앱을 수정했을 때
새 `index.html`을 GitHub에 다시 업로드(덮어쓰기)하고, `sw.js`의 `CACHE = "harugyeol-v1"` 숫자를 올리면 설치된 앱이 다음 실행 때 새 버전을 받습니다.

## 알아둘 점
- Supabase 무료 프로젝트는 **1주일간 접속이 없으면 일시정지**됩니다. 앱은 오프라인 저장본으로 계속 열리고, 대시보드에서 **Restore** 를 누르면 밀린 기록이 동기화됩니다.
- 상단 동기화 상태 문구를 누르면 동기화 기록과 오류 내용을 볼 수 있습니다.
