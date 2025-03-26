# 타입스크립트 프로젝트 INIT & INSTALL
<details>
<summary>펼치기/접기</summary>

<br>

## 순서
1. NodeJS 프로젝트(패키지) 초기화
2. ts-node 설치
3. 타입스크립트 Compiler 설치
4. 설치 확인
5. .ts 확장자 파일 컴파일
<br>

## 1. NodeJS 프로젝트(패키지) 초기화

section01 이름의 디렉토리를 생성하고 커맨드라인을 통해 새로 생성한 디렉토리로 이동한다.

```bash
npm init
```

모든 옵션을 default로 Enter만 입력하여 넘어간다.  

package.json확인  
(폴더 명으로 프로젝트 이름이 설정된다.)


### 최초 디렉토리 구조
📂onebite-typescript   
┠ 📂 section01  
┃ ┖ 📄package.json  
<br>

## 2. types/node 설치

node.js가 제공하는 내장 기능들에 대한 타입 정보를 갖고 있는 패키지(라이브러리)이다.
예를들어 console.d.ts라는 파일 등 node.js에서 제공하는 기능들에 대한 타입을 미리 정의되어 있는걸 볼 수 있다.
types/node를 설치하지 않으면 타입스크립트가 우리가 작성한 코드를 컴파일하는 과정에서 node.js의 기본 기능인 console.log 같은 기능을 사용할 때 타입을 알으들을 수 없기 때문에 반드시 설치해줘야 한다.

```bash
npm install @types/node
```

package.json의 dependency와 node_modules 디렉토리 생성확인

### 최종 디렉토리 구조
📂onebite-typescript   
┠ 📂 section01  
┃ ┠ 📂 node_modules  
┃ ┠ 📄package-lock.json  
┃ ┖ 📄package.json  


## 3. 타입스크립트 Compiler 설치

타입스크립트는 타입스크립트 컴파일러를 통해 자바스크립트 코드로 변환된 다음 자바스크립트 코드를 Node나 브라우저로 실행시키는 방식으로 동작한다.

이를 위해 타입스크립트 컴파일러를 설치한다.

타입스크립트 컴파일러도 ts-node처럼  Node.js 패키지로 공급이 되고 있다.

```bash
npm install typescript -g
```

위와 같이 로컬 글로벌로 설치한다.

맥 사용자의 경우 관리자 권한을 의미하는 sudo 키워드를 붙혀야 한다.

```bash
sudo npm install typescript -g
```

이때 맥 사용자의 경우 패스워드가 나오게 된다.

만약 윈도우 사용자임에도 권한 오류가 난다면 명령 프롬프트를 관리자 권한으로 연 뒤 명령어를 입력해 주면 된다.
<br>

## 4. 설치 확인

```bash
tsc -v
```
<br>

## 5. tsc를 이용한 .ts 확장자 파일 컴파일

### 컴파일 시나리오

- src/index.ts
  ```ts
  console.log("Hello TypeScript")
  const a: number = 1;
  ```

- 컴파일 진행
  ```bash
  tsc src/index.ts
  ```

- src/index.js
  ```ts
  console.log("Hello TypeScript")
  var a = 1;
  ```

### 최종 디렉토리 구조
📂onebite-typescript   
┠ 📂 section01  
┃ ┠ 📂 node_modules  
┃ ┠ 📂 src  
┃ ┃ ┠ 📄index.js  
┃ ┃ ┖ 📄index.ts  
┃ ┠ 📄package-lock.json  
┃ ┖ 📄package.json  

<br>

### node를 통한 js 실행
  ```bash
  node src/index.js
  ```

#### 터미널 출력내용 확인
  ```bash
  Hello TypeScript
  ```
<br>

## 6. ts-node를 활용하여 컴파일 및 실행 

개발 중일 때는 파일에 계속해서 코드를 수정하고 확인하는 과정을 거치기 때문에 매번 컴파일과 실행 명령을 따로 실행시키면 굉장히 번거롭다.  

이럴때 이용하면 좋은 라이브러리로 ts-node가 있다.  
nodejs의 패키지로 공급되고 있어서 아래와 같이 설치하여 사용한다.

```bash
npm install ts-node -g
```

위와 같이 로컬 글로벌로 설치한다.

맥 사용자의 경우 관리자 권한을 의미하는 sudo 키워드를 붙힌다.

```bash
sudo npm install ts-node -g
```

ts-node는 이름에서 보면 알 수 있듯 타입스크립트 컴파일러와 nodejs가 함께 구성되어 있는것이다.

타입스크립트 파일을 한번에 컴파일부터 실행 까지 할 수 있다.

### 컴파일 시나리오

- src/index.js 파일 제거

- ts-node를 통한 컴파일 진행
  ```bash
  ts-node src/index.ts
  ```

- src/index.js 확인
  ```ts
  console.log("Hello TypeScript")
  var a = 1;
  ```

- 터미널 출력내용 확인
  ```bash
  Hello TypeScript
  ```
<br>

## 7. tsx (ts-node가 동작하지 않을 때)
23년 10월 Node.js의 LTS(장기 지원 버전)가 20대로 업데이트 되며 ts-node가 정상적으로 동작하지 않는다.  
이 경우 ts-node 대신 아래 링크에서 소개하는 tsx를 사용한다.  
https://ts.winterlood.com/6c9bf87f-6a8f-4e96-95b4-5e12d9f82165#c8a5f8ebaa7d4692a90e3d743bb21dea

사용 방법은 동일하니 설치만 진행하면 되고, 설치 이후에는 명령어에서 ts-node를 `tsx`로 대체해 주면 된다.

- tsx를 통한 컴파일 진행
  ```bash
  tsX src/index.ts
  ```

</details>
<br>

# [Section02 타입스크립트 개론.md](section01%2FSection02%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EA%B0%9C%EB%A1%A0.md)
<br>

# [Section02 타입스크립트 컴파일러 옵션 설정.md](section01%2FSection02%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC%20%EC%98%B5%EC%85%98%20%EC%84%A4%EC%A0%95.md)
<br>

# [Section03 타입스크립트 기본.md](section02%2FSection03%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EA%B8%B0%EB%B3%B8.md)
<br>

# [Section04 타입스크립트 이해하기.md](section03%2FSection04%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0.md)
<br>

# [Section05 함수와 타입.md](<section04/Section05 함수와 타입.md>)
<br>

# [Section06 인터페이스](<section05/Section06 인터페이스.md>)
<br>

# [Section07 클래스](<section6/Section07 클래스.md>)
<br>

# [Section08 제네릭](<section07/Section08 제네릭.md>)
<br>

# [Section09 제네릭](<section08/Section09 타입 조작하기.md>)
<br>