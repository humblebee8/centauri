# 👽Centauri - flexible astro template

> **NOTE:** this is a work in progress and may not be perfect. Feel free to open an issue for suggestions/discussion.

### **Let's explore Centauri A**

Centauri is a flexible astro template with developer peace in mind. With the ultimate goal of one day becoming a mature "CMS" (not in a traditional way) it's intended to bootstrap development with astro.

### 🧑‍🚀*Quickstart*

1. clone this repo  
2. npm i  
3. npm run dev
4. happy hacking

## 📦 What is inside?

- tailwind css
- theme support
- flexible layout system
- ready to use svelte components

Thanks to the awesomeness of astro you can still use your favorite framework preact, react or vue, just install your favorite renderer and you're good to go. Everything **Centrauri** specific will still work as before.

## 🚀 Project Structure

Inside of your Centauri project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   |── components/
│   |   |── navigation/
│   |   |   └── mainmenu.astro
│   |   |   └── ... WIP
│   |   └── ... WIP/
│   |── layouts/
│   |   └── Default.astro
│   |   └── Shell.astro
│   |── pages/
│   |   └── index.astro
│   └── themes/
│       |── colorful.css
│       └── default.css
└── package.json
```
Inside the layouts folder you'll find the Default.astro layout wrapper. It's making use of slots and a little 2 lines of js to provide you with flexible, efficient layouting without having troublesome boilerplate on all of your pages.

In Company you'll find the themes folder which contains specific css. Layout and Theme are separated on purpose as they're different concerns.

## ☄️ how does it work?
> in /pages/index.astro
```js
---
	import Default from "$layouts/Default.astro";
---
```
```html
<Default title="default title" description="default description" bodyClasses="default">
 	<!-- ADD TO HTML HEAD --> 
	<meta charset="utf-8" slot="htmlhead">

 	<!-- REMOVE DEFAULT <header></header>  --> 
	<div slot="headerwrapper">header is a div here</div>
	<!-- OR -->
	<div slot="contentheader">content inside default header</div>
	<!-- OR REMOVE ENTIRE <header></header> -->
	<div slot="headerwrapper" disposable></div>

 	<!-- REMOVE DEFAULT <main></main> -->
	<div slot="mainwrapper">main is a div here</div>
	<!-- OR JUST PLACE YOUR CONTENT (default slot will be used) -->
	<div>content inside default main</div>
  <!-- OR REMOVE ENTIRE <main></main> -->
	<div slot="mainwrapper" disposable></div>

 	<!-- REMOVE DEFAULT <footer></footer> -->
	<div slot="footerwrapper">footer is a div here</div>
	<!-- OR -->
	<div slot="contentfooter">content inside default footer</div>
  <!-- OR REMOVE ENTIRE <footer></footer> -->
	<div slot="footerwrapper" disposable></div>
</Default>

<!-- disposable -->
<div slot="headerwrapper" disposable></div> 
```
**disposable** can be used to remove any html node for whatever reason
```html
<!-- for example: -->
<div slot="contentmain">
	<h1>Test H1</h1>
	<h2>Test H2</h2>
	<h3 disposable>Test H3</h3> <!-- will be removed from dom -->
	<h4>Test H4</h4>
	<h5>Test H5</h5>
	<h6>Test H6</h6>
</div>
```
## Dynamic page attributes
```html
<!-- you may pass a title, description, bodyClasses (tailwind classes work too!) or the theme to use (themes folder) into the Default layout component -->
<Default title="default title" description="default description" bodyClasses="bg-red-600" theme="colorful">
    ... stuff here
</Default>
```

## Working with Menus
```js
---
	import Default from "$layouts/Default.astro";
	import Mainmenu from "$components/navigation/mainmenu.astro";

	const menuItems = [
		'Home',
		'About',
		'Get started'
	];
---
```
```html
<!-- Menu Items can be passed either as props to the Default layout astro component -->
<Default title="default title" description="default description" bodyClasses="default" theme="colorful" menuItems={menuItems}>
	<div slot="contentheader">
		<!-- Menu Items can also be passed to the component directly -->
		<Mainmenu menuItems={['Test 1', 'Test 2']}></Mainmenu>
		<!-- You can also pass in your own menu component as well as simple html -->
		<ul>
			<li>test1</li>
			<li>test2</li>
			<li>test3</li>
			<li>test4</li>
			<li>test5</li>
		</ul>
	</div>
	<div slot="contentmain">
		<span>CONTENT</span>
	</div>
	<div slot="contentfooter">
		content inside default footer
	</div>
</Default>
```
Inserting content to header and footer is entirely optional, so you can as well just use the Default.astro layout component and yield your page content into it without caring about the main menu in the header or the footer. This way header and footer stay the same on all pages *unless* you want to change them on a per page level.

```js
---
	import Default from "$layouts/Default.astro";
	const menuItems = [
		'Home',
		'About',
		'Get started'
	];
---
```
```html
<Default title="default title" description="default description" bodyClasses="default" menuItems={menuItems}>
	<div class="bg-centauri">
		<div class="p-6">
			<h1 class="text-center uppercase font-bold">Test H1</h1>
		</div>
	</div>
</Default>
```
Ofcourse you can change your Menu Items per page.  

## Default props

| prop | description | default |
|---|---|---|
| title | the page title | empty string |
| description | the page description | empty string |
| bodyClasses | additional body classes | empty string |
| theme | the theme.css file used (see themes folder) | default |
| menuItems | menu items displayed on that page | array |
| loginRedirect | where to redirect to after login | '/' |
| redirectAfterSetup | where to redirect to after sign up | '/' |
| loginPageSlug | slug for login page | '/signin' |

### **menuItems**

```js
    [
		{
			label: 'home', // required
			slug: '' // required
		},
		{
			label: 'use it',
			slug: 'useit'
		},
		{
			label: 'docs',
			slug: 'docs',
			authenticated: false // optional - false = only show to guest users
		},
		{
			label: 'logout',
			slug: 'logout',
			preventDefault: true, // don't redirect on click, useful if you need to trigger events
			authenticated: true // only show to authenticated users
		}
	]
```

## Authentication with Supabase

1. Setup your login page
2. add loginRedirect to your Default component
3. create an account and project at supabase https://supabase.com/ 
4. enter your **supabase url** and **anon key** in .env (see .env.sample)
5. enjoy

```html
<!-- props that can be set on Default -->
<!-- 
	loginRedirect = '/', # where to redirect to after login
	redirectAfterSignUp = '/', # where to redirect to after sign up
	loginPageSlug = '/signin' # slug for login page
-->

<Default title="login" description="join our community" loginRedirect="/docs" loginPageSlug="/myloginpage">

</Default>
```

## 👀 Learn more about Astro and join the Community!  

Feel free to check [our documentation](https://github.com/withastro/astro) or jump into our [Discord server](https://astro.build/chat).
