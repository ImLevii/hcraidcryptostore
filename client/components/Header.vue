<template>
	<header id="header">
		<div class="p-head-inner">
			<nav data-mobile="false">
				<div class="nav-left">

				</div>

				<div class="decus-mobile-menu-wrapper">
					<div class="mobile-menu">
						<span></span>
						<span></span>
					</div>
				</div>

				<div class="nav-middle ">
					<div class="left">
						<a class="item" href="https://cavepvp.org/">Home</a>
						<a class="item" href="https://cavepvp.org/index.php">Forums</a>
						<a class="item" href="https://cavepvp.org/index.php?members/&amp;key=staff_members">Staff</a>
					</div>

					<div class="storeBtn-container">
						<a class="item highlight" href="https://store.cavepvp.org">Store</a>
					</div>

					<div class="right">
						<a class="item" href="https://cavepvp.org/index.php?forums/staff-applications.11">Apply</a>
						<a class="item" href="https://cavepvp.org/index.php?forums/ban-appeals.8">Appeals</a>
						<a class="item" href="https://cavepvp.org/index.php?forums/rules.7">Rules</a>
					</div>
				</div>

				<div class="nav-right">
					<div class="p-nav-opposite">
						<div class="p-account p-navgroup--guest">
							<a class="item" href="https://cavepvp.org/index.php?login/" data-xf-click="overlay" data-follow-redirects="on">
								<span class="p-navgroup-linkText">Log in</span>
							</a>
							<a class="item" href="https://cavepvp.org/index.php?register/" data-xf-click="overlay" data-follow-redirects="on">
								<span class="p-navgroup-linkText">Register</span>
							</a>
						</div>
					</div>
				</div>
			</nav>

			<div class="logo-row">
				<div class="logo-row-inner">
					<div class="play">
						<div class="play-inner play-clip" data-clipboard-text="cavepvp.org" data-xf-init="tooltip" data-original-title="Copy IP" id="js-XFUniqueId1">
							<div class="text">
								<span class="top" id="server-ip">
									cavepvp.org
								</span>
								<span class="bottom">
									join <span id="mc-count">750</span> other players
								</span>
							</div>
							<div class="icon">
								<i class="fas fa-gamepad"></i>
							</div>
						</div>
					</div>

					<div class="logo">
						<a href="https://cavepvp.org">
							<img class="uk-animation-fade" src="~/assets/images/cavepvp-logo.png" alt="CavePvP">
						</a>
					</div>

					<div class="discord-container">
						<a href="https://discord.gg/cavepvp" target="_blank">
							<div class="discord">
								<div class="text">
									<span class="top">
										discord server
									</span>
									<span class="bottom">
										join <span id="discord-count">2487</span> other members
									</span>
								</div>
								<div class="icon">
									<i class="fab fa-discord"></i>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="curve-container">
			<svg class="curve" xmlns="http://www.w3.org/2000/svg" width="1440" height="40" viewBox="0 0 1440 40">
				<path d="M0,27.01C239.659,7,479.143,0,718.453,0S1198.28,7,1440,27.01V40H0Z" fill-rule="evenodd"></path>
			</svg>
		</div>
	</header>
</template>

<style scoped>
	.mobile-menu {
		display: none;
		width: 3.1rem;
		height: 2.3rem;
		position: relative;
		cursor: pointer;
		z-index: 99;
		margin: 0 auto;
	}

	#header .mobile-menu>span {
		background-color: #aeb5bc;
	}

	.mobile-menu>span:first-of-type {
		transform: translateY(-0.6rem);
	}

	.mobile-menu>span:last-of-type {
		transform: translateY(.3rem);
	}

	.mobile-menu>span {
		background-color: #edf6fd;
		height: .34rem;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 0;
		transition: transform .4s cubic-bezier(.77, 0, .175, 1);
	}

	.decus-mobile-menu-wrapper {
		position: absolute;
		left: 0;
		right: 0;
	}

	@media screen and (max-width: 800px) {
		.mobile-menu {
			display: block;
		}
	}

	.curve-container .curve {
		width: 100%;
		transform: scale(1.5);
		transform-origin: top;
	}

	svg:not(:root) {
		overflow: hidden;
	}

	.curve-container {
		position: relative;
		overflow: hidden;
		fill: #070A12;
	}

	.nav-right {
		margin-left: auto;
	}

	#header {
		background: linear-gradient(0deg, #571919, rgba(87,25,25,0.8)), url('~assets/images/header-bg.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.p-head-inner {
		padding-left: 10px;
		padding-right: 10px;
	}

	.p-head-inner {
		padding-left: max(10px, env(safe-area-inset-left));
		padding-right: max(10px, env(safe-area-inset-right));
	}

	.p-head-inner {
		max-width: 1147px;
		padding: 0 10px;
		margin: 0 auto;
		padding-left: 10px;
		padding-right: 10px;
	}

	#header .p-nav-opposite {
		margin: 0;
	}

	.p-nav-opposite {
		margin-left: auto;
		margin-right: 10px;
		text-align: right;
		flex-shrink: 0;
	}

	#header .nav-right .p-account.p-navgroup--guest .item:first-of-type {
		padding-right: 0;
	}

	.nav-right .item:last-of-type {
		padding-right: 0;
	}

	#header nav {
		display: flex;
		align-items: center;
		padding-top: 29px;
		height: 31px;
	}

	#header .nav-left,
	#header .nav-right {
		z-index: 2;
	}

	.nav-middle {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: -moz-min-content;
		width: -webkit-min-content;
		width: min-content;
		margin: 0 auto;
		margin-top: 32px;
		pointer-events: none;
	}

	@media screen and (max-width: 800px) {
		nav .nav-middle {
			position: fixed;
			height: 100vh;
			z-index: 10;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			opacity: 0;
			pointer-events: none;
			margin: 0;
			background-color: #070a12;
			width: unset;
			transition: opacity .35s cubic-bezier(.165, .84, .44, 1);
		}
	}

	.item {
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		font-weight: 800;
		padding: 0 24px;
		color: #edf6fd;
	}

	.item.highlight {
		background-color: #571919;
		border-top-left-radius: 42px 100%;
		border-top-right-radius: 42px 100%;
		border-bottom-left-radius: 42px 100%;
		border-bottom-right-radius: 42px 100%;
		padding: 6px 32px;
		margin-top: -6px;
		border-bottom: 3px solid rgba(0,0,0,0.2);
		position: relative;
	}

	@media screen and (min-width: 801px) {
		.nav-middle .left {
			right: 100%;
			margin-right: 10px;
		}
	}

	@media screen and (min-width: 801px) {
		.nav-middle .left, .nav-middle .right {
			position: absolute;
			top: 0;
			display: flex;
		}
	}

	@media screen and (min-width: 801px) {
		.nav-middle .right {
			left: 100%;
			margin-left: 10px;
		}
	}

	@media screen and (min-width: 801px) {
		.nav-middle .left, .nav-middle .right {
			position: absolute;
			top: 0;
			display: flex;
		}
	}

	#header .logo-row {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		margin-top: 64px;
		padding-bottom: 24px;
	}

	#header .logo-row .logo-row-inner {
		display: flex;
		align-items: flex-end;
	}

	#header .logo-row .logo-row-inner>.play {
		justify-content: flex-end;
		right: 64px;
	}

	#header .logo-row .logo-row-inner>.discord-container {
		justify-content: flex-start;
		left: 64px;
	}

	#header .logo-row .logo-row-inner>.play, #header .logo-row .logo-row-inner>.discord-container {
		display: flex;
		position: relative;
	}

	#header .logo-row .logo-row-inner>div {
		flex: 1;
	}

	#header .logo-row .logo-row-inner>.play, #header .logo-row .logo-row-inner>.discord-container {
		display: flex;
		position: relative;
	}

	#header .logo-row .discord-container>a {
		color: inherit;
		text-decoration: none;
	}

	#header .logo-row .discord {
		flex-direction: row-reverse;
	}

	#header .logo-row .discord, #header .logo-row .play {
		display: inline-flex;
		align-items: center;
	}

	#header .logo-row .discord .text {
		text-align: left;
		margin-left: 10px;
	}

	#header .logo-row .text>span.top {
		text-transform: uppercase;
		font-weight: 800;
		color: #edf6fd;
		font-size: 16px;
		letter-spacing: .04em;
	}

	#header .logo-row .text>span.bottom {
		color: #edf6fd;
		opacity: .6;
		font-size: 14px;
	}

	#header .logo-row .icon i {
		font-size: 40px;
		color: #edf6fd;
	}

	#header .play-inner {
		display: flex;
	}

	#header .logo-row .logo-row-inner>div {
		flex: 1;
	}

	#header .logo-row .logo {
		margin-bottom: -12%;
	}

	#header .logo-row .logo img {
		position: relative;
		z-index: 999;
		width: 460px;
	}

	#header .logo-row .play .text {
		text-align: right;
		margin-right: 10px;
	}

	#header .logo-row .text>span.top {
		text-transform: uppercase;
		font-weight: 800;
		color: #edf6fd;
		font-size: 16px;
		letter-spacing: .04em;
	}

	#header .logo-row .text>span {
		display: block;
	}

	#header .logo-row .text>span.bottom {
		color: #edf6fd;
		opacity: .6;
		font-size: 14px;
	}

	#header .logo-row .text>span {
		display: block;
	}

	@media screen and (max-width: 800px) {
		#header .logo-row {
			padding-bottom: 64px;
		}
	}

	@media screen and (max-width: 800px) {
		#header .logo-row .logo-row-inner {
			align-items: center;
			flex-direction: column;
		}
	}

	@media screen and (max-width: 800px) {
		#header .logo-row .logo-row-inner > .play,
		#header .logo-row .logo-row-inner > .discord-container {
			justify-content: center;
			left: 0;
			right: 0;
		}
	}

	@media screen and (max-width: 800px) {
		#header .logo-row .logo-row-inner .logo {
			order: -1;
			margin: 0 15%;
		}
	}

	@media screen and (max-width: 800px) {
		#header .curve-container {
			display: none;
		}
	}

	@media screen and (max-width: 800px) {
		#header .logo-row .discord-container, #header .logo-row .play {
			margin: 24px 0 0;
			margin-top: 24px;
			margin-right: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
		}
	}
</style>

<script>
	export default {

	}
</script>
