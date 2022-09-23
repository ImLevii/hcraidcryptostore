<template>
	<div class="uk-container uk-margin">
		<div class="hero">
			<div class="transaction uk-animation-fade">
				<span class="form-title" style="text-align: left">Your Transaction</span>
				<span class="form-subtitle" style="text-align: left">#{{ transaction['id'] }}</span>

				<div class="uk-grid uk-margin">
					<div class="uk-width-1-2@m">
						<div class="transaction-details">
							<span class="field-label">You send</span>
							<span class="tx-amount">{{ transaction['crypto_amount'] }} {{ transaction['currency'] }}</span>
							<span class="cx-details">{{ getCurrencyName }}</span>
						</div>
					</div>
					<div class="uk-width-1-2@m">
						<div class="transaction-details">
							<span class="field-label">You receive</span>
							<span class="tx-amount">{{ getReceiveAmount }} USD</span>
							<span class="cx-details">Store Credit</span>
						</div>
					</div>
				</div>

				<hr/>

				<div class="transaction-details">
					<span class="field-label">Exchange rate</span>
					<span class="exchange-rate">{{ transaction['exchange_rate'] }} {{ transaction['currency'] }} = 1 USD</span>
				</div>

				<hr/>

				<div class="uk-grid">
					<div class="uk-width-1-2@m">
						<div class="transaction-details">
							<span class="field-label">Received funds</span>
							<span class="tx-amount" v-if="isAwaitingFunds">Awaiting funds...</span>
							<DateDisplay :timestamp="transaction['last_updated']" class="tx-amount" v-else/>
						</div>
					</div>
					<div class="uk-width-1-2@m">
						<div class="transaction-details" v-if="isAwaitingConfirmations || isPaymentComplete">
							<span class="field-label">Confirmations</span>
							<span class="tx-amount" v-if="isAwaitingConfirmations">{{ transaction['confirmations_needed'] }} remaining...</span>
							<span class="tx-amount" v-else>Payment confirmed</span>
						</div>
					</div>
				</div>

				<template v-if="isAwaitingFunds">
					<div class="payment-instructions uk-margin">
						<div class="transaction-details">
							<span class="field-label">You send</span>
							<span class="tx-amount">{{ transaction['crypto_amount'] }} {{ transaction['currency'] }}</span>
						</div>

						<div class="transaction-details uk-margin-s" style="position: relative">
							<span class="field-label">To payment address</span>

							<button type="button" class="payment-address">
								<i class="fas fa-copy"></i>
								{{ transaction['receiving_address'] }}
							</button>
						</div>

						<img class="qr-code uk-margin" :src="transaction['qr_code_url']" alt="Scan QR Code to Pay"/>

						<p class="important-notice uk-margin">Please send the exact amount from your wallet or exchange account to the payment address.</p>
					</div>
				</template>

				<template v-if="isPaymentComplete">
					<hr/>

					<div class="transaction-details">
						<span class="field-label">Your store credit</span>

						<span class="gift-card uk-margin-s" v-if="this.showingGiftCard">{{ transaction['gift_card'] || 'UNKNOWN' }}</span>

						<button type="button" class="flat-button uk-btn-green alt uk-margin-s" @click="toggleGiftCard()" v-if="!this.showingGiftCard">Show Gift Card</button>
						<button type="button" class="flat-button uk-btn-grey uk-margin-s" @click="toggleGiftCard()" v-else>Hide Gift Card</button>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.hero {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 0;
	}

	.transaction .transaction-details {
		display: flex;
		flex-direction: column;
	}

	.transaction .transaction-details .field-label {
		color: #b4b4b4;
		font-size: 14px;
		line-height: 14px;
	}

	.transaction .transaction-details .tx-amount {
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		line-height: 18px;
		margin: 6px 0;
	}

	.transaction .transaction-details .cx-details {
		color: #69cf54;
		font-size: 14px;
		line-height: 14px;
		text-transform: lowercase;
	}

	.transaction .transaction-details .payment-address {
		color: #69cf54;
		font-size: 14px;
		line-height: 17px;
		text-transform: lowercase;
		text-align: left;
		margin: 3px 0;
	}

	.transaction .transaction-details .payment-address i {
		font-size: 12px;
	}

	.transaction .transaction-details .exchange-rate {
		color: #69cf54;
		font-weight: bold;
	}

	.transaction .transaction-details .gift-card {
		padding: 14px;
		background: #292B35;
		border: none;
		border-radius: 3px;
		color: #fff;
		font-family: 'Rajdhani', sans-serif;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}

	.transaction .payment-instructions .qr-code {
		width: 150px;
		height: 150px;
		margin: 10px auto 0 auto;
	}

	.transaction hr {
		border-top-color: #43454b;
	}

	.transaction .back-button {
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

	.transaction .back-button i {
		font-size: 13px;
		margin-right: 4px;
	}

	.transaction {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 460px;
		padding: 30px 40px;
		background: #1C1E27;
		box-shadow: 20px 20px 60px #222a32;
		border-bottom: 3px solid #1A1D22;
		border-radius: 6px;
		box-sizing: border-box;
	}

	.transaction .form-title,
	.transaction .form-subtitle {
		color: #FFF;
		font-family: 'Rajdhani', sans-serif;
	}

	.transaction .form-title {
		font-size: 24px;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		line-height: 24px;
	}

	.transaction .form-subtitle {
		font-size: 14px;
		text-transform: uppercase;
		text-align: center;
		line-height: 14px;
	}

	.transaction .uk-form-group {
		position: relative;
	}

	.transaction .uk-form-group .uk-input {
		padding: 40px 14px 20px 14px;
		font-size: 21px;
		font-weight: bold;
		line-height: 16px;
	}

	.transaction .uk-input {
		padding: 20px 14px;
		background: #292B35;
		border: none;
		border-radius: 3px;
		color: #fff;
		font-size: 16px;
		line-height: 13px;
	}

	.transaction .uk-input::-webkit-outer-spin-button,
	.transaction .uk-input::-webkit-inner-spin-button {
		display: none;
	}

	.transaction .uk-input-label {
		position: absolute;
		top: 10px;
		padding: 0 14px;
		font-size: 13px;
		color: #b4b4b4;
	}

	.transaction .currency-conversion {
		width: 80px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: absolute;
		right: 0;
		top: 10px;
		padding: 6px 10px;
		border-left: 1px solid #43454B;
	}

	.transaction .currency-conversion > .name {
		margin-bottom: 5px;
		color: #b4b4b4;
		font-size: 13px;
		line-height: 12px;
	}

	.transaction .currency-conversion > .tag {
		color: #fff;
		font-size: 21px;
		font-weight: bold;
		line-height: 13px;
	}

	.transaction .payment-instructions {
		display: flex;
		flex-direction: column;
		padding: 14px;
		background: #292B35;
		border: none;
		border-radius: 3px;
	}

	.transaction .payment-instructions .important-notice {
		font-size: 12px;
		line-height: 13px;
		color: #b4b4b4;
	}

	@media screen and (max-width: 768px) {

	}
</style>

<script>
	export default {
	    layout: 'dark',
		async asyncData({$axios, route, error}) {
	        const txId = route.params.id;

	        return await $axios.get('/store/tx/info?tx_id=' + txId)
				.then(response => {
				    if (response.status === 200) {
				        return {
				            transaction: response.data
						}
					} else {
						throw 'Unexpected response status';
					}
				})
				.catch(thrown => {
				    if (thrown.response) {
				        if (thrown.response.statusCode === 404) {
	            			error({ statusCode: 404, message: 'Couldn\'t find that transaction' });
						} else {
				            error({ statusCode: thrown.response.statusCode, message: thrown.response.data })
						}
					}
				});
		},
		head() {
	        return {
	            title: 'Your Transaction'
			}
		},
		data() {
	        return {
	            showingGiftCard: false,
	            updatingTask: null,
			}
		},
		mounted() {
	        let ins = this;
	        this.updatingTask = setInterval(function() {
	            if (ins.transaction['tx_status'] === 'PAYMENT_COMPLETE') {
	                clearInterval(ins.updatingTask);
	                ins.updatingTask = null;
	                return;
				}

	            ins.fetchTransactionInfo();
			}, 25000);
        },
		beforeDestroy() {
            this.destroyed = true;

            if (this.updatingTask != null) {
                clearInterval(this.updatingTask);
            }
        },
        methods: {
	        async fetchTransactionInfo() {
	            return await this.$axios.get('/store/tx/info?tx_id=' + this.transaction['id'])
					.then(response => {
						if (response.status === 200) {
							this.transaction = response.data;
						} else {
							throw 'Unexpected response status';
						}
					})
					.catch(thrown => {
						if (thrown.response) {
							if (thrown.response.statusCode === 404) {
								error({ statusCode: 404, message: 'Couldn\'t find that transaction' });
							} else {
								error({ statusCode: thrown.response.statusCode, message: thrown.response.data })
							}
						}
					});
			},
	        toggleGiftCard() {
	            this.showingGiftCard = !this.showingGiftCard;
			},
		},
		computed: {
	        getCurrencyName: function() {
	            switch (this.transaction['currency']) {
	                case 'BTC':
	                    return 'Bitcoin';
	                case 'ETH':
	                    return 'Ethereum';
	                case 'XRP':
	                    return 'Ripple';
	                case 'XMR':
	                    return 'Monero';
	                case 'BNB':
	                    return 'Binance';
	                case 'LTC':
	                    return 'Litecoin';
	                case 'USDC':
	                    return 'Stablecoin';
				}
			},
	        getReceiveAmount: function() {
	            return Math.round(((this.transaction['crypto_amount'] / this.transaction['exchange_rate']) + Number.EPSILON) * 100) / 100;
			},
			isAwaitingFunds: function() {
	            return this.transaction['tx_status'] === 'AWAITING_PAYMENT';
			},
			isAwaitingConfirmations: function() {
	            return this.transaction['tx_status'] === 'AWAITING_CONFIRMATIONS';
			},
			isPaymentComplete: function() {
	            return this.transaction['tx_status'] === 'PAYMENT_COMPLETE';
			},
		}
	}
</script>
