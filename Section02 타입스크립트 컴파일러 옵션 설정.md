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
