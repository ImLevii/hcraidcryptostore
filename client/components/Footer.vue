<template>
	<footer id="footer">
		<div class="upper-container">
			<div class="upper">
				<div class="info">
					<p class="main">Play now at</p><a class="play play-clip" data-clipboard-text="cavepvp.org" data-xf-init="tooltip" data-original-title="Copy IP" id="js-XFUniqueId61">cavepvp.org</a>
					<p>CavePvP is a Minecraft PotPvP Network that features a variety of gamemodes such as HCF, KitPvP, Bunkers &amp; Practice!</p>
				</div>

				<a href="/"><img src="~/assets/images/cavepvp-logo.png" alt="CavePvP"></a>
			</div>
		</div>

		<div class="lower-container">
			<div class="lower">
				<p>© 2021 CavePvP Network. All Rights Reserved</p>
				<nav class="footer-nav">
					<ul>
						<li><a class="u-concealed" href="https://cavepvp.org/index.php?misc/contact/" data-xf-click="overlay">Contact us</a></li>
						<li><a class="u-concealed" href="https://cavepvp.org/index.php?help/terms/">Terms and rules</a></li>
						<li><a class="u-concealed" href="https://cavepvp.org/index.php?help/privacy-policy/">Privacy policy</a></li>
						<li><a class="u-concealed" href="https://cavepvp.org/index.php?help/">Help</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</footer>
</template>

<style scoped>
	#footer {
		font-size: 14px;
	}

	#footer .upper-container {
		background-color: #1c1e27;
	}

	#footer .lower-container {
		background-color: #292b35;
		font-weight: 800;
	}

	#footer .upper {
		color: #677079;
		min-height: 180px;
		padding-top: 48px;
		padding-bottom: 48px;
	}

	#footer .lower {
		color: #aeb5bc;
		padding-top: 24px;
		padding-bottom: 24px;
	}

	#footer .extra-container .lower {
		font-weight: 400;
		font-size: 12px;
		color: #677079;
	}

	#footer .upper, #footer .lower {
		padding-left: max(10px, env(safe-area-inset-left));
		padding-right: max(10px, env(safe-area-inset-right));
	}

	#footer .upper,
	#footer .lower {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1147px;
		padding: 24px 10px;
		margin: 0 auto;
		padding-left: 10px;
		padding-right: 10px;
	}

	#footer .upper-container .upper .info {
		max-width: 500px;
	}

	#footer .upper-container .upper .info p.main {
		margin-bottom: 10px;
	}

	#footer .upper-container .upper .info p.main,
	#footer .upper-container .upper .info a {
		display: inline-block;
		color: #9099a2;
	}

	#footer .upper-container .upper .info a {
		display: inline-block;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		cursor: pointer;
		border: 0px solid transparent;
		white-space: nowrap;
		-webkit-transition: background-color .25s ease;
		transition: background-color .25s ease;
		font-size: 14px;
		border-top-left-radius: 32px 100%;
		border-top-right-radius: 32px 100%;
		border-bottom-right-radius: 32px 100%;
		border-bottom-left-radius: 32px 100%;
		padding-top: 6px;
		padding-right: 18px;
		padding-bottom: 6px;
		padding-left: 18px;
		text-align: center;
		min-width: 40px;
		box-shadow: 0 -3px 0 rgb(0 0 0 / 10%) inset;
		margin-left: 10px;
		background: #292b35;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	#footer .upper-container .upper img {
		height: 110px;
		filter: grayscale(1);
		opacity: .2;
	}

	#footer .lower-container .footer-nav {
		padding-left: 28px;
	}

	#footer .lower-container .footer-nav ul li {
		display: inline-block;
	}

	#footer .lower-container .footer-nav ul li:not(:last-child) {
		margin-right: 10px;
	}

	.u-concealed, .u-concealed a, .u-cloaked a, .u-concealed--icon a {
		text-decoration: inherit !important;
		color: inherit !important;
	}
</style>
