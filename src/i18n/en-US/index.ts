// This is just an example,
// so you can safely delete all default props below

export default {
  menuList: {
    Dashboard: 'DASHBOARD',
    Wallet: 'WALLET',
    Account: 'ACCOUNT',
    Logout: 'LOGOUT',
    Affiliates: 'AFFILIATES'
  },

  drawer: {
    Dashboard: 'DASHBOARD',
    Wallet: 'WALLET',
    Account: 'ACCOUNT',
    Logout: 'LOGOUT',
    Affiliates: 'AFFILIATES'
  },

  notify: {
    Logout: {
      Fail: 'Fail to logout: ',
      Success: 'Logout successfully!',
      Waiting: 'Please wait to logout...'
    }
  },

  header: {
    Home: 'Home',
    Blog: 'Blog',
    Support: 'Support & FAQ',
    Contact: 'Contact',
    Register: 'Register',
    Login: 'Sign In'
  },

  footer: {
    First: {
      Title: 'Shoot for the stars with Procyon!',
      Content: 'YOUR GLOBAL CONSTELLATION OF CRYPTOCURRENCIES'
    },
    Second: {
      Title: 'Links',
      Home: 'Home',
      Products: 'Products',
      Blog: 'Blog'
    },
    Third: {
      Title: 'Help',
      Faqs: 'FAQ',
      Support: 'Support',
      Legal: 'Legal'
    },
    Forth: {
      Title: 'LANGUAGE',
      En: 'EN',
      Jp: '日本語'
    }
  },

  faq: {
    A: 'Support',
    B: 'FAQ',
    C: 'If you do not see your question below, please ',
    Contact: 'send us an email',
    ContactComma: '. ',
    Contactt: 'Or connect with Procyon on LINE',
    Header1: {
      Title: 'THE PROCYON PLATFORM',
      Q6: 'What is the "Technical Service Fee?"',
      A6: 'The technical service fee covers the maintenance and operation costs of your mining machine, and is deducted from your daily mining rewards.',
      Q7: 'Does Procyon have a mobile app?',
      A7: 'We plan to launch an official mobile app for our platform in the future, but will first launch on our browser-based website.'
    },

    Header2: {
      Title: 'PLATFORM FUNCTIONS AND TROUBLESHOOTING',
      Q1: 'Does the platform include some sort of wallet function as well? Do I need to open an account?',
      A1: 'Yes. All of your mining rewards will be deposited directly into your Procyon dashboard, which is unique to you and automatically created when you register an account on our platform.',
      A11: '',
      Q2: 'How do I sell my mining rewards or convert them into other currencies?',
      A2: "Mining rewards will be distributed to your Procyon account's wallet, which you can then transfer to the wallet of the cryptocurrency exchange of your choice and freely trade or sell them however you wish.",
      Q3: 'What happens if I have a Google Authenticator linked to my account, but I lose my phone?',
      A3: 'We strongly recommend all users to save their Google backup codes in a safe location offline (such as on a piece of paper) so that the account can be recovered in the event that their phone is lost or stolen. If you cannot access your Google Authenticator, please email us at',
      A4: 'and we will help you through the process of unbinding your Google Authenticator from your account.'
    },

    Header3: {
      Title: 'PAYMENTS, CONTRACTS, AND RECEIPTS',
      Q1: 'When does my contract period officially begin? From the date I signed it?',
      A1: 'Your contract period begins from the date your machine begins mining.',
      Q2: 'My contract and receipt show the payment amount in USDT, but I paid with BTC. Why is this?',
      A2: "Due to the daily price fluctuation of BTC and other cryptocurrencies, our sales partners convert payments to USDT (also known as Tether) — a stablecoin whose price is fixed to the US Dollar and does not fluctuate. This is to maintain stability and accuracy for our customers' payments. For any specific inquiries about your payment amount, please contact us at ",
      A22: '.',
      Q3: 'I see the term "TiB" written in my contract, but I don\'t quite understand what that means.',
      A3: 'TiB stands for Terabyte, a unit used to measure computer hard disk storage space. For cryptocurrencies mined via hard disk space, such as Spacemesh, the storage power (also known as hash power for non-storaged based cryptocurrency mining) is measured in units of TiB.'
    },

    Header4: {
      Title: 'SPACEMESH & SPACEMESH MINING',
      Q1: 'What is Spacemesh?',
      A1: 'Spacemesh is an open-source programmable cryptocurrency platform powered by a novel proof-of-space-time (PoST) consensus protocol. Spacemesh does not use proof-of-stake (PoS) or proof-of-work (PoW) protocols, thus it avoids some of their inherent issues, such as massive energy waste and centralization of mining power.',
      A2: 'Spacemesh is designed to achieve three main objectives:',
      A3: 'Create and maintain the ledger for the Spacemesh coin (SMH). Spacemesh is a fair cryptocurrency and a global means of payment.',
      A4: 'Ensure fair, wide distribution of SMH.',
      A5: 'Establish a global programmable infrastructure for tokenized apps, communities and economies.',
      Q2: 'Who is building Spacemesh?',
      A6: 'Spacemesh was created by a top-class team of leaders and developers with decades of experience in startups, blockchain, and venture captial investing.The co-founders, Tomer Afek and Aviv Eyal, have founded numerous startup ventures which went on to be acquired by the likes of Sony and Taboola.',
      Q3: 'Who is backing Spacemesh?',
      A7: 'In September 2018, Spacemesh concluded a massive $18.5 million investment round led by Polychain Capital, with another round raising $4 million, bringing the total fundraising amount to over $22.5 million.',
      A8: 'Other notable Spacemesh backer, Paradigm capital, has previously invested in hugely successful startups and large organizations, such as Uniswap, Coinbase, and Amber Group (leading crypto asset management firm).',
      A9: 'Since 2012, Coinbase Ventures, a VC arm under Coinbase, and as of March 2021 is considered the largest exchange in the U.S by trading volume and 3rd largest worldwide.',
      A10: 'Furthermore, in an unprecedented announcement on June 12th, 2020, Japanese mobile game and venture capital giant gumi Inc., through its blockchain-focused subsidiary gumi Cryptos Capital, unveiled their partnership with Spacemesh’s parent company, Unruly Technologies Ltd., to assist with market entry in Japan.',
      Q4: 'When will the Spacemesh network officially launch?',
      A111: 'The Spacemesh mainnet launch (the start of mining) will depend on the testnet.',
      A112: 'The last version of the testnet will go directly to the mainnet.',
      A113: 'Until then, constant testing is needed to make sure that the Spacemesh network is bug-free, secure, and reliable before it officially launches.',
      A114: 'If a bug in the system occurs, the testnet version will be updated again and testing will start again.',
      A115: 'For example, if a bug occurs in an application, the developer will investigate the cause, fix the bug, and upgrade the version.',
      A116: 'The user will then have to download the latest version.',
      A117: 'Spacemesh\'s testnet follows a very similar process. Due to this, no one can give an exact date of when the mainnet will launch, not even Spacemesh official. The answer to the question "When will the mainnet launch?" is that it depends on the network conditions of the testnet.',
      A118: 'This process is the same for all mining; the mainnet can start only after going through such rigorous testing and updating.',
      A119: 'As for the schedule, at the moment we can only give you an approximate answer of late January to late April, but please understand in advance that it may vary due to the reasons outlined above.',
      A120: 'As for mining rewards, once the mainnet starts and mining begins, rewards will be distributed the next day.',
      A121: 'Additionally, the listing of SMH on exchanges is expected to occur within a week or two of the mainnet launch.',
      A122: 'Once it is listed on exchanges, you can send the SMH that you have mined to the listed exchange of your choice to secure profits.',
      Q5: 'When will I start receiving Spacemesh mining rewards?',
      A12: 'If you purchased TB from the exclusive first mining batch, you will begin receiving rewards the day the Spacemesh main network launches.',
      Q6: 'On which exchanges will Spacemesh be listed?',
      A13: 'SMH is likely to be on Coinbase as Coinbase directly invested in the project. It is also might be listed on large exchanges such as Huobi and OKEx, and will possibily be listed on Binance as well.'
    },

    Header5: {
      Title: 'MINING & GENERAL CRYPTOCURRENCY INFORMATION',
      Q1: 'What is mining?',
      A1: '\'Mining\' is the term used to describe how cryptocurrencies are produced. In order to "mine" a cryptocurrency, computers must solve complex mathematicl equations and if successful, the operators of the computers (also known as mining machines) are given cryptocurrency as a reward.',
      A2: 'Much like mining for gold, it takes effort to procure (in the case of cryptocurrencies, computing power or hard disk space), there is a finite supply, and the more that is mined, or the more people attempt to mine it at the same time, the more difficult it is to mine more (this is known as Mining Difficulty, explained below).',
      Q2: 'What is a mining pool?',
      A3: "A 'mining pool' is a large-scale cryptocurrency mining operation that combines a large number of mining machines together to increase their probability of finding a 'block' on the blockchain and thus gaining cryptocurrencies as a reward.",
      Q3: 'What is a Block?',
      A4: 'A block is like a page in a bank transaction ledger, which records all past and present transactions on a blockchain and can not be changed. Computers around the world are constantly recording these transactions, and when a block is completed, rewards are given out as an incentive for miners to continue validating the blockchain.',
      A5: 'The more computing power you have, the greater your chances of gaining block rewards become.',
      Q4: 'What is Mining Difficulty?',
      A6: 'Mining Difficulty refers to the rate at which cryptocurrencies can be mined. Much like mining for gold in the real world, the more miners, the greater the total network-wide hash power, the higher the mining difficulty, and the lower the mining output per miner. The total mineable supply is fixed, so the more hash power that flows into mining, the less mining output is released per unit (TB) of hash power. The mining output of the first-batch mining is usually much greater in comparison to regular mining as a result.',
      Q5: 'What is a cryptocurrency wallet? What is a cold wallet? What is the difference?',
      A7: "A cryptocurrency 'wallet' is where your digital currencies are kept, much in the same way you keep fiat currency cash in your wallet in your pocket. Normal online wallets, known as 'hot' wallets, store your cryptocurrencies online. 'Cold' wallets, or hardware wallets, are physical devices that store your cryptocurrencies offline. Though more secure than online 'hot' wallets, if a 'cold' wallet is damaged or lost, the digital assets inside are lost forever.",
      Q6: 'What is a test net? Why is it important before launch?',
      A8: 'A test net is the early "beta" version of a blockchain project\'s software. This test net is often run by a small group of dedicatd users who provide technical feedback to the main project. The test net of any new blockchain project is important because it ensures stability, secruity, and performance before the launch of the main net. Projects will launch their main nets when the test net passes certain standards of quality. '
    }
  }
}
