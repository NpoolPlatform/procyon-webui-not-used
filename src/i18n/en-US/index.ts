// This is just an example,
// so you can safely delete all default props below

export default {
  menuList: {
    Dashboard: 'DASHBOARD',
    Wallet: 'WALLET',
    Account: 'ACCOUNT',
    Logout: 'LOGOUT',
    Affiliates: 'AFFILIATES',
    Security: 'SECURITY'
  },

  drawer: {
    Dashboard: 'DASHBOARD',
    Wallet: 'WALLET',
    Account: 'ACCOUNT',
    Logout: 'LOGOUT',
    Affiliates: 'AFFILIATES',
    Security: 'SECURITY',
    KYC: 'KYC'
  },

  notice: {
    Title: 'Notice',
    Content: 'Thank you for visiting Procyon!',
    P1: ' Our site is currently optimized for desktop browser viewing.',
    P2: 'However, please feel free to use Procyon on your phone or desktop browser.'
  },

  verificationCode: {
    Hint: {
      Words1: 'Send verification code to',
      Words2: ''
    }
  },

  notify: {
    Logout: {
      Load: 'Please wait to logout...',
      Success: 'Logout successfully!',
      Fail: 'Fail to logout: '
    },
    Login: {
      Load: 'Check your login input now, please wait...',
      Success: 'Login successfully!',
      Fail: 'Fail to login'
    },
    SendEmail: {
      Load: 'Sending email, please wait...',
      Success: {
        Words1: 'A verification code has been sent to ',
        Words2: '',
        Check: 'please check your email'
      },
      Fail: 'Fail to send code to your email'
    },
    SendPhone: {
      Load: 'Sending phone message, please wait...',
      Success: {
        Words1: 'A verification code has been sent to ',
        Words2: '',
        Check: 'please check your phone messages'
      },
      Fail: 'Fail to send code to your phone'
    },
    VerifyWithUserID: {
      Load: 'Please wait for verify...',
      Success: 'Verify code successfully',
      Fail: 'Input Code Error'
    },
    VerifyGoogleAuthentication: {
      Load: 'Please wait for verify...',
      Success: 'Successful to verify google authentication',
      Fail: 'Fail to verify google authentication'
    },
    Signup: {
      Load: 'Please wait',
      Success: 'Successfully register!',
      Fail: 'Fail to register'
    },
    Forget: {
      Load: 'Please wait',
      Success: 'Set new password successfully',
      Fail: 'Fail to set new password'
    },
    GetPromotionGoods: {
      Success: 'Get promotion goods successfully',
      Fail: 'Fail to get promotion goods'
    },
    GetDirectAffiliate: {
      Success: 'Get affiliate list successfully',
      Fail: 'Fail to get affiliate list'
    },
    GetUserOrders: {
      Fail: 'Fail to get user order history'
    },
    Update: {
      Success: 'Successful to update personal details',
      Fail: 'Saving user details',
      Load: 'Fail to update user info'
    },
    GetUserDetail: {
      Fail: 'Fail to get user detail'
    },
    GetUserInvitationCode: {
      Fail: 'Fail to get user invitation code'
    },
    EnableEmail: {
      Success: 'Successful to enable email address',
      Fail: 'Fail to enable email address',
      Load: ''
    },
    EnablePhone: {
      Success: 'Successful to enable phone number',
      Fail: 'Fail to enable phone number',
      Load: ''
    },
    UpdateEmail: {
      Success: 'Successful to update user email address',
      Fail: 'Fail to update email address',
      Load: ''
    },
    UpdatePhone: {
      Success: 'Successful to update user phone',
      Fail: 'Fail to update phone number',
      Load: ''
    },
    UpdateGoogleStatus: {
      Success: 'Successful to set user google verify',
      Fail: 'Fail to set user google verify',
      Load: ''
    },
    SetLoginVerify: {
      Success: 'Submit user login verify method successfully',
      Fail: 'Fail to submit user login verify',
      Load: ''
    },
    ChangePassword: {
      Success: 'Your password has been reset',
      Fail: 'Fail to change password',
      Load: ''
    },
    GetUserLoginHistory: {
      Fail: 'Fail to get user login histories'
    },
    GetQRCodeURL: {
      Fail: 'Fail to get user Google Authenticator QR code'
    },
    SendUserSiteContactEmail: {
      Success: 'Send contact email successfully! Please wait for our reply.',
      Fail: 'Fail to send contact email'
    }
  },

  NoData: 'No data available',

  account: {
    Title: 'Account',
    Account: {
      PersonDetail: {
        Title: 'Personal Details (for KYC process)',
        Username: 'Username',
        Gender: 'Gender',
        FirstName: 'First Name',
        LastName: 'Last Name'
      },
      Address: {
        Title: 'Address',
        StreetAddress1: 'Street Address 1',
        StreetAddress2: 'Street Address 2',
        City: 'City',
        Province: 'Province / Prefecture',
        Country: 'Country',
        PostalCode: 'Postal Code'
      }
    },
    InvitationCode: {
      Title: 'Invitation Code'
    },
    Setting: {
      Title: 'Security Settings',
      Verify: 'Verified',
      NotVerify: 'Not verified',
      ChangePassword: {
        Title: 'Change Password',
        ChangePasswordContent: 'Your password must be at least 8 characters in length and must include numbers and letters.',
        Button: 'Change Password'
      },
      Email: {
        Title: 'E-mail Address',
        EmailContent: 'Make sure your e-mail address is up to date.',
        EnableButton: 'Enable Email Address',
        UpdateButton: 'Update Email Address'
      },
      Phone: {
        Title: 'Mobile Authentication',
        PhoneContent: 'Enable mobile authentication to confirm logins, transfers, and changes to security settings.',
        EnableButton: 'Register Phone Number',
        UpdateButton: 'Update Phone Number'
      },
      Google: {
        Title: 'Google Authenticator',
        GoogleContent: 'Two-factor Authentication (2FA) secures your account by adding a second security check when logging in and making transfers.',
        Button: 'Enable Two-factor Auth',
        VerifyContent: 'Please enter your verification code in your google authenticator.',
        HasDone: 'Google authentication has been completed.'
      },
      KYC: {
        Title: 'ID Verification',
        KYCContent: 'Upload a photo ID to verify your identity.',
        Button: 'Verify ID'
      },
      LoginVerify: {
        Title: 'Login Verification',
        Content: 'Select an additional verification method when logging in. Two-factor authentication must be enabled prior to selecting as a login verification method.',
        GALogin: 'Google Login Authentication',
        EmailLogin: 'E-mail Login Verification',
        Button: 'Submit Change'
      }
    },
    History: {
      Title: 'RECENT LOGIN HISTORY',
      Date: 'Date',
      IP: 'IP Address',
      Location: 'Location',
      Private: 'Private Location'
    }
  },

  select: {
    Gender: {
      Male: 'Male',
      Female: 'Female',
      Other: 'Other'
    }
  },

  GoogleAuthentication: {
    Title1: 'Google Authenticate',
    Content1:
      'Please can the QR code above through the Google Authenticator app on your smartphone.',
    Content2:
      'After scanning and connecting the app to your Procyon account, click the "next step" button below on this page to enter the verification code shown in your Google Authenticator app to finish verifying your Google Authenticator app.',
    Content3:
      'If you are unable to scan the QR code above on your Google Authenticator app, please follow the steps below:',
    L1: '1. Open your Google Authenticator app on your smartphone',
    L2: '2. Choose "Enter a setup key" at the bottom right of the screen ',
    L3: '3. Set the "Account Name" as, for example, [Procyon: example{\'@\'}gmail.com]',
    L4: '4. Copy the Google Secret above and click "Add."',
    NextStepBtn: 'Next Step',
    CloseBtn: 'Close',
    Hint: 'If you fail to scan the QR code above, please enter your "Authenticator" app and choose "Enter a setup key" at the right bottom and then set your "Account name" like "(Procyon:example{\'@\'}example.com)" and copy the google secret above and click "Add"'
  },

  header: {
    Home: 'Home',
    Blog: 'Blog',
    Support: 'Support & FAQ',
    Contact: 'Contact'
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

  button: {
    Register: 'Register',
    Login: 'Sign In',
    StartMining: 'Purchase',
    SendCode: 'Send Code',
    Verify: 'Verify',
    Confirm: 'Confirm',
    Cancel: 'Cancel',
    Export: 'Export History (CSV)',
    Purchase: 'Purchase Capacity',
    Save: 'Save Changes',
    SendMessage: 'Send Message'
  },

  input: {
    Password: 'Password',
    PhoneNumber: 'Phone Number',
    ConfirmPassword: 'Confirm Password',
    EmailAddress: 'Email Address',
    OldEmailAddress: 'Old Email',
    OldPhoneNumber: 'Old Phone Number',
    OldEmailWarning: 'Please enter a different email address',
    OldPhoneWarning: 'Please enter a different phone number',
    VerifyCode: 'Verification Code',
    PasswordWarning: 'Please enter a password 8-20 alphanumeric characters',
    ConfirmPasswordWarning: 'Password and confirm password not equal',
    OldPassword: 'Old Password',
    OldPasswordWarning: 'Please enter your old password',
    PhoneNumberWarning: 'Please enter your correct phone number',
    EmailAddressWarning: 'Please enter your correct email address',
    VerifyCodeWarning: 'Please enter a verification code',
    InvitationCode: 'Invitation Code',
    InvitationCodeWarning: 'Invitation code is required',
    CheckWarning: 'Please choose agree and then click "Register"',
    UsernameWarning: 'User name needs to be between 4 and 32 characters and cannot be a pure number, cannot contain spaces',
    Login: {
      Username: 'Username / Email',
      UsernameWarning: 'Please enter a legal username or email address'
    },
    Name: 'Name',
    NameWarning: 'Please enter your name',
    Subject: 'Subject',
    SubjectWarning: 'Please enter your contact subject',
    Message: 'Message',
    MessageWarning: 'Please enter your contact message content'
  },

  dialog: {
    EmailVerify: {
      Title: 'Email Verification',
      Content1: 'An E-mail just sent to ',
      Content3: 'Please enter the verification code we sent to your email.'
    },
    GoogleVerify: {
      Title: 'Google Verification Code',
      Content: 'You have choose to verify login by google authenticate. Please enter your verification code in your google authenticator.'
    }
  },

  box: {
    PhoneLink: 'Use Phone Number',
    EmailLink: 'Use Email Address'
  },

  login: {
    Title: 'User Login',
    Forget: 'Forgot password?',
    NoAccount: 'No account? ',
    Register: 'Register now.',
    GoogleVerifyContent: 'You have choose to verify login by google authenticate. Please enter your verification code in your google authenticator.'
  },

  forget: {
    Title: 'Reset Password'
  },

  register: {
    Title: 'User Register',
    Agree1: 'I have read and agree to the',
    Policy: ' Privacy Policy',
    And: ' and',
    User: ' User Agreements',
    Behind: '',
    Have: 'Already have an account? ',
    Click: 'Click here to sign in.'
  },

  changePassword: {
    Title: 'Change Password'
  },

  affiliate: {
    Title: 'Affiliate',
    ReferralCode: 'Referral Code',
    CopyCode: 'Copy Code',
    OnBoarded: 'ONBOARDED',
    Sales: 'Sales',
    Direct: {
      Title: 'DIRECT REFERRALS',
      Name: 'Name',
      Date: 'Date Joined',
      Purchased: 'TBs Purchased',
      Total: 'Total Payment',
      Referral: 'Referral Value'
    },
    Export: {
      Title: 'DATA EXPORT',
      Button: 'Export all data (CSV)'
    }
  },

  product: {
    DailyMiningRewardsLabel: 'Daily Mining Rewards:',
    DailyMiningRewardsValue: 'SMH / day',
    ServicePeriodLabel: 'Service Period:',
    ServicePeriodValue: 'days',
    TechnicalServiceFeeLabel: 'Technical Service Fee:',
    MaintenanceFeeLabel: 'Maintenance Fee:',
    MaintenanceFeeValue: 'day',
    OrderEffectiveLabel: 'Order Effective:'
  },

  contact: {
    Title: 'CONTACT PROCYON SUPPORT',
    Left: {
      Title: 'Contact Procyon via Email'
    },
    Right: {
      Title: 'Contact Procyon via LINE',
      Box1Content: {
        Word1: 'To scan the QR code below, open ',
        StrongWord1: 'LINE',
        Word2: ' on your phone and tap the ',
        StrongWord2: '\'Add Friends\'',
        Word3: ' icon. Then select ',
        StrongWord3: '\'QR code\'',
        Word4: ' at the top.'
      },
      Content: 'Feel free to contact us with questions about our platform, support issues, or just to say hi. We look forward to hearing from you!',
      Signature: '—Procyon Support Team'
    }
  },

  dashboard: {
    Day: 'days',
    Column1: {
      Title: 'Total Earnings',
      Total: 'Total Earnings',
      Yesterday: 'Yesterday\'s Earnings',
      Current: 'CURRENT BALANCE'
    },

    Column2: {
      Title: 'MINING DASHBOARD',
      Earning: 'Earnings: ',
      Capacity: 'Capacity: ',
      Last: 'Last 24 hours: ',
      DailyOutput: 'Daily Output (30 day avg.)',
      TechnicalServiceFee: 'Technical Service Fee:',
      NetDailyOutput: 'Net Daily Output (30 day avg.):',
      TotalDaysMining: 'Total Days Mining:',
      Hashrate: 'Hashrate (30 day avg.):',
      NetworkDailyOutput: 'Network Daily Ouput:',
      Export: 'Export Daily Output (CSV)',
      Purchase: 'Purchase Capacity'
    },

    Column3: {
      Title: 'ORDER HISTORY',
      Date: 'Date',
      Product: 'Product',
      Amount: 'Amount',
      Price: 'Price',
      Discount: 'Discount',
      Techfee: 'Tech Fee',
      Period: 'Mining Period',
      Total: 'Total'
    }
  },

  homepage: {
    Content1: {
      ContentItem1: {
        Title: 'SHOOT FOR THE STARS WITH PROCYON',
        Subtitle: 'Your global constellation of cryptocurrencies'
      },
      ContentItem2: {
        Title: 'PREMIERE MINING PRODUCTS'
      }
    },

    Why: {
      Title: 'WHY CHOOSE PROCYON?',
      Content1:
        'Procyon is the first Japan-centric, one-stop, multidimensional asset management marketplace. We bring',
      Content2: 'first-to-market products and IDOs ',
      Content3:
        'to our clients. Our unique market insights and our extensive network in the crypto space allows us to provide our clients with ',
      Content4:
        ' exclusive investment opportunities that cannot be found on the open market',
      Content4Comma: '. ',
      Content5: 'Our unique positioning is our strength and your gain!',
      Content55H: '',
      Content55: '',
      Content6:
        'Japan boasts the highest investment per capita in Asia. The endless possibilities of the',
      Content7: ' Japanese market attract many global players',
      Content8:
        ', however Japan suffers from a language and cultural barrier that insulates the country from global markets. This hurdle can result in missed opportunities and a lack of diversity in investment products. At Procyon, ',
      Content9:
        'we lead our exclusive communities of investors to the global stage',
      Content9Comma: '.'
    },

    Feature: {
      VCBacking: 'MARKET LEADER',
      VCBackingContent:
        'Our partners include top tier global VCs as well as the world\'s largest PoC mining pool. Through years of experience we have managed to accurately identify market trends, conduct in depth due diligence, and target upcoming superstar projects across multiple sectors in the industry that we bring to our exclusive community of key opinion leaders and investors.',
      TopTeam: 'DREAM TEAM',
      TopTeamContent:
        'Procyon\'s founders have over 10 years of cryptocurrency market experience with a track record that includes investment projects with average ROI of over 100x. Our tech team has over 5 years of experience managing assets totalling over 160 million USD. Our Japan-based team provides exceptional, localized, and reliable customer service within 24 hours.',
      Technology: 'THE BIG PICTURE',
      TechnologyContent:
        'The market flows from R&D to VC funds to Miners to Exchanges and is finally distributed to general investors. At Procyon we aim to find opportunities that are usually only available to institutional investors and make them equally accessible to individual investors. Join our exclusive community of wealth generation!'
    },

    What: {
      Title: 'What Is First-Batch Mining?',
      Content1:
        'First-batch mining begins as soon as the mainnet goes live. This is possible because the first-batch of miners has already acquired hash power through the testnet prior to the launch of the mainnet. Once mainnet goes live these miners are the first to begin the mining process, achieving ',
      Content2:
        ' much greater ROI while the mining difficulty is low and the mining output is high',
      Content2Comma: '.',
      Content22H: '',
      Content22: '',
      Content3: 'There are two core factors that affect a miner\'s ROI:',
      Content4: 'Mining output',
      Content5: 'Token price',
      Content6:
        'Mining output is directly related to the mining difficulty. The more miners, the greater the total network-wide hash power, the higher the mining difficulty, and the lower the mining output per miner. The total mineable supply is fixed, so the more hash power that flows into mining, the less mining output is released per unit (TB) of hash power.',
      Content7:
        'The output of first-batch mining is usually much greater in comparison to regular mining',
      Content7Comma: '. ',
      Content8:
        'You can think of it like sharing a pizza. The more people share, the smaller each slice gets. To use Chia mining as a case study, ',
      Content88:
        'the daily output during first-batch mining was equivalent to 1 year of mining at the rates just 2 months after mainnet launch',
      Content88Comma: '.',
      Content14: '',
      Content15: '',
      Content15Comma: '',
      Content16: '',
      Content9:
        'Token price is affected by dynamic market conditions. Typically the mainet launch happens simultaneously as ',
      Content10:
        ' listing on an exchange which is when the token experiences price discovery, possibly surging exponentially',
      Content10Comma: '. ',
      Content11:
        'To put it simply, the earlier you can mine, the more tokens you earn. And on top of that, you can sell your tokens at a higher price when the token is listed on exchanges, resulting in a better ROI.',
      Content12:
        'Participating in first-batch mining is only possible if you’re a professional miner or an experienced mining pool. Procyon is the premiere platform that aims to make first-batch mining accessible to general investors, delivering exceptional ROI.',
      Content13: 'Shoot for the stars with Procyon!'
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
      A2: 'Mining rewards will be distributed to your Procyon account\'s wallet, which you can then transfer to the wallet of the cryptocurrency exchange of your choice and freely trade or sell them however you wish.',
      Q3: 'What happens if I have a Google Authenticator linked to my account, but I lose my phone?',
      A3: 'We strongly recommend all users to save their Google backup codes in a safe location offline (such as on a piece of paper) so that the account can be recovered in the event that their phone is lost or stolen. If you cannot access your Google Authenticator, please email us at',
      A4: 'and we will help you through the process of unbinding your Google Authenticator from your account.'
    },

    Header3: {
      Title: 'PAYMENTS, CONTRACTS, AND RECEIPTS',
      Q1: 'When does my contract period officially begin? From the date I signed it?',
      A1: 'Your contract period begins from the date your machine begins mining.',
      Q2: 'My contract and receipt show the payment amount in USDT, but I paid with BTC. Why is this?',
      A2: 'Due to the daily price fluctuation of BTC and other cryptocurrencies, our sales partners convert payments to USDT (also known as Tether) — a stablecoin whose price is fixed to the US Dollar and does not fluctuate. This is to maintain stability and accuracy for our customers\' payments. For any specific inquiries about your payment amount, please contact us at ',
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
      A3: 'A \'mining pool\' is a large-scale cryptocurrency mining operation that combines a large number of mining machines together to increase their probability of finding a \'block\' on the blockchain and thus gaining cryptocurrencies as a reward.',
      Q3: 'What is a Block?',
      A4: 'A block is like a page in a bank transaction ledger, which records all past and present transactions on a blockchain and can not be changed. Computers around the world are constantly recording these transactions, and when a block is completed, rewards are given out as an incentive for miners to continue validating the blockchain.',
      A5: 'The more computing power you have, the greater your chances of gaining block rewards become.',
      Q4: 'What is Mining Difficulty?',
      A6: 'Mining Difficulty refers to the rate at which cryptocurrencies can be mined. Much like mining for gold in the real world, the more miners, the greater the total network-wide hash power, the higher the mining difficulty, and the lower the mining output per miner. The total mineable supply is fixed, so the more hash power that flows into mining, the less mining output is released per unit (TB) of hash power. The mining output of the first-batch mining is usually much greater in comparison to regular mining as a result.',
      Q5: 'What is a cryptocurrency wallet? What is a cold wallet? What is the difference?',
      A7: 'A cryptocurrency \'wallet\' is where your digital currencies are kept, much in the same way you keep fiat currency cash in your wallet in your pocket. Normal online wallets, known as \'hot\' wallets, store your cryptocurrencies online. \'Cold\' wallets, or hardware wallets, are physical devices that store your cryptocurrencies offline. Though more secure than online \'hot\' wallets, if a \'cold\' wallet is damaged or lost, the digital assets inside are lost forever.',
      Q6: 'What is a test net? Why is it important before launch?',
      A8: 'A test net is the early "beta" version of a blockchain project\'s software. This test net is often run by a small group of dedicatd users who provide technical feedback to the main project. The test net of any new blockchain project is important because it ensures stability, secruity, and performance before the launch of the main net. Projects will launch their main nets when the test net passes certain standards of quality. '
    }
  },

  legal: {
    Title1: 'Procyon — PRCN Technology',
    Title2: 'Terms and Conditions',
    P1: 'This website is created and maintained by our service provider on behalf of Procyon. Procyon reserves the right to update these Terms at any time without notice, and the user will be bound by such updates as well. By accessing and viewing this website content, registering as a user, downloading any materials from this website, or using the materials provided herein, any person agrees to abide by the following terms and conditions. These Terms constitute an agreement between Procyon and the user. If the user does not agree to abide by these terms, do not use this website. Procyon reserves the right to deny access to, or use of, this website to any user at any time and under any circumstances. Procyon reserves the right to correct, modify or update this statement at any time in its sole discretion.',
    H1: '1. Copyright Notice',
    P2: 'Procyon owns the copyright in all materials on the relevant pages of the Website or, together with the provider of the materials on the relevant pages of the Website, owns the copyright or license to use the materials on those pages. No part of the contents of this website may be copied or mirrored on servers not owned by Procyon without the expressed, written permission of Procyon.',
    P3: 'The domain names, trademarks, text, visual and audio content, graphics and images contained on this website are protected by trademark and copyright laws. They may not be copied or transmitted in any form by any enterprise or individual without the express prior written permission of Procyon. Any unauthorized use of this website will violate the Copyright Law of the Republic of Seychelles, the Trademark Law of the Republic of Seychelles and other relevant laws and regulations, as well as the provisions of relevant international conventions.',
    H2: '2. Protect the user\'s right to information and privacy',
    P4: 'We respect the privacy of our users, and we will not actively collect user information or disclose content that is suspected of violating user privacy without the consent of the user. We do not sell or provide to any third party any username, email address, information, or address that we may have as part of our services without the user\'s permission. Procyon will not publish or disseminate any of the User\'s information registered on the Site, with the following exceptions:',
    U1: {
      L1: '1. pursuant to a decision or ruling of a court, arbitral body, or other judicial proceeding.',
      L2: '2. as required by the relevant government authority.',
      L3: '3. the user violates the terms of use or has other actions that are detrimental to the interests of the mining leasing platform.',
      L4: '4. Other requirements of relevant laws and regulations.'
    },
    P5: 'If the user wishes to use the services provided by the Website which require registration, they shall agree to the following: to provide true, correct, current, and complete information about him/herself as prompted by the service registration form of the Website, and to update the registered information from time to time to ensure that it is true, correct, current and complete. If the user provides any false, inaccurate, outdated, or incomplete or misleading information, or if this website has reason to suspect that the aforementioned information is false, inaccurate, outdated or incomplete or misleading, this website has the right to suspend or terminate the users account and refuse the use of all or any part of the services provided by this website, both now and in the future.',
    H3: '3. Trademark and Domain Name Declarations',
    P6: 'Procyon website (www.procyon.vip) are either registered trademarks or legally licensed trademarks of Procyon in the Republic of Seychelles or other countries and may not be used in any manner without the written authorization of Procyon. The domain name of the website is owned by Procyon. Any use by any entity or individual is prohibited without written authorization from Procyon.',
    H4: '4. Website links to',
    P7: 'If the user wishes to link to this site, please contact us; links to this site may be made only with the written permission of Procyon. After a link has been established, permission to link may be revoked if, in the reasonable opinion of Procyon, the link is no longer appropriate. When linking to this Site, please be sure to use text links (the use of Procyon graphics and text is prohibited without the written permission of Procyon); links to this Site should be set to appear in a separate window and not within the frame of the linking party\'s site.',
    H5: '5. Disclaimer of Liability',
    P8: 'The User understands and agrees that in no event shall the Miner Leasing Platform be liable for the following.',
    U2: {
      L1: '(1) Losses on transactions.',
      L2: '(2) Trading profits or contract losses.',
      L3: '(3) Business interruption.',
      L4: '(4) Loss of information.',
      L5: '(5) Damage or loss of data.',
      L6: '(6) The demise or withdrawal of computing power from the market.',
      L7: '(7) Losses due to policy factors.',
      L8: '(8) Losses due to force majeure.'
    },
    P9: 'Since its inception, Procyon has been committed to serving the mining industry, providing miners with a full range of services, from mining machine procurement, maintenance, mine deployment, and revenue exchange, etc. The Cloud Mining Service has grown from an internal operation to an official operation today. From its inception to its official operation today, Cloud Power Mining Service is based on the investment philosophy of \'rejecting partial distribution of profits and transparent operation of computing power,\' and this innovation aims to build the world\'s best computing power service platform for users. To provide quality, algorithmic trading services to maximize the profits of our supportive friends and clients.',
    P10: 'Anyone who logs in or uses (including direct and indirect use) the Procyon website in any way is deemed to have accepted and approved this statement. The contents of this statement are made in accordance with the relevant laws of the Republic of Seychelles, and the contents of this statement will be interpreted and applied in accordance with the relevant laws of the Republic of Seychelles.',
    H6: 'Privacy Policy',
    H7: 'Privacy Policy',
    P11: 'We respect the privacy of all users and site visitors (collectively called “you” and “your”) and promise to do our best to protect your online privacy. This Privacy policy outlines the process of management, collection, maintenance and processing of users’ personal data by, Procyon and its affiliated entities (hereinafter referred to as the "Procyon" or "we", "us" and "our").',
    H8: '1. Information Collection',
    P12: 'We may utilize your personal data to provide and improve the miner sharing services (the “services”) provided by PROCYON, and to improve your use experience on this site. “Personal data” refers to any information related to an identified or identifiable person. We will collect the information you provide when you create an account to use the services. We also use various technologies to collect and store information, including Cookies, pixel tags and local storage (such as network storage of browser or application data cache, database and server logs). Your use of the services or this site indicates that you agree with the collection and use of the information by us according to this Privacy Policy. Unless otherwise stated herein, the terminology used in this Privacy Policy shall have the same meaning with the same terminology used in our Service Agreement.',
    H9: '1.1 Registration',
    P13: 'You are required to provide such information when creating an account as your email, telephone number, password or other information.',
    H10: '1.2 Payment information',
    P14: 'Your payment information will be sent to our third-party payment processors and your use indicates that you authorize us to store your encrypted wallet address and that we may have access to and keep the user information through our third-party payment processors.',
    H11: '1.3 Log information',
    P15: 'We will collect the information sent by your browser when you visit our site and log in your account (the”log data”). The log data may include the following information: Internet Protocol (IP) addresses of your computer, browser type and version, web pages of the services you visited, time and date of the visiting, time spent on these pages and other statistical data. In addition, we may use third-party services, such as Google Analytics, to collect, monitor and analyze such information in order to enhance the functionality of our services. The third-party service providers have their own privacy policies to describe how they use such information. Such third-party service providers can only use your personal data as necessary for performing tasks on behalf of us.',
    H12: '1.4 How we use your personal information',
    P16: 'We may use your personal information for the purposes listed below: ',
    U3: {
      L1: '(1) Show you our site and its contents;',
      L2: '(2) Identify you as our users in our system;',
      L3: '(3) Process your orders;',
      L4: '(4) Provide customer services;',
      L5: '(5) Respond to your requirements;',
      L6: '(6) Provide you with product updates;',
      L7: '(7) Improve our site;',
      L8: '(8) Send news, investigations, special offers and other promotional materials relating to our products;',
      L9: '(9) Communicate with you;',
      L10: '(10) Manage the risks and protect the site and protect our services and you from fraudulent activities;',
      L11: '(11) Comply with all applicable laws and regulations, and execute the service agreements of both this site and Procyon;',
      L12: '(12) Other purposes with your consent.'
    },
    hh1: '1.5 Information about Cookies',
    pp1: 'In order to provide you with better access experience, we use Cookies to allow this site to identify your browser and store user preference and other information. If permitted by your browser or the additional service of the browser, you may alter the acceptance degree of Cookies or reject Cookies. See AboutCookies.org for details. However, if you do so, it may in some cases affect your experience of visiting our site or make it impossible to use some of our services.',
    hh2: '2. Third-party Service Providers',
    pp2: 'We may hire third parties to provide business relevant services for us. Such third parties may only obtain access to your personal data while providing services to us and are obliged not to disclose or use the data for any other purposes. However, the act of us providing your personal data to the third-party service providers shall not be deemed that we shall undertake any legal liability for the infringement of user information or privacy by a third-party service provider.',
    hh3: '3. If You Are A Citizen of the European Economic Area (EEA)',
    pp3: 'If you are a citizen of the European Economic Area (EEA), you enjoy certain data protection rights based on applicable laws and regulations. Our goal is to adopt reasonable measures to allow you to alter, modify, delete or limit the use of your personal data. Please contact us if you wish to know about the personal information we hold about you and if you wish to delete your personal information from our system. We, however, assume no legal responsibility for the data manipulation acts by the citizens of the European Economic Area (EEA).',
    hh4: '4. Information Security',
    pp4: 'Although we are committed to protecting our site and services, you are responsible for protecting and maintaining the security of your personal information, and verifying whether the personal information we maintain about you is correct and updated. You must prevent unauthorized access to your account. Be sure to log out when using shared computers and do not disclose your account and password and any other account information to any unauthorized person.',
    pp5: 'However, no transmission or electronic storage method through the Internet is 100% secure. Therefore, while we strive to protect your personal information, we cannot guarantee its absolute security. We cannot guarantee the security of your personal information transmitted to our site and/or through our services. Any transmission of personal information shall be at your own risk.',
    hh5: '5. International Data Transmission',
    pp6: 'By submitting your information, you agree that your information (including personal data) may be transmitted and stored to computers and systems outside the jurisdiction of your country/territory. Under such circumstances, we will endeavor to ensure that your information is protected to the same extent as regulated in your country/territory. However, we do not assume any legal responsibility for the consequences brought about by such protection.',
    hh6: '6. Third-party Links',
    pp7: 'Our services may contain links to third-party websites that are not operated by us. If you click such links, you will be directed to the relevant third-party websites. The Privacy Policy does not apply to other third-party websites. We strongly recommend that you check the privacy policies of the websites you visit. Procyon can neither control any third-party websites or their contents of services and privacy policies, nor bear any responsibility.',
    hh7: '7. Privacy of Children',
    pp8: 'We do not knowingly collect or maintain personal data on our site from persons under the age of 16, and no part of our site is targeted at persons under the age of 16. If you are under 16 or you are 16 but do not derive your income from your own labor, please do not use or visit this site in any way. If we are aware that we have accidentally collected the personal data from persons under 16 years old, we will delete or adopt other appropriate measures to dispose such personal data according to applicable laws and regulations.',
    hh8: '8. Change of Purpose of Use of Personal Data',
    pp9: 'If we decide to use your personal data for any purposes other than those stated in this Privacy Policy, we will notify you and provide you with an effective exit option for not using your personal data for any purposes other than those stated in this Privacy Policy.',
    pp10: 'We may send you emails relating to new services and activities. You may select the “cancel subscription”function in each email we send to refuse to receive the promotional emails of Procyon. However, users who agree to use this service will continue to receive other important emails pertaining to the services.',
    hh9: '9. Information Storage Time',
    pp11: 'Unless required by applicable laws and regulations, we only keep and save your personal information within the time period as necessary to realize the purpose stated in this Policy. Under the circumstances permitted by law, we may store certain personal information for record keeping purposes or guarantee our rights and interests through legal means. Our storage of information is performed in accordance with the requirements of relevant laws and regulations, and we bear no legal responsibility for the information storage behavior.',
    hh10: '10. How We Learn About, Acquire, Alter or Delete Your Personal Information',
    pp12: 'Please contact us via the contact information stated in the Privacy Policy if you wish to confirm that we are processing your data, or access your personal data that we may hold, alter or delete your personal information we have collected.',
    hh11: '11. Contact Us',
    pp13: 'Please contact us at ',
    pp133:
      ' in case of any questions or concerns related to this Privacy Policy.',

    hhh1: 'Terms of Service',
    hhh2: 'Procyon User Registration Service Agreement',
    ppp1: 'The Registration Services Agreement (hereinafter referred to as the "agreement") concerns the regulation of rights and obligations between the user and Procyon in connection with the services of Procyon and its affiliated companies. By accessing and/or using this website, user accepts and agrees to all the terms and conditions of this agreement. Procyon is entitled to amend the terms of this agreement, and the revised agreement once published will effectively replace the original agreement. Users can check the latest agreement at any time.',
    hhh3: 'Content of Services',
    ppp2: '1. Procyon and its affiliated companies adopt our own system to provide users with leasing and management of mining machines and other services that may be added in the future through the Internet.',
    ppp3: '2. For the registration information provided by the user, the user agrees to: (1) provide legal, true, accurate and detailed personal data; (2) in case of changes, update user information timely. If the registration information provided by the user is illegal, untrue, inaccurate and incomplete, the user shall bear the corresponding responsibilities and consequences caused thereby, and Procyon may reserve the right to terminate the user\'s use of the services provided by Procyon.',

    he1: 'Rights of users',
    pa1: '1. User\'s username, password and security: (1) the user is entitled to choose whether to become a registered user of Procyon. If the user chooses to become a registered user of Procyon, the user may create an account. Account naming and application shall be subject to relevant laws and regulations and network ethics. The account shall not contain any insults, threats, obscenity, abuse and other words that infringe upon the legitimate rights and interests of others. (2) Once the user registers successfully and becomes a registered user of Procyon, user will obtain the account (mobile phone number or email address) and password and be responsible for all activities and events after logging into the system with this group of account and password. User shall bear all legal liabilities directly or indirectly caused by words and actions of the account. (3) The user shall be obliged to properly maintain the account and password, SMS verification code and Google verification code and be fully responsible for the security of the username and password, and the Google key. User shall be responsible for any legal consequences caused by the disclosure of username or password or Google key due to user’s actions. Procyon shall not be responsible for any property loss caused by the user’s own disclosure of such information. (4) If the user’s password is lost, the password can be reset through the link sent to the registered E-mail. Users should immediately notify Procyon of any illegal user accounts or other security vulnerabilities once found.',
    pa2: '2. Procyon promises: user\'s password, name, mobile phone number or other non-public information will not be provided to any third party except to provide user services without legal reason or prior permission of the user.',
    pa3: '3. Users are entitled to participate in various online and offline activities provided by mining organization of Procyon.',
    pa4: '4. Users are entitled to enjoy other services provided by Procyon according to the regulations on the website of Procyon.',

    he2: 'User\'s obligations',
    pa5: '1. Users of the website may not endanger state security, divulge state secrets, infringe upon the lawful rights and interests of the collective and citizens of the state, or make, reproduce or disseminate the following information: (1) incitement to resist or undermine the implementation of the constitution, laws and administrative regulations; (2) inciting ethnic hatred, ethnic discrimination and undermining ethnic unity; (3) fabricating or distorting facts, spreading rumors and disturbing public order; (4) promoting feudal superstition, obscenity, pornography, gambling, violence, murder, terror or abetting crimes; (5) publicly insulting others or fabricating facts to slander others, or carrying out other malicious attacks; (6) other violations of the constitution, laws and administrative rules and regulations; (7) engaging in commercial advertising.',
    pa6: '2. Users shall not maliciously register the website account of Procyon by any means, including but not limited to multiple account registration for the purpose of profit making, speculation, cash, awards, etc. Users shall not embezzle other users’ accounts. If the user violates the above provisions, Procyon shall be entitled to directly take all necessary measures to cancel the benefits obtained due to the violation and to pursue the legal action against the user through litigation.',
    pa7: '3. Users are prohibited from using Procyon in any form as a place, platform or medium for various illegal activities. Without the authorization or permission of Procyon, users shall not use the name of this website to engage in any commercial activities, nor shall they use Procyon as a place, platform or medium for commercial activities in any form.',

    he3: 'Exemption',
    pa8: '1. Based on the particularity of the Internet, Procyon does not guarantee that the service will not be interrupted. It will not guarantee the timeliness and safety of the service, nor assume any liability not caused by Procyon. Procyon seeks to make this website safe for users to access and use, but it does not represent or warrant that this website or its servers are free of viruses or other potentially harmful factors. Therefore, users should use industry-recognized software to detect any viruses in files downloaded from Procyon. Procyon assumes no responsibility or warranty for Internet security, and in particular we cannot assume any responsibility for hacking, phishing or other malicious activities.',
    pa9: '2. Procyon shall not be responsible for any failure to save, modify, delete or store information posted by users. No liability shall be assumed for typographical errors, omissions, etc. on the website that are not intentionally caused by Procyon. Procyon is entitled to but not obliged to improve or otherwise correct any omissions or errors in any part of the website.',
    pa10: '3. Except as expressly agreed in writing by Procyon, company is not responsible in any way for any content information obtained by user by connecting to or downloading from this website, including but not limited to advertising, and it also does not guarantee its accuracy, completeness and reliability. Procyon shall not be responsible for any products, services, information or materials purchased or obtained by users as a result of the information contained on this website. Users shall use the information on this website at their own risk.',
    pa11: '4. All notices to users will be delivered via announcement on the official webpage, in-site messages, email, customer service calls, SMS or regular mail. Procyon shall not be liable for any winning, preferential or other activities or information not obtained through the normal channels of Procyon.',

    he4: 'Information privacy',
    pa12: '1. Procyon user information referred herein pertains to information that complies with laws, regulations and relevant provisions as well as the following scope: (1) personal information provided by users to Procyon when registering a Procyon account; (2) when the user uses Procyon service, participates in website activities or visits website pages, Procyon automatically receives and records the data of the user’s browser or mobile client, including but not limited to the IP address, information in website cookies and web page records requested by the user; (3) users’ personal information legally obtained by Procyon from business partners; (4) other users’ personal information obtained by Procyon through legal means.',
    pa13: '2. Procyon promises: Procyon will not disclose the user’s password, name, mobile phone number or other non-public information to any third party without legal reasons or prior permission of the user.',
    pa14: '3. User\'s personal information will be disclosed in part or in whole under the following statutory conditions: (1) Disclosure to the user or any other third party with the user’s consent; (2) Disclosure to an administrative, judicial body or other third party as required by laws, regulations or other relevant provisions, or as required by an administrative authority; (3) Other disclosures by Procyon in accordance with laws, regulations and other relevant provisions.',

    he5: 'Provision, modification and termination of services',
    pa15: '1. In addition to receiving the services of Procyon, users agree to receive information regarding services provided by Procyon. Users hereby authorize Procyon to send commercial information to its E-mail, mobile phone, mailing address, etc. Users can access the relevant webpages of Procyon to make changes to the user profile.',
    pa16: '2. Procyon reserves the right to modify or interrupt services at any time without notifying users. Procyon is entitled to modify or interrupt the service without liability to the user or any third party not directly involved.',
    pa17: '3. If customer has any objection to the modification of this agreement or is dissatisfied with the service provided by Procyon, customer may exercise the following rights: (1) Stop using the services of Procyon; (2) Effectively notify Procyon in writing to stop providing services to it through legal channels such as developer’s mailbox. Upon the termination of service, the user’s right to use the services of Procyon shall be immediately terminated. In this case, Procyon is under no obligation to transmit any unprocessed information or unfinished services to the user or any third party not directly related to it.',

    he6: 'Applicable laws and judgment site',
    pa18: 'All disputes, claims or other matters arising from or in connection with the user’s use of the website of Procyon shall be governed by local laws.',
    pa19: 'Any dispute between the user and Procyon shall be settled through negotiation based on the principle of good faith. If no agreement can be reached through negotiation, any legal action shall be filed to the court of jurisdiction where Procyon is located.'
  }
}
