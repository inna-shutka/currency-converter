'use strict'

const API =
'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah';

export async function getCurrencyRate() {
  try {
    const response = await fetch(API, {
      next: {
        revalidate: 60,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    const bitcoinPrice = data.bitcoin.uah;
    return bitcoinPrice;
  } catch (error) {
    console.error(error);
  }
}
