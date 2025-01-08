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

## Strict 옵션
<details>
<summary>펼치기/접기</summary>

<br>
strict 옵션은 엄격한 타입 검사를 의미하는 옵션이다.  
이 옵션을 true로 설정할 경우 타입스크립트가 타입을 매우 엄격하게 된다.  
타입스크립트는 매겨변수들의 타입을 프로그래머가 직접 지정하도록 권장한다.  

- strict.ts
  ```ts
  export const hello = (message) => {
	  console.log("hello" + message)
  }
  ```
위 코드를 보면 매개변수 message의 타입이 뭐가 될지 알 수 없다.  
타입스크립트의 점진적인 타입 시스템의 경우 대부분의 상황에 변수의 타입을 추론한다.  
그러나 위 코드에서 매개변수의 message의 타입은 TypeScript가 추론할 수 없다.  
hello()라는 함수를 호출하면서 매개변수로 어떤 타입의 값을 넣을지는 아무도 모르기 때문이다.  
그렇기 때문에 추론되지 않는 변수의 타입을 명시하지 않으면 strict 모드 엄격한 검사 모드를 true로 설정할 경우 (IDE에서) 오류가 발생하게 된다.
그러나 반대로 strict 모드를 false로 설정하여 엄격한 검사를 해제 할 경우 오류가 사라지고 해당 코드가 허용되게 된다.

- tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
      "module": "ESNext",
      "outDir": "dist",
	    "strict": true /* strict 옵션 추가 */
    },
    "include": ["src"]
  }
  ```

strict옵션을 키게 될 경우 최대한 타입 오류가 없게 하기 위해서 엄격하게 코드의 타입을 검사하고, strict옵션을 끄면 코드에 오류가 있을지 몰라도 타입을 유연하게 검사한다고 생각하면 된다.  
보통의 경우 strict옵션을 true로 켜둔 상태에서 개발하게 될 것이다.  
타입스크립트 코드들을 엄격하게 검사해서 오류 가능성을 줄일 수 있기 때문이다.  

예외로 자바스크립트 기존의 프로젝트를 타입스크립트로 새롭게 마이그레이션하는 특별한 상황이 있을 수 있다.  
이 경우 strict모드를 true로 설정해서 엄격한 검사를 적용하게 되면 기존 자바스크립트 코드에 모두 빨간 에러가 발생하는 대참사가 발생할 경우도 있기 때문에 strict모드를 간혹 끄기도 한다.

</details>
<br>

## ModuleDetection 옵션
<details>
<summary>펼치기/접기</summary>

<br>

- moduleDetection1.ts
  ```ts
  const a = 1;
  ```

- moduleDetection2.ts
  ```ts
  const a = 1;
  ```

- 컴파일 Error
  ```text/plain
  Cannot redeclare block-scoped variable 'a'.ts(2451)
  ```

블록범위 변수 a를 다시 선언할 수 없다. 라는 오류가 발생한다.  
동일한 이름의 변수를 똑같은 스코프에 두번 선언했다는 의미이다.  
스코프라는 것은 이름이 공유되는 공간을 말한다.  

```js
function func() {
}
```
예를들어 자바스크립트에서 위 코드와 같이 함수 하나를 선언할 경우 함수의 중괄호 안에는 똑같은 이름의 변수를 다시 선언할 수 없다.  
이와 같이 이름이 공유되는 공간을 스코프라고 부르는데 오류상의 내용이 바로 동일한 scope에 a라는 변수를 두번이나 중복 선언했다 라고 에러를 통해 알려주는 것이다.  

그러나 두개의 파일은 다른 파일이며, 자바스크립트의 경우 모든 각각의 파일이 개별 모듈로 취급되기 때문에 파일별로 동일한 변수명을 작성해도 전혀 문제가 되지 않는다.

하지만 타입스크립트에서 문제가 발생하는 이유는 타입스크립트는 기본적으로 모든 타입 스크립트 파일을 **전역 모듈**로 보기 때문에 그렇다.

전역 모듈로 본다는 뜻은 동일한 이름의 변수를 서로 다른 ts 파일로 각각 선언했으나 결국 두 변수는 같은 공간에 있다. 어떠한 전역적인 공간에 같이 있다. 라고 본다는 뜻이다.  

더 쉽게 말하면 각각의 ts파일로 만들어 봤자 모두 다 같은 공간에 있다고 간주하는 것이다.  

타입스크립트의 특징 때문에 프로그래머가 어떤 파일에 a라는 변수명이 정의되어 있으면 이 파일에는 a1 이런식으로 피해가야 될까?  
그렇다면 굳이 파일을 나눌 필요가 없다.  
각각의 독립된 이름 공간들을 써줘야 파일을 나눠서 코드를 분리하는 의미도 있기 때문이다.  

### 해결 방법
두가지 해결 방법이 있다.

#### 첫번째 해결 방법
   export나 import같은 모듈 시스템을 사용하는 문법 키워드를 파일 내 한번 이상 작성을 하면 해당 ts 파일은 독립 된 공간으로 바라보기 시작한다.  
   독립 된 모듈, 격리 된 모듈로 바라보기 시작한다는 것이다.
   
  ```ts
  const a = 1;
  export {};
  ```
  위 코드처럼 작성할 경우 변수 a는 moduleDetection1.ts라는 독립된 모듈 안에만 있다고 본다는 것이다.  
  모든 파일마다 export나 import같은 키워드를 억지로라도 넣어 해결하는 방법이다.

#### 두번째 해결 방법
두번째 해결 방법으로는 tsconfig.json의 compilerOptions에서 moduleDetection 옵션을 설정하는것이다.  
해당 옵션은 이름에서 알 수 있듯이 타입스크립트가 각각의 파일을 어떤 모듈로 감지할 것이냐를 결정하는 옵션이다.  
이 옵션의 value값을 "force"로 설정할 경우 에러가 사라진다.  
  - tsconfig.json
  ```json
  {
    "compilerOptions": {
	    /* 생략 */
	    "module": "ESNext",
	    "moduleDetection": "force"
	  },
	  /* 생략 */
  }
  ```


만약 사라지지 않을 경우 현재 작성한 tsconfig.json을 기준으로 타입검사를 다시 수행해야한다.
Ctrl + Shift + P > restart 검색 > Restart TS Server 명령 실행  
위 과정을 통해 tsconfig.json을 기준으로 타입스크립트 파일들을 전부 다시 검사하기 때문에,tsconfig.json에 방금 저장한 옵션들이 즉시 적용된다.

 - tsc 컴파일
  ```
  tsc
  ```

- dist/moduleDetection1.js | dist/moduleDetection2.js
  ```js
  const a = 1;
  export {};
  ```
컴파일 결과로 생성된 두 자바스크립트 파일을 열어보면 놀랍게도 모두 export {}; 코드가 추가된것을 확인할 수 있다.  

타입스크립트로 컴파일 되면서 타입스크립트 컴파일러가 모듈 시스템을 사용하는 키워드를 자동으로 추가해준다.  

앞서 첫번째 방법으로 기본적으로 모든 타입스크립트 파일은 전역 모듈로 취급을 받기 때문에 개별 모듈로 취급 받도록 하려면 파일 안에 export 같은 모듈 시스템을 사용하는 키워드를 하나라도 넣어둬야 하는것으로 알아 보았다.  
tsconfig.json에서 옵션을 통해 moduleDetection 옵션을 force 값으로 키게 되면 타입스크립트 파일 안에 모듈 시스템이 없는 키워드도 타입스크립트 컴파일러가 자동으로 모듈시스템을 사용하는 코드를 추가해 주면서 모든 파일이 결국 개별 모듈로 취급되도록 만들어 준다.  

참고로 자동으로 추가된 모듈 시스템의 키워드는 ES 모듈 시스템의 export다.  
이는 변환된 tsconfig.json의 "module": "ESNext" 옵션을 통해 자바스크립트 코드의 모듈 시스템을 ESNext로 설정했기 때문에 그렇다.  

만약 "module": "CommonJS"로 옵션을 바꾼 뒤 다시 컴파일 해보면 export같은 ESM 모듈 시스템의 키워드가 아니라 exports라는 CommonJS 모듈 시스템으로 컴파일 되는것을 볼 수 있다.

 - moduleDetection1.js | moduleDetection2.js
   ```js
   "use strict"
   Object.defineProperty(exports, "__esModule", {value: true});
   const a = 1;
   ```

따라서 코드는 tsconfg.json의 모듈 설정에 따라 달라진다.

### 정리
모든 타입스크립트 파일은 글로벌 모듈, 전역 모듈로 취급받기 때문에 파일이 다르더라도 위와 같이 중복된 변수를 선언하면 오류가 발생한다.  
이를 해결하기 위해서는 각각의 타입스크립트 파일들을 개별 모듈로 만들어 줘야 하며, 그렇게 만들는 방식이 타입스크립트 파일에 명시적으로 export나 import 같은 모듈 시스템의 키워드를 하나 이상 활용한다.  
그런데 모든 타입스크립트의 파일에 이런 export나 import 같은 키워드들을 넣어 두기엔 번거롭고 까먹을 수 있기 때문에 자동으로 해주는 방식이 tsconfig.json에 moduleDetection 옵션을 force로 설정해 두는 것이 있다.  
이렇게 설정해 주면 자동으로 모든 타입스크립트 파일에 export나 import 같은 키워드를 자동으로 추가해주면서 모든 타입스크립트 파일을 개별 모듈로 취급될 수 있도록 도와준다.  

</details>
<br>

## ts-node 옵션 (TSX를 사용할 경우 생략)

<details><summary>펼치기/접기</summary>  

만약 tsconfig.json의 module 옵션을 CommonJS가 아닌 ESNext로 설정해 준 다음 ts-node를 실행하면 오류가 발생한다.

REAEDME.md 의 Install 부분에 node.js 20 버전부터 동작하지 않는다고 적어놨으나, 아래와 같이  
오류가 발생한다.

```text/plain
(node:24712) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
C:\Programming\workspace_vs\onebite-typescript\section01\src\index.ts:3
export {};
^^^^^^

SyntaxError: Unexpected token 'export'
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module.m._compile (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1618:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Object.require.extensions.<computed> [as .ts] (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at phase4 (C:\Users\yjou7\AppData\Roaming\npm\node_modules\ts-node\src\bin.ts:649:14)
```

export {} 를 이해하지 못하는것을 확인할 수 있다.  
node에서 오류가 발생했고, ES모듈을 로드하려면 "type": "module"을 package.json에 정의하라고 나온다.  
자바스크립트의 경우 node.js에서 ES 모듈 시스템을 사용하려면 package.json에 "type": "module"을 설정해야된다.

- package.json
  ```json
  {
    /* 프로젝트 옵션 생략 */
    "type": "module", /* <===== 옵션 추가 */
    "dependencies": {/* 생략 */}
  }
  ```
    

위와같이 설정한 뒤 다시 ts-node 명령을 실행할 경우 또 한번의 에러 메시지를 당면하게 된다.

```
TypeError: Unknown file extension ".ts" for C:\Programming\workspace_vs\onebite-typescript\section\src\index.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:160:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:203:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async ModuleLoader.load (node:internal/modules/esm/loader:409:7)
    at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:291:45)
    at async link (node:internal/modules/esm/module_job:76:21) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
```

타입스크립트 파일 자체를 이해못하는 기상천외한 오류이다.  
이 오류가 발생한 이유는 ts-node가 ES 모듈 시스템을 해석하지 못해서 그렇다.  
node.js가 해석하도록 "type": "module" 설정을 했지만 ts-node는 여전히 ES 모듈 시스템을 이해할 수 없다.  
그 이유는 기본적으로 ts-node가 기본적으로 CommonJS 모듈시스템을 사용하기 때문에 그렇다.  
그래서 이런 경우에는 tsconfig.json에 가서 ts-node에 대한 옵션을 추가해주면 된다.

- tsconfig.json 
  ```json
  {
    "compilerOptions": {
      // "target": "ES5",
      "target": "ESNext",
      // "module": "CommonJS", /* module - CommonJS */
      "module": "ESNext", /* module - ESNext */
      "outDir": "dist", /* outDir 옵션 추가 */
      "strict": true, /* 엄격한 타입 체크 */
      "moduleDetection": "force"
    },
    /* ts-node 옵션: 20 lts 버전의 경우 package.json에 "type": "module" 옵션과 함께 사용 */
    "ts-node": {
      "esm": true // <===== 옵션 추가
    },  
    "include": ["src"]
  }
  ```
    

위 설정은 node 버전을 LTS 버전으로 낮추었을 경우에 해당한다.  
v20.11.1 버전의 node를 사용하는 필자의 경우에는 설정이 빈 {} 형태의 tsconfig.json 파일만 만들어 두거나 compilerOptions의 module 옵션을 "CommonJS"로 설정하면 위 설정과 상관 없이 해당 오류는 발생하지 않는다.

이는 앞서 말했던 설명중 ts-node가 기본적으로 CommonJS 모듈시스템을 사용하기 때문이다.
여기서 한가지 알 수 있는점은, tsconfig.js에 module옵션을 설정하지 않을 경우 타입스크립트 컴파일러는 자동으로 CommonJS 모듈시스템을 따른다는 점이다.

[참조 레퍼런스](https://hi-rachel.tistory.com/185)

</details>  

## SkipLibCheck 옵션 (undici-types 관련 에러)

<details><summary>펼치기/접기</summary>  

@types 버전이 20버전 이상으로 업데이트 되면서 특정 라이브러리에서 타입 검사 오류가 발생하고 있다.  
따라서 tsconfig.json 파일에서 compilerOption 내부에 skibLibCheck 옵션을 추가해야 한다.

- tsconfig.json
  ```json
  {
    "compilerOptions": {
      // "target": "ES5",
      "target": "ESNext",
      // "module": "CommonJS", /* module - CommonJS */
      "module": "ESNext", /* module - ESNext */
      "outDir": "dist", /* outDir 옵션 추가 */
      "strict": true, /* 엄격한 타입 체크 */
      "moduleDetection": "force",
      "skipLibCheck": true
    },
    /* ts-node 옵션: 20 lts 버전의 경우 package.json에 "type": "module" 옵션과 함께 사용 */
    /* "ts-node": {
      "esm": true
    }, */ 
    "include": ["src"]
  }
  ```
    

위 옵션의 경우 타입 정의 파일(.d.ts 확장자를 갖는 파일을 의미한다.)의 타입 검사를 생략하는 옵션이다.  
보통 타입 정의 파일은 라이브러리에서 사용하는데 가끔 라이브러리의 타입 정의 파일에서 타입 오류가 발생할 수 있다.  
따라서 해당 옵션을 true로 설정하여 불필요한 정의 파일의 타입 검사를 생략하도록 설정한다.

</details>