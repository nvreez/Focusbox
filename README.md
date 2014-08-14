A lightbox variant with intuitive scrolling behaviour. This lightbox fixes the page and allows the lightbox to be taller than the viewport. Developed for developers.

## Workings
When the lightbox is opened, the whole content of the `body`-tag is wrapped in a div (`#pageWrap`). This is done in a way that protects all bound events. `#pageWrap` get's `position: fixed;` and also receives a negative `top` css based on the current y-scrolling position.
Placed next to the `#pageWrap` is the html needed for the lightbox. The basic structure of the body with an opened lightbox looks like this:

```html
<body>
	<div id="pageWrap">
		<!-- Original page content -->
	</div>
	<div id="lightboxOverlay">
		<div class="lightbox">
			<a class="close">&nbsp;</a>
			<div class="content">
				<!-- Lightbox content is placed here -->
			</div>
		</div>
	</div>
</body>
```

