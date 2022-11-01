export class APIs {
  // Account
  public static Account = {
    Register: 'account/register',
    Login: 'account/authenticate',
    refreshToken: 'account/refresh-token',
    ChangePassword: 'Account/ChangePassword',
    VerifyOTP: 'account/verify-otp',
    CreatePassword: 'account/create-password',
    SendPasswordResetCode: 'account/send-password-reset-code',
    ResetPassword: 'account/reset-password',
    UAEPassCode: 'account/uae-pass/auth-code-url',
    UAEPassLogin: 'account/uae-pass/login',
    UAEPassLogout: 'account/uae-pass/logout-url',
    getServicesConfig: 'lookup/get-servicesconfigs',
  };

  public static lookups = {
    jobTitles: 'lookup/job-titles',
    reqStatus: 'lookup/request-status',
    countries: 'lookup/countries',
    cities: 'lookup/cities',
    sectors: 'lookup/get-sectors',
    entityType: '',
    nationalities: 'lookup/nationalities',
    licencseNationalty:'lookup/get-licenseNationality',
    companySize: 'lookup/company-size',
    citys: 'lookup/cities',
    countrys: 'lookup/countries',
    serviceTypes: 'lookup/service-types',
    sortTypes: 'lookup/request-sorting-types',
    complaintTypes: 'lookup/complaint-types',
    interests: 'lookup/interests',
    activities: 'lookup/activities',
    specialActivities: 'lookup/activities-special',
    products: 'lookup/products',
    industries: 'lookup/industries',
    companyStatus: 'lookup/company-status',
    sortCompanyTypes: 'lookup/request-companies-sort-types',
    sortCompany: 'lookup/company-sort-types',
    LeadStatus: 'lookup/lead-status',
    LeadSortType: 'lookup/lead-sorting-types',
    OpportunityStatus: 'lookup/opportunity-status',
    OpportunitySorttype: 'lookup/opportunity-sorting-type',
    eventNames: 'event/event-lookup',
    reqNums: 'request/request-lookup',
    interactionTypes: 'lookup/interaction-types',
    eventTypes: 'lookup/event-types',
    companyType: 'lookup/company-types',
    entityTypes: 'lookup/get-entitytypes',
    annualTurnover: 'lookup/get-annualturnover',
    nOfEmployees: 'lookup/get-numberemployees',
    myCompany: 'company/get-my-companys',
    authorities: 'lookup/get-issueauthority',
    legalStatuses: 'lookup/get-legalstatus',
    licenseTypes: 'lookup/get-elicensetypes',
    licenseCategories: 'lookup/get-licensecategory',
    licenseIssuers: 'lookup/get-licenseIssuer',
    commercialRegisterTypes: 'lookup/get-commercialregistertypes',
    firmTypes: 'lookup/get-firmtypes',
    relationTypes: 'lookup/get-relationtypes',
    getServices: 'lookup/get-services',
    getServicesTyps:'lookup/service-types',
    getServicesConfig: 'lookup/get-servicesconfigs',
    exporterTypes: 'coo/exporter-types',
    consigneeTypes: 'coo/consignee-types',
    consignees: 'coo/consignees',
    processTypes: 'coo/process-types',
    existPoints: 'coo/exist-points',
    portOfDischarges: 'coo/port-of-Discharge',
    hsCodes: 'coo/HS-Codes',
    companiesWithActiveMembership: 'coo/company-with-active-membership',
    packageTypes: 'coo/package-types',
    unitsOfMeasures: 'coo/uom',

    bankList:'membershippayment/membership-banks-list',
    servicesFees:"lookup/get-fees"
  };

  public static requests = {
    getAll: 'request/my-requests',
    createReq: 'request/create-request',
    getDetails: 'request/request-details',
    getDetailsForEdit: 'request/request-details-for-edit',

    companies: 'request/request-companies',
    submitInterest: 'request/interesting-action',
    requestStatistic: 'request/request-status-statistics',
    requestCompanyDetails: 'request/company-details',
    closeRequest: 'request/close-request',
    initiateLeads: 'request/initiate-leads',
    rate: 'request/rate',
    requestlookups: 'request/request-companies-lookups',
    concatConutryAndCity: 'request/concatenate-countries-cities',
  };

  public static complaint = {
    sendGeneralComplaint: 'complaint/send-complaint-by-name',
    sendRegisteredComplaint: 'complaint/send-complaint-by-type',
  };

  //leads
  public static leads = {
    getAll: 'lead/get',
    leadDetails: 'lead/lead-info',
    referralsList: 'lead/referals/',
    referralDetails: 'lead/referal-details/',
    interactionsList: 'lead/interactions-list',
    createInteraction: 'lead/create-interaction',
    leadOpportunity: 'lead/opportunities',
    submitOpportunity: 'lead/submit-opportunity',
    getopportunities: 'lead/opportunities',
    getMessages: 'lead/get-lead-notes/',
    getMessagesbyOpportunity: 'lead/opportunity-notes/',

    sendMessage: 'lead/create-message/',
    sendMessageByOpportunity: 'lead/create-opportunity-message/',

    interactionDetails: 'lead/get-interaction-details',
    createopportunity: 'lead/create-opportunity',
    leadopportunityInfo: 'lead/get-opportunity-info',
    referralsListByOpportunity: 'lead/opportunity-referals/',
  };

  //profile
  public static profile = {
    GetData: '/profile',
    EditProfile: '/profile',
    EditGeneralInformation: '/profile/general-Info',
    EditAddressInformation: '/profile/address-Info',
    EditContactInformation: '/profile/contact-Info',
    EditSocialInformation: '/profile/social-Info',
  };

  // Order Statistics
  public static OrderStatistics = {
    GetCreatedOrdersCount:
      'ecommerce/api/OrderStatistics/GetCreatedOrdersCount',
    GetCancelledOrdersCount:
      'ecommerce/api/OrderStatistics/GetCancelledOrdersCount',
    GetDeliveredOrdersCount:
      'ecommerce/api/OrderStatistics/GetDeliveredOrdersCount',
    GetOutForDeliveryOrdersCount:
      'ecommerce/api/OrderStatistics/GetOutForDeliveryOrdersCount',
    GetAttemptToDeliveryOrdersCount:
      'ecommerce/api/OrderStatistics/GetWaitingRescheduleOrdersCount',
    GetConfirmedOrdersCount:
      'ecommerce/api/OrderStatistics/GetConfirmedOrdersCount',
  };

  // Orders
  public static Order = {
    GetDailyOrders: 'ecommerce/api/Order/Get',
    GetOrderDetails: 'ecommerce/api/Order/Get/{{id}}',
    CancelOrder: 'ecommerce/api/Order/Cancel',
    GetAvailableDays: 'ecommerce/api/Order/GetAvailableDays',
    GetAvailableDaysByStaff: 'ecommerce/api/v2/Order/GetAvailableDaysByStaff',
    GetAvailableSlots: 'ecommerce/api/Order/GetAvailableSlots',
    GetAvailableSlotsByStaff: 'ecommerce/api/Order/GetAvailableSlotsByStaff',
    GetCustomerOrders: 'ecommerce/api/Order/GetCustomerOrders',
    PlaceOrder: 'ecommerce/api/Order/PlaceOrderByStaff',
    ChangeOrder: 'ecommerce/api/Order/ChangeOrder',
    ChangeDeliveryAddress: '/ecommerce/api/Order/ChangeDeliveryAddress',
  };

  // Feedback
  public static Feedback = {
    GetFeedback: 'ecommerce/api/FeedBack/GetFeedBacks',
  };

  // Daily Sales
  public static DailySales = {
    GetDailySales: 'reporting/api/Order/DailySales',
    ExportDailySales: 'reporting/api/Order/ExportDailySales',
  };

  // reports
  public static Report = {
    GetReport: 'ecommerce/api/OrderReport/Get',
    GetOrdersReport: 'ecommerce/api/OrderReport/GetOrders',
    ExportOrdersReport: 'ecommerce/api/OrderReport/ExportGetOrders',
    GetReportDetails: 'ecommerce/api/Order/Get/{{id}}',
    GetOrdersRate: 'ecommerce/api/OrderReport/GetOrdersRate',
    ExportOrdersRate: 'ecommerce/api/OrderReport/ExportOrdersRate',
    GetOrdersRateTotalCount:
      'ecommerce/api/OrderReport/GetOrdersRateTotalCount',
  };

  // Customer
  public static Customer = {
    GetCustomers: 'identity/api/Customer/GetCustomers',
    GetCustomerByMobileSearch: 'identity/api/Customer/Get/{{mobile}}',
    SendCustomerOTP: 'identity/api/Customer/SendCustomerOTP/{{mobile}}',
    AddCustomer: 'identity/api/Customer/AddCustomer',
    ActivateCustomer: 'identity/api/User/Activate/',
    DeactivateCustomer: 'identity/api/User/Deactivate/',
    ChangeCustomerName: 'identity/api/Customer/ChangeCustomerName',
    GetCustomerBySapIds: 'identity/api/User/GetCustomerBySapIds',
  };

  // Address
  public static Address = {
    AddCustomerAddress: 'identity/api/Address/AddCustomerAddress',
    GetCustomerAddresses:
      'identity/api/Address/GetCustomerAddresses/{{customerId}}',
    ValidateMap: 'ecommerce/api/Address/Validate/{{lng}}/{{lat}}',
    ValidateMapByStaff: 'ecommerce/api/Address/ValidateByStaff',
  };

  // Wallet
  public static Wallet = {
    GetWallet: 'payment/api/WalletQuery/GetBalance',
    GetWalletBalance: 'payment/api/WalletQuery/Balance',
  };

  // Wallet Report
  public static WalletTransactionReport = {
    GetWalletTransactions: 'reporting/api/WalletTransactionReport/Get',
    GetWalletExportReport:
      'reporting/api/WalletTransactionReport/GetWalletExportReport',
  };

  // Stock Movement
  public static StockMovement = {
    GetStockMovementList: 'reporting/api/Order/StockMovement',
    ExportStockMovementList: 'reporting/api/Order/ExportStockMovement',
    GetStockMovementDetails: 'reporting/api/Order/StockMovementDetails',
    GetStockMovementDetailsOrders:
      'reporting/api/Order/StockMovementDetailsOrders',
    ExportStockMovementsDetails:
      'reporting/api/Order/ExportStockMovementDetails',
  };

  // Promotion
  public static Promotion = {
    GetPromotions: 'ecommerce/api/Promotion/Get',
    GetAllPromotions: 'ecommerce/api/Promotion/GetAll',
    SetPromotionStatus: 'ecommerce/api/Promotion/SetStatus',
    DeletePromotion: 'ecommerce/api/Promotion/DeletePromotion/',
    GetPromotionDetails: '/ecommerce/api/Promotion/Get/',
    AddNewPromotion: 'ecommerce/api/Promotion/Create',
    GetTopPromotion: 'ecommerce/api/Promotion/GetTopPromotion',
    CheckPromoCodeEnabled: 'ecommerce/api/Promotion/CheckPromoCodeEnabled',
    CheckPromoCode: 'ecommerce/api/Promotion/CheckPromoCode',
  };

  // Caption
  public static Caption = {
    GetPlatforms: 'cms/api/Caption/GetPlatforms',
    GetPages: 'cms/api/Caption/GetViews',
    GetCaptions: 'cms/api/Caption/GetCaptions',
    UpdateCaption: 'cms/api/Caption/UpdateCaption',
  };

  // Settings
  public static Setting = {
    GetSettingsData: 'ecommerce/Setting/GetSettingsData',
    GetRewardSettingsData: 'payment/api/Reward/GetConfiguration',

    UpdateSetting: 'ecommerce/Setting/UpdateDeliveryKeyVal',
    UpdateRewardSetting: 'payment/api/Reward/SetConfigurationKeyVal',
    UpdateFinanceSetting: 'ecommerce/Setting/UpdateFinanceKeyVal',
  };

  // Lookup
  public static Lookup = {
    GetBranches: 'ecommerce/api/Lookup/GetBranches',
    GetDistrict: 'ecommerce/api/Lookup/GetDistrict',
    GetSalesMen: 'ecommerce/api/Lookup/GetSalesMen',
  };

  // Donation
  public static Donation = {
    GetAvailableDays: 'ecommerce/api/Donation/GetAvailableDays',
    CheckStatus: 'ecommerce/api/Donation/CheckStatus',
    EnableDonation: 'ecommerce/api/Donation/Enable/',
  };

  // Donation Order
  public static DonationOrder = {
    MakeDonationOrder: 'ecommerce/api/DonationOrder/PlaceOrder',
    MakeDonationOrderByStaff: 'ecommerce/api/DonationOrder/PlaceOrderByStaff',
    GetMyDonationOrders: 'ecommerce/api/DonationOrder/GetMyOrders',
    GetDonationOrders: 'ecommerce/api/DonationOrder/GetOrders',
    GetDonationOrderById: 'ecommerce/api/DonationOrder/Get/',
    MarkAsDelivered: 'ecommerce/api/DonationOrder/MarkAsDelivered',
    MarkAsFailedToDeliver: 'ecommerce/api/DonationOrder/MarkAsFailedToDeliver/',
    ExportDonationOrders: 'ecommerce/api/DonationOrder/Export',
    GetTodayCreatedCount: 'ecommerce/api/DonationOrder/GetTodayCreatedCount',
    ChangeDeliveryData: 'ecommerce/api/DonationOrder/ChangeDeliveryAddress',
  };

  // Donation Addresses
  public static DonationAddress = {
    GetDonationAddresses: 'ecommerce/api/DonationAddress/Get',
    // GetCities: 'ecommerce/api/DonationAddress/GetCities',
    GetCities: 'ecommerce/api/DonationAddress/LoadCitis',
    DeleteDonationAddress: 'ecommerce/api/DonationAddress/Delete/',
    EditDonationAddress: 'ecommerce/api/DonationAddress/Update',
    AddDonationAddress: 'ecommerce/api/DonationAddress/Add',
    CheckAddress: 'ecommerce/api/DonationAddress/CheckAddress',
    LoadTypes: 'ecommerce/api/DonationAddress/LoadTypes',
    GetCustomerCities: 'ecommerce/api/DonationAddress/GetCustomerCities/',
    CheckCustomerAddress: 'ecommerce/api/DonationAddress/CheckCustomerAddress',
  };

  // Announcement
  public static Announcement = {
    GetAnnouncement: 'notification/api/Announcement/Get',
    AddAnnouncement: 'notification/api/Announcement/Add',
    EditAnnouncement: 'notification/api/Announcement/Update',
    DeleteAnnouncement: 'notification/api/Announcement/Delete',
    PublishAnnouncement: 'notification/api/Announcement/Publish',
  };

  // Refund
  public static Refund = {
    MakeRefund: 'payment/api/Refund/RefundPayment',
    CheckAvailabilityRefund: 'payment/api/Refund/CheckAvailabilityRefund',
    GetNumberOfRefundRequests: 'payment/api/Refund/GetNumberOfRequests',
    GetRefundRequests: 'payment/api/Refund/Get',
  };

  // News
  public static News = {
    GetAllNews: 'cms/api/News/GetAll',
    CreateNews: 'cms/api/News/Create',
    UpdateNews: 'cms/api/News/Update',
    DeleteNews: 'cms/api/News/Delete',
    PublishNews: 'cms/api/News/Publish',
    UnpublishNews: 'cms/api/News/Unpublish',
  };

  // Corporate
  public static Corporates = {
    GetAllCorporates: 'identity/api/Corporate/Get',
    CreateCorporate: 'identity/api/Corporate/AddCorporate',
    UpdateCorporate: 'identity/api/Corporate/UpdateCorporate',
    DeleteCorporate: 'identity/api/Corporate/DeleteCorporate',
    // PublishCorporates: 'cms/api/News/Publish',
    // UnpublishCorporates: 'cms/api/News/Unpublish',
  };

  // Reward
  public static Reward = {
    GetBalancePointsAndMoney: 'payment/api/Reward/GetBalancePointsAndMoney',
    GetBalancePointsAndMoneyUser:
      'payment/api/Reward/GetBalancePointsAndMoneyUser',
  };

  // Refered Customers
  public static ReferedCustomers = {
    GetAll: 'identity/api/Referement/GetAll',
  };

  // events
  public static Events = {
    GetAll: 'event',
    eventaction: 'event/event-action',
    eventfill: 'event',
  };

  // companies
  public static Companys = {
    GetAll: 'company',
    getCompany: 'company',
    editGeneralInfo: 'company/general-info',
    editContactInfo: 'company/address-contact-info',
    editSocialInfo: 'company/social-other-info',
    editCommunicationSettings: 'company/communication-setting',
    getActiveWithMembership:'coo/company-with-active-membership'
  };

  //membership
  public static membership = {
    companyWithoutMemebership:"membership/companies-has-no-membership",
    VerifyLicense: 'membership/verify-license',
    partnerCompanies: '',
    requestResultActions: 'membership/requests-result-and-actions',
    clientReply: "membership/requests-add-new-actions",
    sendMessage: 'membership/requests-add-new-message',
    getMessages: 'membership/requests-messages',
    bankTransfer: 'membershippayment/submit-membership-fees',
    getCompanyWalletTransaction: 'membershippayment/requests-wallet-transactions',
    rechargeWallet: 'membershippayment/membership-charge-wallet',
    submitMembership: 'membership/submit-membership-request/false',
    renewMembership:"membership/submit-renew-membership-request",
    requestDetails: 'membership/membership-request-details',
    documents: 'membership/membership-documents',
    downloadDocument:'membership/membership-download-file',
    requiredDocuments:'membership/membership-required-documents',
  //  licencseNationalty:'dcc/lookup/get-licenseNationality'
    creatRequest: 'membership/submit-membership-request/',
    companyWallet:'membershippayment/requests-companies-wallet',
    membershipDetails:'membership/membership-details',
    cancleMemberShip:'membership/submit-cancel-membership-request',
    renewMemberShip:'membership/submit-renew-membership-request',
    amendMemberShip:'membership/submit-amend-membership-request',
    documentList:'membership/membership-documents-list',
    paymentList:'membershippayment/membership-payments-list',
    getMemebershiipDetils:"membership/membership-details",
    refundWallet:'membershippayment/membership-refund-wallet'
  };

   //coo
   public static coo = {
    documents: 'coo/coo-documents',
    downloadDocument:'coo/coo-download-file',
    requiredDocuments:'membership/membership-required-documents',
    creatRequest: 'coo/submit-coo/',
  };
}

