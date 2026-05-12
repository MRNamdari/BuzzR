import {
  LockOutlined as Lock,
  VerifiedUserOutlined as VerifiedUser,
  BadgeOutlined as Badge,
  GroupOutlined as Group,
  Inventory2Outlined as Inventory2,
  TuneOutlined as Tune,
  CategoryOutlined as Category,
  ViewModuleOutlined as ViewModule,
  WarehouseOutlined as Warehouse,
  SellOutlined as Sell,
  ShoppingBagOutlined as ShoppingBag,
  TravelExploreOutlined as TravelExplore,
  GroupsOutlined as Groups,
  LocalShippingOutlined as LocalShipping,
  HandshakeOutlined as Handshake,
  CampaignOutlined as Campaign,
  PermMediaOutlined as PermMedia,
  CollectionsOutlined as Collections,
  TranslateOutlined as Translate,
  HistoryOutlined as History,
  ReceiptLongOutlined as ReceiptLong,
  GavelOutlined as Gavel,
  EventAvailableOutlined as EventAvailable,
  ShoppingCartOutlined as ShoppingCart,
  BuildOutlined as Build,
  ExtensionOutlined as Extension,
  PublicOutlined as Public,
  PriceChangeOutlined as PriceChange,
  RedeemOutlined as Redeem,
  LayersOutlined as Layers,
  SettingsOutlined as Settings,
  SettingsApplicationsOutlined as SettingsApplications,
  ApiOutlined as Api,
  FactCheckOutlined as FactCheck,
  WebhookOutlined as Webhook,
  PlaceOutlined as Place,
  LocalOfferOutlined as LocalOffer,
  RuleOutlined as Rule,
} from "@mui/icons-material";

type DashboardItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: DashboardItem[];
  params?: string[];
};
export const DashboardItems: DashboardItem[] = [
  {
    title: "Catalog",
    icon: <Inventory2 fontSize="small" />,
    path: "catalog",
    children: [
      {
        title: "Products",
        icon: <ShoppingBag fontSize="small" />,
        path: "catalog/products",
        params: ["new"],
      },
      {
        title: "Categories",
        icon: <Category fontSize="small" />,
        path: "catalog/categories",
      },
      {
        title: "Collections",
        icon: <ViewModule fontSize="small" />,
        path: "catalog/collections",
      },
      {
        title: "Attributes",
        icon: <Tune fontSize="small" />,
        path: "catalog/attributes",
      },
      {
        title: "Inventory",
        icon: <Warehouse fontSize="small" />,
        path: "catalog/inventory",
      },
      { title: "Pricing", icon: <Sell fontSize="small" />, path: "pricing" },
      {
        title: "SEO",
        icon: <TravelExplore fontSize="small" />,
        path: "catalog/seo",
      },
    ],
    params: [],
  },
  {
    title: "Orders",
    icon: <ReceiptLong fontSize="small" />,
    path: "orders",
    params: [],
  },
  {
    title: "Customers",
    icon: <Groups fontSize="small" />,
    path: "customers",

    params: [],
  },
  {
    title: "Marketing",
    icon: <Campaign fontSize="small" />,
    path: "marketing",
    children: [
      {
        title: "Campaigns",
        icon: <Campaign fontSize="small" />,
        path: "marketing/campaigns",
      },
      {
        title: "Promotions",
        icon: <LocalOffer fontSize="small" />,
        path: "marketing/promotions",
      },
      {
        title: "Shipping Rules",
        icon: <Rule fontSize="small" />,
        path: "marketing/shipping-rules",
      },
    ],
    params: [],
  },
  {
    title: "Media",
    icon: <PermMedia fontSize="small" />,
    path: "media",
    children: [
      {
        title: "Sets",
        icon: <Collections fontSize="small" />,
        path: "media/sets",
      },
      { title: "Tags", icon: <Sell fontSize="small" />, path: "media/tags" },
      {
        title: "Translations",
        icon: <Translate fontSize="small" />,
        path: "media/translations",
      },
      {
        title: "Versions",
        icon: <History fontSize="small" />,
        path: "media/versions",
      },
    ],
    params: [],
  },
  {
    title: "Logistics",
    icon: <LocalShipping fontSize="small" />,
    path: "logistics",
    children: [
      {
        title: "Locations",
        icon: <Place fontSize="small" />,
        path: "logistics/locations",
      },
      {
        title: "Shipping",
        icon: <LocalShipping fontSize="small" />,
        path: "logistics/shipping",
      },
      {
        title: "Suppliers",
        icon: <Handshake fontSize="small" />,
        path: "logistics/suppliers",
      },
      {
        title: "Warehouses",
        icon: <Warehouse fontSize="small" />,
        path: "logistics/warehouses",
      },
    ],
    params: [],
  },
  {
    title: "Rules",
    icon: <Gavel fontSize="small" />,
    path: "rules",
    children: [
      {
        title: "Availability",
        icon: <EventAvailable fontSize="small" />,
        path: "rules/availability",
      },
      {
        title: "Cart",
        icon: <ShoppingCart fontSize="small" />,
        path: "rules/cart",
      },
      {
        title: "Custom",
        icon: <Build fontSize="small" />,
        path: "rules/custom",
      },
      {
        title: "Features",
        icon: <Extension fontSize="small" />,
        path: "rules/features",
      },
      {
        title: "Global",
        icon: <Public fontSize="small" />,
        path: "rules/global",
      },
      {
        title: "Pricing",
        icon: <PriceChange fontSize="small" />,
        path: "rules/pricing",
      },
      {
        title: "Promotions",
        icon: <Redeem fontSize="small" />,
        path: "rules/promotions",
      },
      {
        title: "Shipping",
        icon: <LocalShipping fontSize="small" />,
        path: "rules/shipping",
      },
      {
        title: "Tiers",
        icon: <Layers fontSize="small" />,
        path: "rules/tiers",
      },
    ],
    params: [],
  },
  {
    title: "Access",
    icon: <Lock fontSize="small" />,
    path: "access",
    children: [
      {
        title: "Permissions",
        icon: <VerifiedUser fontSize="small" />,
        path: "access/permissions",
      },
      {
        title: "Roles",
        icon: <Badge fontSize="small" />,
        path: "access/roles",
      },
      {
        title: "Users",
        icon: <Group fontSize="small" />,
        path: "access/users",
      },
    ],
    params: [],
  },
  {
    title: "System",
    icon: <Settings fontSize="small" />,
    path: "system",
    children: [
      { title: "API", icon: <Api fontSize="small" />, path: "system/api" },
      {
        title: "Audit",
        icon: <FactCheck fontSize="small" />,
        path: "system/audit",
      },
      {
        title: "System Settings",
        icon: <SettingsApplications fontSize="small" />,
        path: "system/settings",
      },
      {
        title: "Webhooks",
        icon: <Webhook fontSize="small" />,
        path: "system/webhooks",
      },
    ],
    params: [],
  },
] as const;
