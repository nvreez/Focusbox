# Focusbox
Focusbox is a lightbox variant with intuitive scrolling behaviour. Focusbox locks the main page while it allows scrolling of the overlay, even on iOS. Also, Focusbox is build on modules, seperating the core behaviour from different themes (views). This makes it easier to hack, for example as an interactive costum gallery.

## Workings
When the Focusbox is opened, the whole content of the `body`-tag is wrapped in a div (`#pageWrap`). This is done in a way that protects all bound events. Wrapping the whole body content can have a big impact on some scripts, so test carefully. This method is used to allow Focusbox to lock the page, even on iOS. The dic `#pageWrap` get's `position: fixed;` and also receives a negative `top` css based on the current y-scrolling position.
Placed next to the `#pageWrap` is the html needed for the focusbox. The basic structure of the body with an opened focusbox looks like this:

```html
<body>
	<div id="pageWrap">
		<!-- Original page content -->
	</div>
	<div id="focusboxOverlay">
		<div class="focusbox">
			<a class="close">&nbsp;</a>
			<div class="content">
				<!-- focusbox content is placed here -->
			</div>
		</div>
	</div>
</body>
```

## Modules
Focusbox is modular. I seperated the code in three parts:

- *Core:* The lightweight core that handles fixing the page's scroll position and creating an overlay.
- *Themes:* The different modules that handle the content.
- *jQuery method:* A method to bind an event to open Focusbox. Binds to a click-event on default.

I included two themes. The Basic theme for basic html display and the Media theme specialised in photos and video. You can create your own themes by extending the $.focusbox.themes object with your theme.

I made a simple jQuery.fn method that checks which theme to use and binds it to an event-type of choice, defaulting to a click-event. Usage:

HTML with instructions in `data-focusbox` attribute:

```html
<a href="." data-focusbox='{"type": "ajax", "data": { "url": "./test.php", "data": {"test": "<em>It works!</em>"}, "type": "POST"}}'>Ajax</
<a href="." data-focusbox='{"type": "html", "data": "<h1>It definitely works!</h1>"}'>HTML</a>
<a href="." data-focusbox='{"type": "selector", "data": "#alice"}'>Selector</a>
```

JS initialisation:

```js
$('[data-focusbox]').focusbox([eventType]);
```
