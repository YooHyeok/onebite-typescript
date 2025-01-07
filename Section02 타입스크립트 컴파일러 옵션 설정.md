# 타입스크립트 컴파일러 옵션 설정

<details>
<summary>펼치기/접기</summary>

타입스크립트의 컴파일 가정에서는 우리가 작성한 코드에 오류가 없는지 검사하고 오류가 없다면 자바스크립트 코드로 변환한다.

이러한 컴파일 과정에서 아주 세부적인 사항들 예를들어 얼마나 엄격하게 타입오류를 검사할 것인지 또는 컴파일 결과로 생성되는 자바스크립트 코드들의 버전은 어떻게 설정할 것인지 등 이러한 아주 세부적인 사항들을 컴파일러 옵션이라고 부른다.  

컴파일러 옵션을 직접 설정 한다는 것은 이런 세부적인 사항들을 프로그래머가, 개발자가 자신의 입맛에 맞게 자유롭게 변경하는 행위를 말한다.  

타입스크립트는 다른 언어들에 비해서 컴파일러 옵션을 아주 자유롭고 쉽게 설정할 수 있다.  
진행하는 프로젝트의 성격에 따라 프로젝트에 최적화된 맞춤 설정을 만들어 사용하는 것도 가능하다.  
이러한 이점들이 있기 때문에 실무에서는 보통 타입스크립트 컴파일러 옵션을  프로젝트의 상황에 따라 또는 사람에 따라 팀에 따라 입맛대로 설정해서 사용하는게 일반적이다.  

타입스크립트 컴파일러 옵션은 Node.js 패키지 단위로 설정할 수 있다.  
즉, 프로젝트 마다 설정할 수 있다.  
타입스크립트 컴파일러인 tsc 도구를 이용하면 기본적인 옵션이 다 자동으로 설정된 컴파일러 옵션 파일을 자동으로 만들 수 있다.

- 타입스크립트 컴파일 옵션 터미널 명령
	```bash
	tsc --init
	```

- 터미널 콘솔 출력
	```text/plain
	Created a new tsconfig.json with:                                                                                       
	                                                                                                                     TS 
	  target: es2016
	  module: commonjs
	  strict: true
	  esModuleInterop: true
	  skipLibCheck: true
	  forceConsistentCasingInFileNames: true
	
	
	You can learn more at https://aka.ms/tsconfig
	```

콘솔에 위와 같이 출력되며, 해당 프로젝트에 tsconfig.json 파일이 생성된다.

- tsconfig.json
	```json
	{
	  "compilerOptions": {
	    /* Visit https://aka.ms/tsconfig to read more about this file */
	
	    /* Projects */
	    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
	    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
	    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
	    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
	    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
	    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
	
	    /* Language and Environment */
	    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
	    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
	    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
	    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
	    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
	    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
	    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
	    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
	    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
	    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
	    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
	    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */
	
	    /* Modules */
	    "module": "commonjs",                                /* Specify what module code is generated. */
	    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
	    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
	    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
	    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
	    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
	    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
	    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
	    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
	    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
	    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
	    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
	    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
	    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
	    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
	    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
	    // "resolveJsonModule": true,                        /* Enable importing .json files. */
	    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
	    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */
	
	    /* JavaScript Support */
	    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
	    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
	    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */
	
	    /* Emit */
	    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
	    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
	    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
	    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
	    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
	    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
	    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
	    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
	    // "removeComments": true,                           /* Disable emitting comments. */
	    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
	    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
	    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
	    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
	    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
	    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
	    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
	    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
	    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
	    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
	    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
	    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
	
	    /* Interop Constraints */
	    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
	    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
	    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
	    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
	    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
	    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
	    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
	
	    /* Type Checking */
	    "strict": true,                                      /* Enable all strict type-checking options. */
	    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
	    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
	    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
	    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
	    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
	    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
	    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
	    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
	    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
	    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
	    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
	    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
	    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
	    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
	    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
	    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
	    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
	    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
	    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
	
	    /* Completeness */
	    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
	    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
	  }
	}
	
	```


먼저 tsconfig.json이라는 파일은 TypeScript Configuration의 줄임말이고, 타입스크립트 컴파일러의 설정 파일이라고 생각하면 된다.

파일의 내용을 보면 굉장히 많은 옵션들이 설정 되어 있고, 대부분의 라인들이 주석처리 되어있어 실제로 적용되고 있는 옵션들은 몇개 되지 않는다.  
이곳의 옵션들을 몇개 바꾸면 TSC의 동작이 실제로 바뀌게 된다.

지금은 컴파일러 옵션들을 어떻게 설정하는지, 또 어떤 옵션들이 있는지 처음부터 배워보려고 하는 것이기 때문에 자동 생성된 옵션들을 사용하지 않고, 파일 전체 내용을 다 지우고 하나씩 필요한 옵션을 다 설정해 보도록 한다.

</details>
<br>


## Include 옵션
<details>
<summary>펼치기/접기</summary>

<br>
컴파일 할 타입스크립트 파일들의 범위와 위치를 알려주는 옵션이다.  
index.ts같은 파일들을 컴파일 해야 될 때 `tsc src/index.ts`라는 명령어를 실행하였다.  
만약 index.ts파일 하나만 있는것이 아니라 100개의 타입스크립트 파일이 있었다고 치면 일일이 `tsc 파일이름` 이라는 100번의 명령어를 입력해줘야 하기 때문이다.  

include라는 옵션을 이용하면 특정 폴더, 예를들어 src 폴더 하위에 있는 모든 타입스크립트 파일을 동시에 한 번의 명령으로 컴파일 하도록 설정할 수 있다.  

tsconfig.json 파일에 include라는 항목을 생성하게 되면 빈 배열의 value가 key:value 형태로 자동 완성 된다.  
해당 빈배열 안에 "src" 라는 문자열을 넣도록 한다.

- tsconfig.json
  ```json
  {
    "include" : ["src"]
  }
  ```

위와 같이 설정하면 "src라는 경로 하위에 있는 모든 파일을 포함해서 한번에 컴파일 해라." 라는 의미
즉, "너가 컴파일 할 경우가 src 야." 라는 것과 똑같다.  
이렇게 설정한 뒤 이전에 컴파일 했던 .js 확장자의 컴파일 결과 파일을 삭제 후 파일 이름을 제외한 tsc를 명령어로 입력만 해주면 자동으로 index.ts라는 경로를 명시 하지 않았음에도 src 디렉토리 안에 있는 모든 파일들을 동시에 컴파일 해 준다.

- src/test.ts
  ```ts
  console.log("Hello Test")
  ```

#### [컴파일 전]
📂onebite-typescript   
┠ 📂 section01  
┃ ┠ 📂 node_modules  
┃ ┠ 📂 src  
┃ ┃ ┠ 📄index.ts  
┃ ┃ ┖ 📄test.ts  

- tsc 컴파일 명령
  ```bash
  tsc
  ```

#### [컴파일 후]
📂onebite-typescript   
┠ 📂 section01  
┃ ┠ 📂 node_modules  
┃ ┠ 📂 src  
┃ ┃ ┠ 📄index.js  
┃ ┃ ┠ 📄index.ts  
┃ ┃ ┠ 📄test.js  
┃ ┃ ┖ 📄test.ts  
</details>
<br>

## Target 옵션
<details>
<summary>펼치기/접기</summary>

<br>
타입스크립트 코드를 컴파일해서 만들어지는 자바스크립트 코드의 버전을 설정하는 옵션이다.

- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ES6"
    },
    "include": ["src"]
  }
  ```
compilerOptions 옵션을 생성하고 value에 해당하는 json 객체에 target 옵션을 생성한 뒤 target 옵션의 value를 "ES5"로 설정한다.  
이와같이 설정할 경우 컴파일 결과로 생성되는 자바스크립트 코드의 버전이 ES5 즉, 옛 버전의 자바스크립트가 생성된다.

컴파일 예제를 다음과 같이 구성한 뒤 컴파일을 진행한다.

- target.ts
  ```ts
  const func = () => console.log("hello")
  ```

- target.js
  ```js
  var func = function () { return console.log("hello"); };
  ```

타겟을 ES5로 설정했고, ES5버전에는 화살표 함수가 없기 때문에 컴파일 과정에서 함수 표현식으로 변환 된것이다.


- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ESNext"
    },
    "include": ["src"]
  }
  ```

- target.ts
  ```ts
  const func = () => console.log("hello")
  ```

- target.js
  ```js
  const func = () => console.log("hello")
  ```

**ESNext**는 자바스크립트 최신 버전을 의미한다.  
다시 한번 tsc로 컴파일 할 경우 컴파일 결과 생성되는 자바스크립트 파일도 화살표 함수를 갖게 된다.  
이렇게 컴파일러 옵션의 타겟 옵션을 이용하면 생성되는 자바스크립트 코드의 버전을 마음대로 조정할 수 있다.  

### 어디에 왜 사용할까?
타입스크립트를 통해서 만드는 프로덕트가 무조건 ES6를 지원하는 곳에서 동작하리라는 보장은 없다.  
즉, 옛날 자바스크립트 버전을 사용하는 구형 브라우저 혹은 예전의 서버 환경 등에서 동작시키려면 옛날 자바스크립트 버전을 사용해야할 일이 있기 때문에 중요한 옵션이다.  

include 옵션과는 달리 target 옵션은 complierOption이라는 항목 안에 설정했다.  
이는 target 옵션처럼 타입스크립트를 자바스크립트로 변환하는 과정이나 타입 검사 등에 이러한 아주 상세한 옵션들을 설정할 때에는 위와같이 compilerOption이라는 항목 안에 설정한다.
</details>
<br>

## Module 옵션
<details>
<summary>펼치기/접기</summary>

<br>
변환되는 자바스크립트 코드의 모듈 시스템을 설정하는 옵션이다.    
자바스크립트의 모듈 시스템에는 대표적으로 `CommonJS(CJS)`와 `ES 모듈 시스템(ESM)`이 있다.

### [CommonJS 래퍼런스](https://nodejs.org/api/modules.html)

- CommonJS - 모듈 불러오기
  ```js
  const 모듈 = require("./모듈")
  ```

- CommonJS - 모듈 내보내기
  ```js
  module.exports {
  }
  ```


### [ES 모듈 시스템 래퍼런스](https://reactjs.winterlood.com/4683fda0-82e5-452f-98fe-a3aab428d2b7)
- ES 모듈 시스템 - 모듈 불러오기
  ```js
  import 모듈 from "./모듈"
  ```

- ES 모듈 시스템 - 모듈 내보내기
  ```js
  export default {
  }
  ```

### tsconfig.json module 옵션 설정

#### CommonJS로 설정
- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
	  "module": "CommonJS" /* module - CommonJS */
    },
    "include": ["src"]
  }
  ```

- config-exam/module/exm/export.ts
  ```ts
  export const hello = () => {
    console.log("hello");
  }
  ```

- config-exam/module/exm/import.ts
  ```ts
  import { hello } from './esmExport';
  hello();
  ```

참고로 타입스크립트에서는 import를 통해서 모듈에서 값을 불러오고, Export를 통해서 모듈에서 값을 내보낼 수 있다.  
이는 자바스크립트의 ES 모듈 시스템과 똑같다고 생각하면 된다.  

- tsc 컴파일
  ```
  tsc
  ```

- config-exam/module/exm/import.js
  ```js
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const export_1 = require("./export");
  (0, export_1.hello)();
  ```
독특한 코드가 생성된 것을 확인할 수 있다.  
코드를 보면 require나 exports처럼 ES 모듈 시스템이 아니라 Common.js 모듈 시스템의 키워드들이 들어있다.  

앞서 tsconfig.json에 module 옵션을 CommonJS로 설정했기 때문에 변환되는 자바스크립트 코드의 모듈 시스템이 CommonJS로 설정이 된것이다.  

- config-exam/module/exm/export.js
  ```js
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.hello = void 0;
  const hello = () => {
      console.log("hello");
  };
  exports.hello = hello;
  ```

#### ESNext로 설정

- tsconfig.json
   ```json
  {
    "compilerOptions": {
      "target": "ESNext",
	    "module": "ESNext", /* module - ESNext */
    },
    "include": ["src"]
  }
  ```

- config-exam/module/exm/export.ts
  ```ts
  export const hello = () => {
    console.log("hello");
  }
  ```

- config-exam/module/exm/import.ts
  ```ts
  import { hello } from './esmExport';
  hello();
  ```

import와 export 즉, ES 모듈 시스템을 사용하는 자바스크립트 코드로 변환된 것을 확인할 수 있다.  
이렇게 모듈 옵션을 설정해서 변환된 자바스크립트 코드의 모듈 시스템을 직접 설정할 수 있다.  
이 옵션되 매우 중요하다.  
이전의 Target 옵션과 비슷하게 개발자가 실제로 만드는 프로덕션이 무조건 ES 모듈 시스템이 지원되는 곳에서 동작하리라는 보장이 없기 때문이다.  
그래서 만들어야 되는 프로젝트의 상황에 따라 환경에 따라 모듈 옵션을 잘 조정해서 적절하게 모듈 시스템을 조정해야 한다.  
</details>
<br> 

## OutDir 옵션
<details>
<summary>펼치기/접기</summary>

<br>
TSC로 타입스크립트 코드들을 컴파일 하면 컴파일 결과가  src 디렉토리 내 그대로 생겨버린다.   
실제 실무를 할때는 파일이 굉장히 많기 때문에 굉장히 불편하다.  
컴파일 결과로 생성된 자바스크립트 코드는 직접 수정하는 코드도 아니다.

이럴 때 사용하는 옵션이 outDir 옵션이다.

- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
	    "module": "ESNext",
	    "outDir": "dist" /* outDir 옵션 추가 */
    },
    "include": ["src"]
  }
  ```

outDir 옵션의 value 값으로는 컴파일 결과가 생성될 자바스크립트 파일들이 어디에 위치할지에 대한 디렉토리명을 작성하면 된다.  

dist라는 디렉토리로 설정한다.

#### [컴파일 전]
📂onebite-typescript   
┃ ┠ 📂 section01  
┃ ┃ ┠ 📂 node_modules  
┃ ┃ ┠ 📂 src  
┃ ┃ ┃ ┖ 📄index.ts  

- tsc 컴파일 명령
  ```bash
  tsc
  ```

#### [컴파일 후]
📂onebite-typescript   
┃ ┠ 📂 section01  
┃ ┃ ┠ 📂 dist
┃ ┃ ┃┖ 📄index.js   
┃ ┃ ┠ 📂 node_modules  
┃ ┃ ┠ 📂 src  
┃ ┃ ┃ ┖ 📄index.ts  

위와 같이 outDir 옵션을 설정하면 컴파일 결과로 생성되는 코드를 직접 작성하는 코드 영역에서 분리할 수 있다.

</details>
<br>
