# EnDaily

수집한 영어 문장의 표현을 정리하고 문장을 재구성하는 용도로 만들어진 영어 공부 웹 어플리케이션입니다.

어플리케이션의 사용 흐름은 다음과 같습니다.
1. 영어 문장을 듣고 받아쓰기를 합니다.
2. 받아쓰기한 문장의 정답을 확인 후 정답란에 입력하면 표현을 등록할 수 있습니다.
3. 표현은 단어, 뜻, 예시 문장, 나만의 문장으로 구성되며 단어, 뜻, 예시 문장을 입력 후에 나만의 문장을 등록할 수 있습니다.
4. 표현을 완성하고 나면 데이터 임시 저장 상태가 되는데 이 상태에서 Real Save 버튼을 눌러야만 지금까지 임시 저장했던 모든 문장과 표현이 등록되고 조회 화면으로 이동합니다.

<br>

## Environments
- Language: Java 11
- Backend: Spring Boot 2.7.2, H2 Database, JPA(hibernate)
- Frontend: React.js 18.2.0

<br>

## Features
- 회원가입, 로그인
- 영어 문장, 영어 표현 CRUD
- 단어 검색
  - [Free Dictionary API](https://dictionaryapi.dev/)에 WebClient로 검색 요청을 보낼 수 있음
  - 7일 이내에 발생한 검색 기록 최대 15개 보관
  - 검색 기록을 통해 예전에 검색했던 단어를 재검색, 해당 단어의 검색 일시 갱신

<br>

## ERD
![image](https://github.com/yeonleaf/EnDaily/assets/91470133/7319f495-bcb3-40b8-bb5f-9af4f88a72d9)

<br>

## Screehshots
[링크](https://github.com/yeonleaf/EnDaily/wiki/Screenshots-(2023.10.03))

<br>

## How to use
배포가 되어 있지 않기 때문에 동작을 확인하기 위해서는 로컬에 클론해야 합니다.

실행하기 위헤서 필요한 사항은 다음과 같습니다.
- [Node.js](https://nodejs.org/ko/download) - 최신 LTS 버전
- Spring과 React.js 서버를 띄울 수 있는 IDE (IntelliJ 추천)
- [h2 데이터베이스](https://www.h2database.com/html/main.html) - All platforms (zip file)

1. 로컬에 리포지토리를 클론합니다.
2. H2 데이터베이스 서버를 띄웁니다.
   - 윈도우 터미널이나 git bash에서 `cd` 명령어를 사용해 H2 데이터베이스 zip 파일을 압축 해제한 폴더로 들어갑니다.
   - `cd bin`
   - `h2.bat`
3. IDE로 코드를 열어 Spring 어플리케이션을 run합니다. (Run `EndailyApplication`)
4. 터미널에서 `cd src/main/frontend`
5. `npm start`
6. 자동으로 `localhost:3000` 이 뜨고 어플리케이션 첫 화면을 볼 수 있습니다.
