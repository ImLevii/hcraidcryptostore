<template>
	<div class="uk-container uk-margin">
		<div class="hero">
			<div class="hero-text mobile-only">
				<span class="hero-title">Purchase using crypto.</span>
				<span class="hero-paragraph">Fast and secure way to purchase anything on our store using {{ getSupportedCurrenciesNum }} popular cryptocurrencies. Fully automated with no verification required.</span>

				<ul class="crypto-list">
					<li v-for="currency in currencies">
						<img :src="currency.icon" :alt="currency.name"/>
					</li>
				</ul>
			</div>

			<form v-if="!confirming" class="purchase-form uk-animation-fade">
				<span class="form-title">Exchange Crypto</span>
				<span class="form-subtitle">For store credit</span>

				<p v-if="error != null" class="uk-p uk-p-red alt uk-margin">{{ error }}</p>
				<p v-if="updated" class="uk-p uk-p-yellow alt uk-margin">The exchange rate has updated! Check the exchange details and try again.</p>

				<div class="uk-form-controls uk-margin uk-form-group">
					<span class="uk-input-label">You send</span>

					<label>
						<input class="uk-input" type="number" step="any" v-model="youSendAmount" @change="updateSendAmount">
					</label>

					<button class="currency-dropdown-btn" type="button">
						<span class="currency-info">
							<span class="name">{{ currencyName }}</span>
							<span class="tag">{{ currencyTag }}</span>
						</span>

						<i class="fas fa-angle-down"></i>
					</button>

					<div uk-dropdown="mode: click; pos: bottom-right" class="currency-dropdown" ref="currency-dropdown">
						<ul>
							<li v-for="currency in currencies">
								<a @click="selectCurrency(currency)">
									<img :src="currency.icon" :alt="currency.tag"/>
									<span class="currency-tag">{{ currency.tag }}</span>
									<span class="currency-name">{{ currency.name }}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-form-controls uk-margin uk-form-group">
					<label>
						<span class="uk-input-label">You receive approximately</span>
						<input class="uk-input" type="number" v-model="youReceiveAmount" @change="updateReceiveAmount">

						<div class="currency-conversion">
							<span class="name">Store Credit</span>
							<span class="tag">USD</span>
						</div>
					</label>
				</div>
				<div class="uk-form-controls uk-margin">
					<label>
						<input class="uk-input" type="email" v-model="buyerEmail" placeholder="Your email address">
					</label>
				</div>
				<div class="uk-form-controls uk-margin">
					<button class="flat-button uk-btn-green" type="submit" @click.stop.prevent="startPurchase()" v-bind:disabled="updating">
						Exchange now
					</button>
				</div>
			</form>

			<form v-else class="purchase-form uk-animation-fade">
				<span class="form-title" style="text-align: left">Checkout</span>

				<button type="button" class="back-button" @click="goBack()">
					<i class="fas fa-arrow-alt-left"></i>
					Back
				</button>

				<p v-if="error != null" class="uk-p uk-p-red alt uk-margin">{{ error }}</p>
				<p v-if="updated" class="uk-p uk-p-yellow alt uk-margin">The exchange rate has updated! Check your checkout details and try again.</p>

				<div class="uk-grid uk-margin">
					<div class="uk-width-1-2@m">
						<div class="transaction-details">
							<span class="field-label">You send</span>
							<span class="tx-amount">{{ youSendAmount }} {{ currencyTag }}</span>
							<span class="cx-details">{{ currencyName }}</span>
						</div>
					</div>
					<div class="uk-width-1-2@m">
						<div class="transaction-details">
							<span class="field-label">You get</span>
							<span class="tx-amount">{{ youReceiveAmount }} USD</span>
							<span class="cx-details">Store Credit</span>
						</div>
					</div>
				</div>

				<hr/>

				<div class="transaction-details">
					<span class="field-label">Guaranteed rate</span>
					<span class="exchange-rate">1 {{ currencyTag }} = {{ currencyRate }} USD</span>
				</div>

				<div class="uk-form-controls uk-margin">
					<button class="flat-button uk-btn-green" type="submit" @click.stop.prevent="confirmPurchase()" v-bind:disabled="updating">
						Checkout
					</button>
				</div>
			</form>

			<div class="hero-text">
				<span class="hero-title">Purchase using crypto.</span>
				<span class="hero-paragraph">Fast and secure way to purchase anything on our store using {{ getSupportedCurrenciesNum }} popular cryptocurrencies. Fully automated with no verification required.</span>

				<ul class="crypto-list">
					<li v-for="currency in currencies">
						<img :src="currency.icon" :alt="currency.name"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.hero {
		display: flex;
		align-items: center;
		padding: 60px 0;
	}

	.hero-text.mobile-only {
		display: none;
		margin: 0;
	}

	@media screen and (max-width: 800px) {
		.hero {
			flex-direction: column;
		}

		.hero > div {
			width: 100%;
		}

		.hero-text {
			display: none !important;
		}

		.hero-text.mobile-only {
			display: block !important;
		}
	}

	.purchase-form .transaction-details {
		display: flex;
		flex-direction: column;
	}

	.purchase-form .transaction-details .field-label {
		color: #b4b4b4;
		font-size: 14px;
		line-height: 14px;
	}

	.purchase-form .transaction-details .tx-amount {
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		line-height: 18px;
		margin: 6px 0;
	}

	.purchase-form .transaction-details .cx-details {
		color: #69cf54;
		font-size: 14px;
		line-height: 14px;
		text-transform: lowercase;
	}

	.purchase-form .transaction-details .exchange-rate {
		color: #69cf54;
		font-weight: bold;
	}

	.purchase-form hr {
		border-top-color: #43454b;
	}

	.purchase-form .back-button {
		position: absolute;
		top: 26px;
		right: 40px;
		padding: 8px 12px;
		background: #2F3A40;
		border-radius: 3px;
		color: #fff;
		font-size: 16px;
		font-family: 'Rajdhani', sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		line-height: 15px;
	}

	.purchase-form .back-button i {
		font-size: 13px;
		margin-right: 4px;
	}

	.purchase-form {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 460px;
		padding: 30px 40px;
		background: #1C1E27;
		box-shadow: 0 0 60px #08141d;
		border-bottom: 3px solid #1A1D22;
		border-radius: 6px;
		box-sizing: border-box;
	}

	.purchase-form .form-title,
	.purchase-form .form-subtitle {
		color: #FFF;
		font-family: 'Rajdhani', sans-serif;
	}

	.purchase-form .form-title {
		font-size: 24px;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		line-height: 24px;
	}

	.purchase-form .form-subtitle {
		font-size: 14px;
		text-transform: uppercase;
		text-align: center;
		line-height: 14px;
	}

	.purchase-form .uk-form-group {
		position: relative;
	}

	.purchase-form .uk-form-group .uk-input {
		padding: 40px 14px 20px 14px;
		font-size: 21px;
		font-weight: bold;
		line-height: 16px;
	}

	.purchase-form .uk-input {
		padding: 20px 14px;
		background: #292B35;
		border: none;
		border-radius: 3px;
		color: #fff;
		font-size: 16px;
		line-height: 13px;
	}

	.purchase-form .uk-input::-webkit-outer-spin-button,
	.purchase-form .uk-input::-webkit-inner-spin-button {
		display: none;
	}

	.purchase-form .uk-input-label {
		position: absolute;
		top: 10px;
		padding: 0 14px;
		font-size: 13px;
		color: #b4b4b4;
	}

	.purchase-form .currency-dropdown {
		width: 100%;
		top: 54px !important;
		padding: 10px 0;
		background: #292B35;
		border: none;
		border-radius: 4px;
	}

	.purchase-form .currency-dropdown ul > li > a {
		display: flex;
		align-items: center;
		padding: 10px 10px;
	}

	.purchase-form .currency-dropdown ul > li > a:hover {
		background: #363842;
	}

	.purchase-form .currency-dropdown ul > li > a > .currency-tag {
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		line-height: 18px;
		margin-right: 10px;
	}

	.purchase-form .currency-dropdown ul > li > a > .currency-name {
		font-size: 14px;
		color: #b4b4b4;
		line-height: 14px;
	}

	.purchase-form .currency-dropdown ul > li > a > img {
		width: 32px;
		height: 32px;
		margin-right: 16px;
	}

	.purchase-form .currency-dropdown-btn {
		width: 100px;
		position: absolute;
		right: 0;
		top: 10px;
		display: flex;
		align-items: center;
		padding: 6px 10px;
		border-left: 1px solid #43454B;
	}

	.purchase-form .currency-dropdown-btn > .currency-info {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.purchase-form .currency-dropdown-btn > .currency-info > .name {
		margin-bottom: 5px;
		color: #b4b4b4;
		font-size: 13px;
		line-height: 12px;
	}

	.purchase-form .currency-dropdown-btn > .currency-info > .tag {
		color: #fff;
		font-size: 21px;
		font-weight: bold;
		line-height: 13px;
	}

	.purchase-form .currency-dropdown-btn > i {
		color: #fff;
		margin-left: auto;
		padding-right: 3px;
	}

	.purchase-form .currency-conversion {
		width: 80px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: absolute;
		right: 0;
		top: 10px;
		padding: 6px 10px;
		border-left: none;
	}

	.purchase-form .currency-conversion > .name {
		margin-bottom: 5px;
		color: #b4b4b4;
		font-size: 13px;
		line-height: 12px;
	}

	.purchase-form .currency-conversion > .tag {
		color: #fff;
		font-size: 21px;
		font-weight: bold;
		line-height: 13px;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		width: 480px;
		margin-left: 110px;
		color: #fff;
	}

	.hero-text .hero-title {
		font-size: 52px;
		font-weight: bold;
		line-height: 52px;
		margin-bottom: 40px;
	}

	.hero-text .hero-paragraph {
		font-size: 17px;
		line-height: 17px;
	}

	.hero-text .crypto-list {
		display: flex;
		margin-top: 20px;
	}

	.hero-text .crypto-list > li {
		margin-right: 6px;
	}

	.hero-text .crypto-list > li > img {
		width: 32px;
		height: 32px;
	}

	@media screen and (max-width: 800px) {
		.hero-text .hero-title {
			display: block;
			text-align: center;
			margin-bottom: 0;
		}

		.hero-text .hero-paragraph {
			display: block;
			text-align: center;
		}

		.hero-text .crypto-list {
			align-items: center;
			justify-content: center;
			margin-bottom: 50px;
		}
	}
</style>

<script>
	export default {
	    layout: 'dark',
	    head() {
	        return {
	            title: 'Pay Using Crypto'
			}
		},
	    data() {
            return {
                error: null,
				updating: false,
				updated: false,
				confirming: false,
				currencies: [
					{
					    name: "Bitcoin",
						tag: "BTC",
						icon: require("~/assets/images/bitcoin.png"),
					},
					{
					    name: "Ethereum",
						tag: "ETH",
						icon: require("~/assets/images/ethereum.png"),
					},
					{
					    name: "Ripple",
						tag: "XRP",
						icon: require("~/assets/images/ripple.png"),
					},
					{
					    name: "Monero",
						tag: "XMR",
						icon: require("~/assets/images/monero.png"),
					},
					{
					    name: "Binance",
						tag: "BNB",
						icon: require("~/assets/images/binance.png"),
					},
					{
					    name: "Litecoin",
						tag: "LTC",
						icon: require("~/assets/images/litecoin.png"),
					},
					// {
					//     name: "Stablecoin",
					// 	tag: "USDC",
					// 	icon: require("~/assets/images/usdc.webp"),
					// }
				],
                currencyName: "Bitcoin",
				currencyTag: "BTC",
				currencyIcon: require("~/assets/images/bitcoin.png"),
				currencyRate: null,
                youSendAmount: 0.00,
                youReceiveAmount: 0.00,
				buyerEmail: "",
            }
        },
		methods: {
	        async selectCurrency(currency) {
	            this.currencyName = currency.name;
	            this.currencyTag = currency.tag;
	            this.currencyIcon = currency.icon;

				if (this.$refs['currency-dropdown'] !== undefined) {
                    window.UIkit.dropdown(this.$refs['currency-dropdown']).hide();
                }

				this.updateExchangeRate();
			},
	        startPurchase() {
	            this.error = null;
	            this.updated = false;

	            if (isNaN(this.youSendAmount) || this.youSendAmount <= 0.00) {
	                this.error = 'You entered an invalid amount!';
	                return
				}

	            if (this.currencyRate <= 0.00) {
	                this.error = 'The exchange rate hasn\'t been updated!';
	                return
                }

	            const previousRate = this.currencyRate;

	            this.updateExchangeRate().then(() => {
	                if (previousRate !== this.currencyRate) {
						this.updated = true;
						return;
					}

					this.confirming = true;
				});
			},
			confirmPurchase() {
	            this.error = null;
	            this.updated = false;

	            if (isNaN(this.youSendAmount) || this.youSendAmount <= 0.00) {
	                this.error = 'You entered an invalid amount!';
	                return
				}

	            if (this.currencyRate <= 0.00) {
	                this.error = 'The exchange rate hasn\'t been updated!';
	                return
                }

	            const previousRate = this.currencyRate;

	            this.updateExchangeRate().then(() => {
                    if (previousRate !== this.currencyRate) {
                        this.updated = true;
                        return;
                    }

                    this.updating = true;

                    this.$axios
                        .post('/store/tx/create', {
                            'currency': this.currencyTag,
                            'amount': this.youSendAmount,
                            'exchange_rate': this.currencyRate,
                            'buyer_email': this.buyerEmail,
                        })
                        .then(response => {
                            if (response.status === 200) {
                                this.$router.push({name: 'store-crypto-transaction-id', params: {'id': response.data['id']}})
                            } else {
                                throw 'Unexpected response status';
							}
                        })
                        .catch(error => {
                            if (error.response) {
								if (error.response.data === 'EXCHANGE_RATE_MISMATCH') {
									this.updated = true;
									return
								}

								this.error = error.response.data;
							}

                            this.updating = false;
                        });
                });
			},
			async updateSendAmount() {
	            return await this.updateExchangeRate().then(() => {
	                this.youReceiveAmount = Math.round(((this.youSendAmount / this.currencyRate) + Number.EPSILON) * 100) / 100;
				});
			},
			async updateReceiveAmount() {
	            return await this.updateExchangeRate().then(() => {
	                this.youSendAmount = this.youReceiveAmount * this.currencyRate;
				});
			},
			async updateExchangeRate() {
	            this.updating = true;

	            return await this.$axios.get('/store/exchange-rate?currency=' + this.currencyTag)
					.then(response => {
						if (response.status === 200) {
							this.currencyRate = response.data['rate'];
						}

						this.updating = false;
					})
					.catch(error => {
					    this.error = 'Failed to update exchange rate';
						this.updating = false;
					});
			},
			goBack() {
	            this.error = null;
	            this.updated = false;
	            this.confirming = false;
			}
		},
		computed: {
	        getSupportedCurrenciesNum: function() {
	            return this.currencies.length;
			}
		},
		async mounted() {
	        this.updateExchangeRate();
        }
    }
</script>
