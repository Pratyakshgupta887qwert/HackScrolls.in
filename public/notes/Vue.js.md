## Introduction
---
#### What is Vue ? 
-  It is a Javascript framework for building user interfaces. It builds an top of standard HTML, CSS, and JavaScript and provides a declarative, components-based programming model that helps you efficienly develop user interfaces of any complexity. 
- Here's a minimal example: 

```
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)11
    }
  }
}).mount('#app')
```

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

The above example demonstrates the two core features of Vue: 
- **Declarative Rendering:** Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state. 
- **Rreactivity:** Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen. 

#### The Progressive Framework 
Vue cover most of the common features needed in frontend development. But the web is extremely diverse- the things we build on the web may vary drastically in form and scale. With that in mind , Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:

- Enhancing static HTML without a build step. 
- Embedding as Web Components on any page. 
- Single-Page Application (SPA). 
- Fullstack / Server-Side Rendering (SSR). 
- Jamstack / Static Site Generation (SSG). 
- Targeting desktop, mobile, WebGL, and even the terminal 

#### Single-File Components 
- In most build-tool-enabled Vue projects, Vue components are authored using an HTML-like file format called **Single-File Component** (also known as `*.vue` files, abbreviated as SFC), A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format: 
 
```
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC is a  defining feature. It is the erecommended way to author Vue components if you your use case warrants a build setup. 

#### API Styles 
VUe components can authored in two different API styles: **Options API** and **Composition API.**

##### Options API 
- With this API, we define a component's logic using an object of options such as `data`, `methods`, and `mounted`. Properties defined by options are exposed on `this` inside functions, which points to the components instance.

```
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

##### Composition API
- Using this API, we define a component's logic using import API functions. In SFCs, Compostition API is typically used wtih `<script setup>`. the `setup` attribute is a hint that makes a Bue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template. 
- The following is the same component, with the exact same template, but using Composition API and `<script setup>` instead: 

```
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

#### Which API to Choose?
- Both the Options API and Composition API in Vue share the same underlying system and can handle common use cases. The Options API, built on top of the Composition API, follows a class-based structure, making it beginner-friendly and familiar to those with an OOP background. It enforces organization through predefined options. In contrast, the Composition API provides more flexibility by defining reactive state within functions, allowing for better logic reuse and composition but requiring a deeper understanding of Vue's reactivity system.
- If you are new to Vue, here's a general recommendation: 
	- For learning puposes, go with the style that looks easier understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later. 
	- For production use:
		- Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progessive enhancement.
		- Go with Composition API + Single-File Components if you plan to build full applications with Vue. 
- You dont really have to commit to only one style during the learning phase. 

---
## Quick Start
---
#### Creating a Vue Application 
- This section, explains how to scaffold a Vue Single Page Application on your local machine. (This project wil be using a build setup based on Vite and it will allow us to use Vue Single-File Components 'SFCs')
- Now, make sure that you have the latest Node.js version. And check if you are currently in your project directory. 
- Run the following command: 

```
npm create vue@latest
```

-  This command will install and execute create-vue. You will be presented with prompts for several optional features such as typescript and testing support: 

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

- if you are unsure about any option, simply choose `No` by hitting enter for now. Once the project is created, follow the instructions to install the dependencies and start the development server: 

```
cd <your-project-name>
npm install
npm run dev
```

- When you are ready to ship your app to production, run the following: 

```
npm run build
```

- This will create a production-ready app in your project's `./dist` directory.
---
## Creating a Vue Application 
---
#### The application instance:

Every Vue application starts by creating a new application instance with the `createApp` function:

```
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

#### The Root Component 

- The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its childern.
- If you are using Single-File Components, we typically import the root component from another file:

```
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

- While many examples in this guide only need a single component, most real applications are organized into a tree of nested, reusable components. For example, a Todo application's component tree might look like this: 

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

#### Mounting the App 

An application instance won't render anything until its `.mount()` method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string: 

```
<div id="app"></div>
```
```
app.mount('#app')
```

The content of the app's root component will be rendered inside the container element. The container element itself is not considered part of the app. 

The `.mount()` method should always be called after all app configurations and asset registrations are done. Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance. 

#### In-DOM Root Compoent Template 

The template for the root component is usually part of the component itself, but it is also possible to provide the template separately by writing it directly inside the mount container: 

```
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```
```
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue will automatically use the container's `innerHTML` as the template of the root component does not already have a `template` option. 

In-Dom templates are mostly used in application that are using Vue without a build step.
They can also be used in conjuctions with server-side frameworks,where the root template might be generated dynamically by the server. 

#### App Configurations 

The application instance exposes a `.config`object that allows us to configurea few app-level options, for example, defininf an app-level error handler that captures errors form all descendant components: 

```
app.config.errorHandler = (err) => {
  /* handle error */
}
```

The application instance also provides a few methods for registering app-scoped assets. For-example, registering app-scoped assets. For example, registering a component: 

```
app.component('TodoDeleteButton', TodoDeleteButton)
```

This makes the `TodoDeleteButton` available for use anywhere is our app. Make sure to apply all app configuraton before mounting the app. 

#### Multiple application instances 

You are not limited to a single application instance on the same page. The `createApp` API allows multiple Vue applicaition to co-exist on the same page, each with its own scope fro configuration and global assets: 

```
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control specific parts of a large pafge, avoid mouting a single Vue application instance on the entire page. Instead, create mulitple small application instances and mount them on the elements they are responsible for. 

---
## Template Syntax 
--- 
Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. All Vue templates are syntactically valid HTML that can be parsers. 

Under the hood, Vue compiles the templates into highly-optimized JavaScript code. Combined with the reactivity system, Vue can intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes. 

#### Text Interpolation 

The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces):

```
<span>Message: {{ msg }}</span>
```

The mustache tag will be relpaced with the value of the `msg` property from the corresponding component instance. It will also be updated wheever the `msg`  property changes. 

#### Raw HTML 
The double mustache interpret the data as plain text, not HTML. IN order to output real HTML, you will need to use the `v-html` directive: 

```
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

Here we're encountering something new. The `v-html` attribute you're seeing is called a directive. Directives are prefixed wi th v- to indicate that they are speciall attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, we're basically saying "keep the element's inner HTML up-to-date with real `rawHtml` property on the current active instance." 

The contents of the `span` will be replaced with the value of the `rawHtml` property, interpreted as plain HTML - data bindings are ignored. Note that you cannppt use `v-html` to compose template partials, because Vue is not a string-based templating engine. 
Instead, components are preffered as the fundamental unit for UI reuse and composition. 

##### Note:- 
Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS vulnerabilities](https://en.wikipedia.org/wiki/Cross-site_scripting). Only use `v-html` on trusted content and **never** on user-provided content . 

#### Attribute Bindings 

Mustaches cannot be used inside HTML attributes. Instead, use a `v-bind` directive: 

```
<div v-bind:id="dynamicId"></div>
```

The `v-bind` directive instructs Vue to keep the element's `id` attribute in sunc with the componenet's `dynamicId` property. If the bound value is `null` or `undefined`, then the attribute will be removed from teh rendered element. 

#### Shorthand 

Because `v-bind` is so commonly used, it has a dedicated shorthand syntax: 

```
<div :id="dynamicId"></div>
```

Attributes that start with `:` may look a bit different from normal HTML, but it is in fact a valid character for attribute names and all Vue-supported browsers can parse it correctly. In addition, they do not appear in the final rendered markup. The shorthand syntax is optional, but you will likely appreciate it when you learn more about its usage later.

#### Same-name Shorthand 
- Only supported in 3.4+ 

If the attribute has the same name with the JavaScript value being bound, the syntax can be further shortened to omit the attribute value: 

```
<!-- same as :id="id" -->
<div :id></div>

<!-- this also works -->
<div v-bind:id></div>
```

This is similar to the property shorthand syntax when declaring objects in JavaScript. 
Note this is a feature that is only available in Vue3.4 and above. 

#### Boolean Attributes 

Boolean attributes are attributes that can indicate true / false values by their presence on an element. For example, `disabled` is one of the most commonly used boolean attributes. 

`v-bind` works a bit differently in this case: 

```
<button :disabled="isButtonDisabled">Button</button>
```

The `disabled` attribute will be included if isButtonDisabled has a truthy value. It will also be included if the value is an empty string, maintaining consistency with `<button disabled=""`For other falsy values the attributes will be omitted. 
 
#### Using JavaScript Expressions 

So far we've only been binding to simple property keys in our templates. But Vue actually supports the full power of JavaScript expressions inside all data bindings: 

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

These expressions will be evaluated as JavaScript in the data scope of the current component instance. 

In Vue templates, javaScript expressions can be used in the following way: 
- Inside text interpolations (mustaches)
- In the attribute value of any Vue directives (specail atributes that start wiht `v-`)

#### Expressions Only

Each binding can only contain **one single expression.** An expression is a piece of code that can be evaluated to a value. A simple check is whether it can be used after `return`. 

Therefore, the following will **NOT** work: 

<!-- this is a statement, not an expression: -->
{{ var a = 1 }}

<!-- flow control won't work either, use ternary expressions -->
{{ if (ok) { return message } }}

#### Calling  Functions 

It is possible to call a component-exposed method inside a binding expression: 

```
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

##### NOTE:- 
Functions called inside binding expressions will be called every time the component updates, so they should **not** have any side effects, such as changing data or triggering asynchronous operations. 

#### Restricted Globals Access 

Template expressions are sandboxed and only have access to a restricted list of globals. The list exposes commonly used built-in globals such as `Math` and `Date`. 

Globals not explicitly included in the list, for example user-attached properties on `window`, will not be accessible in template expressions. You can, however, explicitly define additional globals for a ll Vue expressions by adding them to `app.config.globalProperties`. 

#### Directives 

Directives are special attributes with the `v-` prefix. Vue provides a number of built-in directives, including `v-html` and `v-bind` which we have introduced above. 

Directive attribute values are expected to be single JavaScript expressions (with the exception of `v-for`, `v-on` and `v-slot`, which will be discussed in their respective sections later). A directive's jo is to reactively apply updates to the DOM when the value of its expression changes. Take `v-if` as an example: 

```
<p v-if="seen">Now you see me</p>
```

Here , the `v-if` directive would remove or insert the `<p>` element based on the truthiness of the value of the expression `seen`. 

#### Arguments 

Some directives can take an "argument", denoted by a colon after the directive name.  For example, the `v-bind` directive is used to reaactively update an HTML attribute: 

```
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Here, `href` is the argument, which tells the `v-bind` directive to bind the element's `href` attribute to the value of the expression `url`. In the shorthand, everything before the argument (i.e., `v-bind:`) is condensed into a single character, `:`. 

Another example is the `v-on` directive, which listens to DOM events: 

```
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

Here, the argument is the event name to listen to: `click`. `v-on` has a corresponding shorthand, namely the `@` character. We will talk about event handling in more detail too. 

#### Dynamic Arguments 
It is also possible to use a JavaScript expression in  a directive argument by wrapping it with square brackets: 

```
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

Here, `attributeName` will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final value for the argument. For example, if your component instance has a data property, `attributeName`, whose value is `"href"`, then this binding will be equivalent to `v-bind:href`. 

Similarly, you can use dynamic arguments to bind a handler to a dynamic event name: 

```
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething"> ... </a>
```

In this example, when `eventName`'s value is `"focus"`, `v-on:[eventName]` will be equivalent to `v-on:focus`. 

#### Dynamic Argument Value Constraints 
Dynamic arguments are expected to evaluate to a string, with the exception of `null`. The special value `null` can be used to explicitly remove the binding. Any other non-string value will trigger a warning. 

#### Dynamic Argument Syntax Constraints  
Dynamic arguments expressions have some syntax constraints because certain characters, such as spaces and qoutes, are invalid inside HTML attribute names. For example, the following is invalid:

```
<!-- This will trigger a compiler warning. -->
<a :['foo' + bar]="value"> ... </a>
```

If you need to pass a complex dynamic argument, it's probably better to use a computed property, which we will cover shortly. 

When using in-DOM templates (templates directly written in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase: 

```
<a :[someAttr]="value"> ... </a>
```

The above will be converted to `:[someattr]` in in-DOM templates. If your component has a `someAttr` property instead of `someattr`, you code won't work. Templates inside Single-File Components are not subject to this constraint. 

#### Modifiers 
Modifiers are speacial postfixes denoted by a dot, which indicate that a directive should be  bound in some special way. For example, the `.prevent` modifier tells the `v-on` directive to call `event.preventDefault()` on the triggered event: 

```
<form @submit.prevent="onSubmit">...</form>
```

You'll see other examples of modifiers later for `v-on` and for `v-model`, when we explore those features. 

and finally, here's the full directive syntax visualized: 

![[Pasted image 20250217230247.png]]

---
## Reactivity Fundamentals (Composition API)
#### Declaring Reactive State 
##### `Ref()`

In Composition API, the recommended way to declare reactive state is using the `ref()` function: 

```
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property: 

```
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

To acces refs in a component's template, declare and return them from a component's `setup()` function: 

```
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```

```
<div>{{ count }}</div>
```

Notice that we did not need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped ehen used inside templates (with a few caveats). 

You can also mutate a ref directly in event handlers: 

```
<button @click="count++">
  {{ count }}
</button>
```

For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state: 

```
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```

Exposed methods can then be used as event handlers: 

```
<button @click="increment">
  {{ count }}
</button>
```

##### `<script setup>`
Manually exposing state and methods via `setup()` can be verbose. Luckily, it can be avoided when using Single-File components (SFCs). We can simplify the usage with `<script setup>`:
```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

Top-level imports, variable and functions declared in `script setup` are automatically usable in the template of the same component. Think of the template as a JavaScript function declared in the same scope - it naturally has access to everything declared alongside it. 

##### Why Refs ?

When you use a ref in a template, and change ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue tracks every ref that was used during the render. Later on, when a ref is mutated 