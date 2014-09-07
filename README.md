#FocusBox
FocusBox is a lightbox variant with intuitive scrolling behaviour. FocusBox fixes the page while allowing to scroll the overlay. FocusBox is build to show extra information or content, however it can also be modded for use as a photoviewer or similar applications. Developed for developers.

## Workings
When the focusBox is opened, the whole content of the `body`-tag is wrapped in a div (`#pageWrap`). This is done in a way that protects all bound events. `#pageWrap` get's `position: fixed;` and also receives a negative `top` css based on the current y-scrolling position.
Placed next to the `#pageWrap` is the html needed for the focusBox. The basic structure of the body with an opened focusBox looks like this:

```html
<body>
	<div id="pageWrap">
		<!-- Original page content -->
	</div>
	<div id="focusBoxOverlay">
		<div class="focusBox">
			<a class="close">&nbsp;</a>
			<div class="content">
				<!-- focusBox content is placed here -->
			</div>
		</div>
	</div>
</body>
```

