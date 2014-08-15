#Focusbox
Focusbox is a lightbox variant with intuitive scrolling behaviour. Focusbox fixes the page while allowing to scroll the overlay. Focusbox is build to show extra information or content, however it can also be modded for use as a photoviewer or similar applications. Developed for developers.

## Workings
When the focusbox is opened, the whole content of the `body`-tag is wrapped in a div (`#pageWrap`). This is done in a way that protects all bound events. `#pageWrap` get's `position: fixed;` and also receives a negative `top` css based on the current y-scrolling position.
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

