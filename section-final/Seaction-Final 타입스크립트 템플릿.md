
## CRA 타입스크립트 템플릿

타입스크립트로 React 프로젝트를 시작할 때 가장 빠르게 시작할 수 있는 도구이다.

create-react-app 공식문서에 CRA 툴로 생성하는 React 앱에 자동으로 타입스크립트 템플릿으로 시작하도록 만들 수 있다.  

### [cra 레퍼런스](https://create-react-app.dev/docs/adding-typescript)

- 타입스크립트 템플릿 cra 프로젝트 생성 명령
  ```bash
  npx create-react-app my-app --template typescript
  ```

기존 명령어에 `--tempalate typescript`을 붙히게 되면 타입스크립트 템플릿으로 만들어진 CRA가 설치된다고 이해하면 된다.  

디렉토리 명을 프로젝트 명으로 설정하는 명령은 .을 추가하면 된다. 

```
npx create-react-app@latest . --template typescript
```
